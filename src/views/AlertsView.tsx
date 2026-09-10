import React, { useState, useEffect } from 'react';
import { RiskAlert, WeatherCondition } from '../types';
import { AgroApiService } from '../services/agroApi';
import { SeverityBadge } from '../components/SeverityBadge';
import {
  BellRing,
  Filter,
  CloudSun,
  Thermometer,
  Droplets,
  Wind,
  ShieldCheck,
  CheckCircle2,
  Calendar,
  AlertTriangle,
  ArrowRight,
  ExternalLink
} from 'lucide-react';
import { useToast } from '../components/Toast';

export const AlertsView: React.FC = () => {
  const { showToast } = useToast();
  const [alerts, setAlerts] = useState<RiskAlert[]>([]);
  const [weather, setWeather] = useState<WeatherCondition | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>('All Alerts');
  const [selectedAlert, setSelectedAlert] = useState<RiskAlert | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadAlertsData() {
      try {
        const [alertsData, weatherData] = await Promise.all([
          AgroApiService.getAlerts(activeCategory),
          AgroApiService.getWeather()
        ]);
        setAlerts(alertsData);
        setWeather(weatherData);
      } finally {
        setLoading(false);
      }
    }
    loadAlertsData();
  }, [activeCategory]);

  const categories = ['All Alerts', 'Disease Risk', 'Pest Risk', 'Weather'];

  return (
    <div id="early-warning-alerts-view" className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      {/* Page Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EAF0EB] text-[#163D2B] border border-[#163D2B]/15 text-xs font-semibold shadow-xs">
          <BellRing className="w-3.5 h-3.5 text-[#163D2B]" />
          <span>Predictive Agro-Meteorology Engine</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Early Warning & Crop Risk Alerts
        </h1>
        <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
          CropVision synthesizes live weather conditions (temperature, humidity, rainfall), crop growth phases, and historical regional pathology to anticipate pest outbreaks and spore germination before visible field loss occurs.
        </p>
      </div>

      {/* Weather Telemetry Banner */}
      {weather && (
        <div className="bg-[#163D2B] border border-[#0F2A1E] rounded-3xl p-6 sm:p-8 text-white shadow-xs space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#0F2A1E] pb-4">
            <div>
              <span className="text-xs text-[#34D399] font-mono uppercase tracking-wider font-semibold">
                Integrated Farm Sensor Array • {weather.city}
              </span>
              <h2 className="text-xl font-bold text-white mt-0.5">
                Current Agro-Climatic Parameters
              </h2>
            </div>
            <span className="text-xs text-white/60">Updated 10 mins ago via Indian Meteorological Mesh</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="bg-[#0F2A1E]/60 rounded-2xl p-4 backdrop-blur-xs border border-white/10 space-y-1">
              <div className="flex items-center gap-2 text-white/80 text-xs">
                <Thermometer className="w-4 h-4 text-[#34D399]" />
                <span>Air Temp</span>
              </div>
              <p className="text-2xl font-extrabold text-white">{weather.temperature}°C</p>
              <p className="text-[11px] text-white/60">Optimal vegetative range</p>
            </div>

            <div className="bg-[#0F2A1E]/60 rounded-2xl p-4 backdrop-blur-xs border border-white/10 space-y-1">
              <div className="flex items-center gap-2 text-white/80 text-xs">
                <Droplets className="w-4 h-4 text-[#34D399]" />
                <span>Relative Humidity</span>
              </div>
              <p className="text-2xl font-extrabold text-white">{weather.humidity}%</p>
              <p className="text-[11px] text-amber-300 font-semibold">Fungal spore incubation</p>
            </div>

            <div className="bg-[#0F2A1E]/60 rounded-2xl p-4 backdrop-blur-xs border border-white/10 space-y-1">
              <div className="flex items-center gap-2 text-white/80 text-xs">
                <CloudSun className="w-4 h-4 text-[#34D399]" />
                <span>Precipitation</span>
              </div>
              <p className="text-2xl font-extrabold text-white">{weather.rainfallMm} mm</p>
              <p className="text-[11px] text-white/60">Intermittent drizzle</p>
            </div>

            <div className="bg-[#0F2A1E]/60 rounded-2xl p-4 backdrop-blur-xs border border-white/10 space-y-1">
              <div className="flex items-center gap-2 text-white/80 text-xs">
                <Wind className="w-4 h-4 text-[#34D399]" />
                <span>Wind Flow</span>
              </div>
              <p className="text-2xl font-extrabold text-white">{weather.windSpeedKmH} km/h</p>
              <p className="text-[11px] text-white/60">Airborne spore vectoring</p>
            </div>
          </div>
        </div>
      )}

      {/* Category Filters */}
      <div className="flex items-center justify-between flex-wrap gap-4 border-b border-[#E2E8DF] pb-4">
        <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
          <Filter className="w-4 h-4 text-slate-500 mr-1" />
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                activeCategory === cat
                  ? 'bg-[#163D2B] text-white shadow-xs'
                  : 'bg-[#EAF0EB] text-slate-700 hover:bg-[#E2E8DF]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
        <span className="text-xs text-slate-500 font-medium">
          Showing {alerts.length} verified agricultural alerts
        </span>
      </div>

      {/* Alert Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {alerts.map((alert) => (
          <div
            key={alert.id}
            className="bg-white rounded-3xl p-6 border border-[#E2E8DF] shadow-xs hover:shadow-sm transition-shadow flex flex-col justify-between space-y-4"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <SeverityBadge severity={alert.severity} size="md" />
                  <span className="text-xs font-semibold text-slate-500 uppercase">
                    {alert.category}
                  </span>
                </div>
                <span className="text-xs text-slate-400 font-mono flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5" />
                  {alert.validUntil}
                </span>
              </div>

              <h3 className="text-lg font-bold text-slate-900 leading-snug">
                {alert.title}
              </h3>

              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {alert.description}
              </p>

              <div className="bg-[#F3F5F2] p-3 rounded-xl border border-[#E2E8DF] space-y-1 text-xs">
                <div className="text-slate-500">
                  <strong className="text-slate-700">Trigger Conditions:</strong> {alert.weatherFactor}
                </div>
                <div className="text-[#163D2B] font-medium">
                  <strong className="text-slate-900">Affected Crops:</strong> {alert.affectedCrops.join(', ')}
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-[#E2E8DF] flex items-center justify-between">
              <span className="text-xs text-slate-500">Advisory Code: {alert.id.toUpperCase()}</span>
              <button
                onClick={() => setSelectedAlert(alert)}
                className="px-4 py-2 bg-[#EAF0EB] hover:bg-[#E2E8DF] text-[#163D2B] rounded-xl text-xs font-bold transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <span>View Recommendations</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal: View Recommendations */}
      {selectedAlert && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 space-y-6 border border-[#E2E8DF] shadow-2xl animate-in zoom-in-95 duration-200">
            <div className="flex items-start justify-between border-b border-[#E2E8DF] pb-4">
              <div>
                <SeverityBadge severity={selectedAlert.severity} size="sm" />
                <h3 className="text-lg font-bold text-slate-900 mt-2">
                  {selectedAlert.title}
                </h3>
              </div>
              <button
                onClick={() => setSelectedAlert(null)}
                className="text-slate-400 hover:text-slate-600 p-1 cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4 text-xs sm:text-sm text-slate-700">
              <div className="p-4 bg-[#EAF0EB] rounded-2xl border border-[#E2E8DF] space-y-1">
                <p className="font-bold text-[#163D2B] text-sm">Recommended Action Plan:</p>
                <p className="text-slate-800 leading-relaxed">
                  {selectedAlert.recommendedAction}
                </p>
              </div>

              <div>
                <p className="font-bold text-slate-900 mb-1">Impacted Field Strains:</p>
                <div className="flex flex-wrap gap-2">
                  {selectedAlert.affectedCrops.map((c) => (
                    <span key={c} className="px-2.5 py-1 bg-[#F3F5F2] border border-[#E2E8DF] font-semibold rounded-lg text-xs text-slate-800">
                      {c}
                    </span>
                  ))}
                </div>
              </div>

              <div className="p-3 bg-[#F3F5F2] rounded-xl text-xs text-slate-500 border border-[#E2E8DF]">
                Data generated in partnership with Regional Krishi Vigyan Kendra meteorological stations.
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setSelectedAlert(null)}
                className="px-5 py-2.5 bg-[#163D2B] hover:bg-[#1E4E37] text-white rounded-xl text-xs font-semibold transition-colors cursor-pointer"
              >
                Acknowledge & Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
