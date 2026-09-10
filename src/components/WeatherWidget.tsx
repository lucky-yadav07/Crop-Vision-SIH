import React, { useState, useEffect } from 'react';
import {
  MapPin,
  Navigation,
  RefreshCw,
  Droplets,
  Wind,
  CloudRain,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  Thermometer,
  Compass,
  ChevronDown,
  Info,
  Sun,
  CloudSun,
  Cloud,
  CloudDrizzle,
  CloudLightning,
  Sparkles,
  ExternalLink
} from 'lucide-react';
import {
  WeatherService,
  AgriculturalWeather,
  PRESET_AGRI_REGIONS,
  AgriRegionPreset
} from '../services/weatherService';
import { useLanguage } from '../context/LanguageContext';
import { useToast } from './Toast';

interface WeatherWidgetProps {
  compact?: boolean;
  onWeatherLoaded?: (weather: AgriculturalWeather) => void;
  className?: string;
}

export const WeatherWidget: React.FC<WeatherWidgetProps> = ({
  compact = false,
  onWeatherLoaded,
  className = '',
}) => {
  const { t, isHindi } = useLanguage();
  const { showToast } = useToast();

  const [weather, setWeather] = useState<AgriculturalWeather | null>(() => WeatherService.getCachedWeather());
  const [isLocatingGps, setIsLocatingGps] = useState(false);
  const [isLoadingWeather, setIsLoadingWeather] = useState(false);
  const [gpsError, setGpsError] = useState<string | null>(null);
  const [showRegionDropdown, setShowRegionDropdown] = useState(false);
  const [selectedPreset, setSelectedPreset] = useState<AgriRegionPreset>(PRESET_AGRI_REGIONS[0]);

  // Initial load: if no cached weather, load the default regional preset
  useEffect(() => {
    if (!weather) {
      loadWeatherForPreset(PRESET_AGRI_REGIONS[0], false);
    } else if (onWeatherLoaded) {
      onWeatherLoaded(weather);
    }
  }, []);

  // Fetch weather for a preset region
  const loadWeatherForPreset = async (preset: AgriRegionPreset, userInitiated = true) => {
    setSelectedPreset(preset);
    setIsLoadingWeather(true);
    setGpsError(null);
    try {
      const data = await WeatherService.fetchWeather(
        preset.lat,
        preset.lon,
        false,
        {
          en: `${preset.name}`,
          hi: `${preset.nameHi}`,
        },
        isHindi ? 'hi' : 'en'
      );
      setWeather(data);
      if (onWeatherLoaded) onWeatherLoaded(data);
      if (userInitiated) {
        showToast(
          isHindi ? 'मौसम लोड हो गया' : 'Weather Updated',
          isHindi ? `${preset.nameHi} का मौसम अपडेट हुआ।` : `Loaded weather for ${preset.name}.`,
          'info'
        );
      }
    } catch (err: any) {
      console.error('Failed to load preset weather:', err);
      showToast('Weather Error', 'Could not fetch weather data. Please retry.', 'error');
    } finally {
      setIsLoadingWeather(false);
    }
  };

  // Trigger GPS detection
  const handleDetectGps = async () => {
    setIsLocatingGps(true);
    setGpsError(null);
    try {
      const coords = await WeatherService.detectDeviceLocation();
      setIsLoadingWeather(true);
      const data = await WeatherService.fetchWeather(
        coords.latitude,
        coords.longitude,
        true,
        undefined,
        isHindi ? 'hi' : 'en',
        coords.accuracy
      );
      setWeather(data);
      if (onWeatherLoaded) onWeatherLoaded(data);

      showToast(
        isHindi ? 'सटीक जीपीएस स्थान मिला' : 'Exact GPS Location Locked',
        isHindi
          ? `${data.locationNameHi || data.locationName} (${data.latitude.toFixed(4)}°N, ${data.longitude.toFixed(4)}°E)`
          : `Field locked to ${data.locationName} (${data.latitude.toFixed(4)}°N, ${data.longitude.toFixed(4)}°E)`,
        'success'
      );
    } catch (err: any) {
      console.warn('GPS location detection failed:', err);
      const message = err.message || t.gpsPermissionDenied;
      setGpsError(message);
      showToast(
        isHindi ? 'जीपीएस सूचना' : 'GPS Notice',
        isHindi ? 'जीपीएस सिग्नल नहीं मिला। आप नीचे से अपना क्षेत्र चुन सकते हैं।' : message,
        'warning'
      );
    } finally {
      setIsLocatingGps(false);
      setIsLoadingWeather(false);
    }
  };

  // Refresh current coordinates
  const handleRefresh = () => {
    if (weather) {
      setIsLoadingWeather(true);
      WeatherService.fetchWeather(
        weather.latitude,
        weather.longitude,
        weather.isGpsSource,
        undefined,
        isHindi ? 'hi' : 'en',
        weather.accuracy
      )
        .then((data) => {
          setWeather(data);
          if (onWeatherLoaded) onWeatherLoaded(data);
          showToast(
            isHindi ? 'मौसम अपडेट हुआ' : 'Weather Refreshed',
            isHindi ? 'नवीनतम आंकड़े प्राप्त हुए।' : 'Live weather refreshed.',
            'success'
          );
        })
        .catch(() => {
          showToast('Refresh failed', 'Could not refresh data.', 'error');
        })
        .finally(() => setIsLoadingWeather(false));
    } else {
      handleDetectGps();
    }
  };

  // Pick weather icon component
  const renderWeatherIcon = (code: number, className = 'w-7 h-7 text-amber-400') => {
    if (code === 0 || code === 1) return <Sun className={className} />;
    if (code === 2) return <CloudSun className={className} />;
    if (code === 3 || code === 45 || code === 48) return <Cloud className={className} />;
    if (code >= 51 && code <= 65) return <CloudDrizzle className={className} />;
    if (code >= 80 && code <= 82) return <CloudRain className={className} />;
    if (code >= 95) return <CloudLightning className={className} />;
    return <Sun className={className} />;
  };

  return (
    <div
      id="agricultural-weather-widget"
      className={`bg-white rounded-3xl border border-[#E2E8DF] shadow-md overflow-hidden ${className}`}
    >
      {/* Top Banner / Location Header */}
      <div className="bg-[#163D2B] text-white px-5 py-4 sm:px-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-[#0F2A1E]">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-[#EAF0EB]/15 text-[#34D399] flex items-center justify-center shadow-inner">
            <Navigation className={`w-5 h-5 ${isLocatingGps ? 'animate-spin' : ''}`} />
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="font-extrabold text-base sm:text-lg tracking-tight text-white flex items-center gap-2">
                <span>{isHindi ? weather?.locationNameHi || weather?.locationName : weather?.locationName || t.weatherTitle}</span>
              </h3>
              {weather?.isGpsSource && (
                <span className="bg-[#10B981] text-[#0F2A1E] text-[10px] font-extrabold px-2 py-0.5 rounded-full uppercase tracking-wider flex items-center gap-1 shadow-xs">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#0F2A1E] animate-ping" />
                  GPS Live
                </span>
              )}
              <span className="bg-white/15 text-emerald-200 border border-white/20 text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-[#34D399]" />
                {weather?.source === 'openweather' ? 'OpenWeather Live' : 'Agri-Weather Live'}
              </span>
            </div>
            <div className="flex items-center gap-2 flex-wrap text-xs text-[#EAF0EB]/80 font-medium mt-0.5">
              <span className="text-slate-300">{t.coordinates}:</span>
              <span className="font-mono text-[#34D399] font-bold">
                {weather ? `${weather.latitude.toFixed(4)}°N, ${weather.longitude.toFixed(4)}°E` : '---'}
              </span>
              {weather?.accuracy && (
                <span className="text-[10px] bg-white/10 text-emerald-300 px-1.5 py-0.5 rounded border border-white/10">
                  ±{weather.accuracy}m {t.gpsAccuracy}
                </span>
              )}
              {weather && (
                <a
                  href={weather.mapsUrl || `https://www.google.com/maps?q=${weather.latitude},${weather.longitude}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[11px] text-[#34D399] hover:text-white underline underline-offset-2 flex items-center gap-1 transition-colors"
                  title={t.viewOnMap}
                >
                  <ExternalLink className="w-3 h-3" />
                  <span>{t.viewOnMap}</span>
                </a>
              )}
              {weather?.timestamp && (
                <span className="hidden sm:inline text-slate-400">• {weather.timestamp}</span>
              )}
            </div>
          </div>
        </div>

        {/* GPS Detect & Refresh Actions */}
        <div className="flex items-center gap-2 w-full sm:w-auto">
          {/* Main GPS Detect Button */}
          <button
            type="button"
            id="btn-detect-gps-weather"
            onClick={handleDetectGps}
            disabled={isLocatingGps || isLoadingWeather}
            className="flex-1 sm:flex-initial px-4 py-2.5 bg-[#34D399] hover:bg-[#2fc28c] active:bg-[#259d71] text-[#0F2A1E] font-bold text-xs rounded-xl transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60 min-h-[42px]"
            title={t.detectGpsBtn}
          >
            <MapPin className={`w-4 h-4 ${isLocatingGps ? 'animate-bounce' : ''}`} />
            <span>{isLocatingGps ? t.detectingLocation : t.detectGpsBtn}</span>
          </button>

          {/* Refresh button */}
          <button
            type="button"
            id="btn-refresh-weather"
            onClick={handleRefresh}
            disabled={isLoadingWeather}
            className="p-2.5 bg-white/10 hover:bg-white/20 active:bg-white/30 text-white rounded-xl transition-colors cursor-pointer disabled:opacity-50 min-h-[42px] min-w-[42px] flex items-center justify-center"
            title={t.refreshWeather}
          >
            <RefreshCw className={`w-4 h-4 ${isLoadingWeather ? 'animate-spin' : ''}`} />
          </button>
        </div>
      </div>

      {/* GPS Warning if Denied with District Dropdown */}
      {gpsError && (
        <div className="bg-amber-50 border-b border-amber-200 px-5 py-3 text-xs text-amber-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
            <span>{gpsError}</span>
          </div>
          <span className="text-[11px] font-semibold text-amber-900">
            {isHindi ? 'नीचे से कृषि क्षेत्र चुनें ⬇' : 'Select a farming belt below ⬇'}
          </span>
        </div>
      )}

      {/* Regional Farming Belts Selector Bar */}
      <div className="bg-[#F8FAF7] px-5 py-2.5 border-b border-[#E2E8DF] flex flex-wrap items-center justify-between gap-2 text-xs">
        <div className="flex items-center gap-2 text-slate-600 font-medium">
          <Sparkles className="w-3.5 h-3.5 text-[#163D2B]" />
          <span>{isHindi ? 'प्रमुख कृषि क्षेत्र:' : 'Quick Farming Regions:'}</span>
        </div>

        <div className="flex flex-wrap items-center gap-1.5">
          {PRESET_AGRI_REGIONS.slice(0, 5).map((preset) => (
            <button
              key={preset.id}
              type="button"
              onClick={() => loadWeatherForPreset(preset)}
              className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                selectedPreset.id === preset.id && !weather?.isGpsSource
                  ? 'bg-[#163D2B] text-white shadow-xs'
                  : 'bg-white text-slate-700 hover:bg-[#EAF0EB] border border-[#E2E8DF]'
              }`}
            >
              {isHindi ? preset.nameHi.split(' ')[0] : preset.name.split(' ')[0]}
            </button>
          ))}

          {/* More regions dropdown */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setShowRegionDropdown(!showRegionDropdown)}
              className="px-2 py-1 bg-white hover:bg-[#EAF0EB] text-slate-700 border border-[#E2E8DF] rounded-lg text-xs font-semibold flex items-center gap-1 cursor-pointer"
            >
              <span>{isHindi ? 'अन्य क्षेत्र' : 'More Belts'}</span>
              <ChevronDown className="w-3 h-3" />
            </button>

            {showRegionDropdown && (
              <div className="absolute right-0 mt-1 w-64 bg-white rounded-2xl shadow-xl border border-[#E2E8DF] py-2 z-30">
                <div className="px-3 py-1 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                  {isHindi ? 'सभी कृषि क्षेत्र' : 'All Farming Belts'}
                </div>
                {PRESET_AGRI_REGIONS.map((preset) => (
                  <button
                    key={preset.id}
                    type="button"
                    onClick={() => {
                      loadWeatherForPreset(preset);
                      setShowRegionDropdown(false);
                    }}
                    className="w-full text-left px-3 py-2 text-xs text-slate-700 hover:bg-[#EAF0EB] hover:text-[#163D2B] flex flex-col cursor-pointer transition-colors"
                  >
                    <span className="font-bold">{isHindi ? preset.nameHi : preset.name}</span>
                    <span className="text-[11px] text-slate-500">{isHindi ? preset.stateHi : preset.state}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main Meteorological Dashboard */}
      {weather && (
        <div className="p-5 sm:p-6 space-y-6">
          {/* Top Row: Current Primary Temperature & Core Metrics */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {/* 1. Temperature & Condition */}
            <div className="col-span-2 sm:col-span-1 bg-[#F8FAF7] rounded-2xl p-4 border border-[#E2E8DF] flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-500 flex items-center justify-center shrink-0 border border-amber-100">
                {renderWeatherIcon(weather.weatherCode, 'w-7 h-7 text-amber-500')}
              </div>
              <div>
                <p className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  {weather.temperature}°C
                </p>
                <p className="text-xs font-semibold text-[#163D2B] truncate">
                  {isHindi ? weather.conditionTextHi : weather.conditionText}
                </p>
                <p className="text-[11px] text-slate-500">
                  {t.feelsLike}: {weather.feelsLike}°C
                </p>
              </div>
            </div>

            {/* 2. Humidity */}
            <div className="bg-[#F8FAF7] rounded-2xl p-4 border border-[#E2E8DF] flex items-center gap-3.5">
              <div className="w-11 h-11 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 border border-blue-100">
                <Droplets className="w-6 h-6" />
              </div>
              <div>
                <p className="text-xs text-slate-500 font-medium">{t.humidity}</p>
                <p className="text-xl sm:text-2xl font-extrabold text-slate-900">
                  {weather.humidity}%
                </p>
                <span className={`text-[10px] font-bold px-1.5 py-0.2 rounded ${
                  weather.humidity > 75 ? 'bg-amber-100 text-amber-800' : 'bg-emerald-100 text-emerald-800'
                }`}>
                  {weather.humidity > 75 ? (isHindi ? 'उच्च नमी' : 'High Moisture') : (isHindi ? 'सामान्य' : 'Normal')}
                </span>
              </div>
            </div>

            {/* 3. Rain Probability */}
            <div className="bg-[#F8FAF7] rounded-2xl p-4 border border-[#E2E8DF] flex items-center gap-3.5">
              <div className="w-11 h-11 rounded-2xl bg-cyan-50 text-cyan-600 flex items-center justify-center shrink-0 border border-cyan-100">
                <CloudRain className="w-6 h-6" />
              </div>
              <div>
                <p className="text-xs text-slate-500 font-medium">{t.rainfallChance}</p>
                <p className="text-xl sm:text-2xl font-extrabold text-slate-900">
                  {weather.rainProbability}%
                </p>
                <p className="text-[11px] text-slate-500">
                  {weather.precipitationMm > 0 ? `${weather.precipitationMm} mm rain` : (isHindi ? 'वर्षा की कम संभावना' : 'Dry conditions')}
                </p>
              </div>
            </div>

            {/* 4. Wind Speed */}
            <div className="bg-[#F8FAF7] rounded-2xl p-4 border border-[#E2E8DF] flex items-center gap-3.5">
              <div className="w-11 h-11 rounded-2xl bg-teal-50 text-teal-600 flex items-center justify-center shrink-0 border border-teal-100">
                <Wind className="w-6 h-6" />
              </div>
              <div>
                <p className="text-xs text-slate-500 font-medium">{t.windSpeed}</p>
                <p className="text-xl sm:text-2xl font-extrabold text-slate-900">
                  {weather.windSpeedKmH} <span className="text-xs font-medium text-slate-500">km/h</span>
                </p>
                <p className="text-[11px] text-slate-500 flex items-center gap-1">
                  <Compass className="w-3 h-3 text-teal-600" />
                  <span>{weather.windDirection}° {isHindi ? 'दिशा' : 'heading'}</span>
                </p>
              </div>
            </div>
          </div>

          {/* Actionable Agricultural Intelligence: Spray Window & Disease Risk Bar */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Pesticide Spray Window */}
            <div
              className={`rounded-2xl p-4.5 border transition-all ${
                weather.sprayAdvisory.status === 'Optimal'
                  ? 'bg-emerald-50/70 border-emerald-200'
                  : weather.sprayAdvisory.status === 'Caution'
                  ? 'bg-amber-50/70 border-amber-200'
                  : 'bg-rose-50/70 border-rose-200'
              }`}
            >
              <div className="flex items-center justify-between gap-2 mb-2">
                <div className="flex items-center gap-2">
                  {weather.sprayAdvisory.status === 'Optimal' ? (
                    <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                  ) : weather.sprayAdvisory.status === 'Caution' ? (
                    <AlertTriangle className="w-5 h-5 text-amber-600" />
                  ) : (
                    <XCircle className="w-5 h-5 text-rose-600" />
                  )}
                  <h4 className="text-sm font-bold text-slate-900">{t.sprayWindow}</h4>
                </div>

                <span
                  className={`text-xs font-extrabold px-2.5 py-1 rounded-full uppercase tracking-wider ${
                    weather.sprayAdvisory.status === 'Optimal'
                      ? 'bg-emerald-600 text-white shadow-xs'
                      : weather.sprayAdvisory.status === 'Caution'
                      ? 'bg-amber-500 text-slate-900'
                      : 'bg-rose-600 text-white'
                  }`}
                >
                  {isHindi ? weather.sprayAdvisory.statusHi : weather.sprayAdvisory.status}
                </span>
              </div>

              <p className="text-xs text-slate-700 leading-relaxed font-medium">
                {isHindi ? weather.sprayAdvisory.reasonHi : weather.sprayAdvisory.reason}
              </p>
            </div>

            {/* Disease Risk Warning */}
            <div
              className={`rounded-2xl p-4.5 border transition-all ${
                weather.diseaseRisk.level === 'High'
                  ? 'bg-rose-50/70 border-rose-200'
                  : weather.diseaseRisk.level === 'Moderate'
                  ? 'bg-amber-50/70 border-amber-200'
                  : 'bg-emerald-50/70 border-emerald-200'
              }`}
            >
              <div className="flex items-center justify-between gap-2 mb-2">
                <div className="flex items-center gap-2">
                  <Thermometer
                    className={`w-5 h-5 ${
                      weather.diseaseRisk.level === 'High'
                        ? 'text-rose-600'
                        : weather.diseaseRisk.level === 'Moderate'
                        ? 'text-amber-600'
                        : 'text-emerald-600'
                    }`}
                  />
                  <h4 className="text-sm font-bold text-slate-900">{t.diseaseRiskTitle}</h4>
                </div>

                <span
                  className={`text-xs font-extrabold px-2.5 py-1 rounded-full uppercase tracking-wider ${
                    weather.diseaseRisk.level === 'High'
                      ? 'bg-rose-600 text-white'
                      : weather.diseaseRisk.level === 'Moderate'
                      ? 'bg-amber-500 text-slate-900'
                      : 'bg-emerald-600 text-white'
                  }`}
                >
                  {isHindi
                    ? `${weather.diseaseRisk.levelHi} खतरा`
                    : `${weather.diseaseRisk.level} Risk`}
                </span>
              </div>

              <p className="text-xs text-slate-700 leading-relaxed font-medium">
                {isHindi ? weather.diseaseRisk.warningHi : weather.diseaseRisk.warning}
              </p>
            </div>
          </div>

          {/* 5-Day Agricultural Forecast Strip */}
          {!compact && weather.forecast && weather.forecast.length > 0 && (
            <div className="pt-2">
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#163D2B] flex items-center gap-1.5">
                  <CloudSun className="w-4 h-4 text-[#163D2B]" />
                  <span>{t.fiveDayForecast}</span>
                </h4>
                <span className="text-[11px] text-slate-500">
                  {isHindi ? 'वर्षा एवं तापमान पूर्वानुमान' : 'Rain probability & temperatures'}
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
                {weather.forecast.map((f, idx) => (
                  <div
                    key={f.date}
                    className={`p-3 rounded-2xl border text-center space-y-1 transition-all ${
                      idx === 0
                        ? 'bg-[#EAF0EB]/70 border-[#163D2B]/30 shadow-xs'
                        : 'bg-white border-[#E2E8DF] hover:border-slate-300'
                    }`}
                  >
                    <p className="text-xs font-bold text-slate-900">
                      {isHindi ? f.dayNameHi : f.dayName}
                    </p>
                    <div className="py-1 flex justify-center">
                      {renderWeatherIcon(f.weatherCode, 'w-6 h-6 text-amber-500')}
                    </div>
                    <p className="text-xs font-bold text-slate-800">
                      {f.tempMax}° / <span className="text-slate-500 font-normal">{f.tempMin}°</span>
                    </p>
                    <div className="flex items-center justify-center gap-1 text-[11px] font-semibold text-cyan-700">
                      <Droplets className="w-3 h-3" />
                      <span>{f.rainProb}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
