import React, { useState, useEffect } from 'react';
import { NavTab } from '../components/Navbar';
import { SeverityBadge } from '../components/SeverityBadge';
import { AgroApiService } from '../services/agroApi';
import { CropItem, RiskAlert, ScanRecord, WeatherCondition } from '../types';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import {
  ScanLine,
  Sprout,
  AlertTriangle,
  ShieldAlert,
  ArrowRight,
  TrendingUp,
  CloudRain,
  Thermometer,
  Wind,
  Calendar,
  Layers,
  ChevronRight,
  ExternalLink,
  HelpCircle,
  Plus
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

interface DashboardViewProps {
  onNavigate: (tab: NavTab) => void;
  onOpenCropDetails?: (crop: CropItem) => void;
  onNewScan?: () => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  onNavigate,
  onNewScan
}) => {
  const { currentUser, isAdmin } = useAuth();
  const [scans, setScans] = useState<ScanRecord[]>([]);
  const [crops, setCrops] = useState<CropItem[]>([]);
  const [alerts, setAlerts] = useState<RiskAlert[]>([]);
  const [weather, setWeather] = useState<WeatherCondition | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadDashboardData() {
      try {
        const targetUserId = isAdmin ? undefined : currentUser?.id;
        const [scansData, cropsData, alertsData, weatherData] = await Promise.all([
          AgroApiService.getScanHistory(targetUserId),
          AgroApiService.getMyCrops(),
          AgroApiService.getAlerts(),
          AgroApiService.getWeather()
        ]);
        setScans(scansData);
        setCrops(cropsData);
        setAlerts(alertsData);
        setWeather(weatherData);
      } finally {
        setLoading(false);
      }
    }
    loadDashboardData();
  }, [currentUser, isAdmin]);

  // Summary counts
  const totalScans = scans.length;
  const healthyCount = scans.filter((s) => s.severity === 'Low').length;
  const moderateRiskCount = scans.filter((s) => s.severity === 'Moderate').length;
  const highRiskCount = scans.filter((s) => s.severity === 'High' || s.severity === 'Severe').length;

  // Chart data: Crop Distribution & Status
  const cropHealthChartData = [
    { name: 'Healthy Crops', count: healthyCount, color: '#10b981' },
    { name: 'Moderate Risk', count: moderateRiskCount, color: '#f59e0b' },
    { name: 'High / Critical', count: highRiskCount, color: '#f97316' }
  ];

  const cropWiseScans = [
    { crop: 'Sugarcane', scans: 4, risk: 'High' },
    { crop: 'Rice', scans: 6, risk: 'Low' },
    { crop: 'Maize', scans: 5, risk: 'High' },
    { crop: 'Mustard', scans: 3, risk: 'Moderate' },
    { crop: 'Tomato', scans: 8, risk: 'Moderate' }
  ];

  return (
    <div id="farmer-dashboard-container" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Top Welcome Bar */}
      <div className="bg-[#163D2B] border border-[#0F2A1E] rounded-3xl p-6 sm:p-8 text-white shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-1.5">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#34D399] animate-pulse" />
            <span className="text-xs font-semibold uppercase tracking-wider text-[#34D399]">
              Karnal Agri-Hub • Field Station Active
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
            Welcome back, {currentUser?.name || 'Farmer'}
          </h1>
          <p className="text-xs sm:text-sm text-emerald-100/90 max-w-xl">
            {currentUser?.totalAcres || 18.0} Acres monitored in {currentUser?.location || 'Karnal Agri-Hub'}.
            Automated weather stations detect favorable spore incubation conditions today.
          </p>
        </div>

        {/* Quick Actions */}
        <div className="flex flex-wrap items-center gap-3">
          <button
            id="dash-scan-now-btn"
            onClick={onNewScan || (() => onNavigate('detect-disease'))}
            className="px-5 py-3 bg-white text-[#163D2B] hover:bg-[#F3F5F2] rounded-xl font-bold text-xs sm:text-sm shadow-xs flex items-center gap-2 transition-all group cursor-pointer"
          >
            <ScanLine className="w-4 h-4 text-[#163D2B] group-hover:rotate-12 transition-transform" />
            <span>New Crop Scan</span>
          </button>
          <button
            onClick={() => onNavigate('alerts')}
            className="px-4 py-3 bg-[#0F2A1E]/80 hover:bg-[#0F2A1E] border border-white/20 text-white rounded-xl font-medium text-xs sm:text-sm transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <AlertTriangle className="w-4 h-4 text-[#34D399]" />
            <span>View {alerts.length} Alerts</span>
          </button>
        </div>
      </div>

      {/* Summary Stat Cards (Prompt requirement) */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {/* Card 1: Total Scans */}
        <div className="bg-white rounded-2xl p-5 border border-[#E2E8DF] shadow-xs space-y-1">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-semibold uppercase tracking-wider">Total Scans</span>
            <div className="w-8 h-8 rounded-lg bg-[#EAF0EB] text-[#163D2B] flex items-center justify-center">
              <ScanLine className="w-4 h-4" />
            </div>
          </div>
          <p className="text-3xl font-extrabold text-slate-900">{totalScans}</p>
          <p className="text-[11px] text-[#163D2B] font-medium flex items-center gap-1">
            <TrendingUp className="w-3 h-3 text-[#10B981]" />
            <span>+4 scans this week</span>
          </p>
        </div>

        {/* Card 2: Healthy Crops */}
        <div className="bg-white rounded-2xl p-5 border border-[#E2E8DF] shadow-xs space-y-1">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-semibold uppercase tracking-wider">Healthy Crops</span>
            <div className="w-8 h-8 rounded-lg bg-[#EAF0EB] text-[#163D2B] flex items-center justify-center">
              <Sprout className="w-4 h-4" />
            </div>
          </div>
          <p className="text-3xl font-extrabold text-[#163D2B]">{healthyCount}</p>
          <p className="text-[11px] text-slate-500">Low disease indices observed</p>
        </div>

        {/* Card 3: Moderate Risk */}
        <div className="bg-white rounded-2xl p-5 border border-[#E2E8DF] shadow-xs space-y-1">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-semibold uppercase tracking-wider">Moderate Risk</span>
            <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center">
              <AlertTriangle className="w-4 h-4" />
            </div>
          </div>
          <p className="text-3xl font-extrabold text-amber-600">{moderateRiskCount}</p>
          <p className="text-[11px] text-amber-700 font-medium">Routine monitoring active</p>
        </div>

        {/* Card 4: High Risk */}
        <div className="bg-white rounded-2xl p-5 border border-[#E2E8DF] shadow-xs space-y-1">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-semibold uppercase tracking-wider">High Risk</span>
            <div className="w-8 h-8 rounded-lg bg-rose-50 text-rose-600 flex items-center justify-center">
              <ShieldAlert className="w-4 h-4" />
            </div>
          </div>
          <p className="text-3xl font-extrabold text-rose-600">{highRiskCount}</p>
          <p className="text-[11px] text-rose-700 font-medium">Prompt intervention advised</p>
        </div>
      </div>

      {/* Grid: Charts & Weather Telemetry */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left 8 Cols: Crop Health Overview Chart */}
        <div className="lg:col-span-8 bg-white rounded-3xl p-6 border border-[#E2E8DF] shadow-xs space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#E2E8DF] pb-3">
            <div>
              <h3 className="text-base font-bold text-slate-900 tracking-tight flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-[#163D2B]" />
                <span>Crop Health Overview & Scan Activity</span>
              </h3>
              <p className="text-xs text-slate-500">Diagnostic volume and risk categorization by crop type</p>
            </div>
            <div className="flex items-center gap-3 text-xs">
              <span className="flex items-center gap-1 text-[#163D2B] font-medium">
                <span className="w-2.5 h-2.5 rounded-full bg-[#10B981]" /> Healthy
              </span>
              <span className="flex items-center gap-1 text-amber-700 font-medium">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500" /> Moderate
              </span>
              <span className="flex items-center gap-1 text-rose-700 font-medium">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-500" /> High
              </span>
            </div>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={cropWiseScans} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <XAxis dataKey="crop" tick={{ fontSize: 12, fill: '#475569' }} />
                <YAxis tick={{ fontSize: 12, fill: '#475569' }} allowDecimals={false} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#163D2B', borderRadius: '12px', color: '#fff', fontSize: '12px', border: 'none' }}
                  cursor={{ fill: '#F3F5F2' }}
                />
                <Bar
                  dataKey="scans"
                  name="Recorded Scans"
                  fill="#163D2B"
                  radius={[6, 6, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="pt-2 text-xs text-slate-500 flex items-center justify-between border-t border-[#E2E8DF]">
            <span>Aggregated across sugarcane, rice, maize, mustard, and tomato plots</span>
            <button onClick={() => onNavigate('dashboard')} className="text-[#163D2B] font-semibold hover:underline cursor-pointer">
              Refresh Diagnostics
            </button>
          </div>
        </div>

        {/* Right 4 Cols: Live Field Microclimate */}
        <div className="lg:col-span-4 bg-white rounded-3xl p-6 border border-[#E2E8DF] shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-[#E2E8DF] pb-3">
            <h3 className="text-base font-bold text-slate-900 tracking-tight flex items-center gap-2">
              <CloudRain className="w-4 h-4 text-[#163D2B]" />
              <span>Microclimate Weather</span>
            </h3>
            <span className="text-[11px] bg-[#EAF0EB] text-[#163D2B] px-2.5 py-0.5 rounded font-mono font-medium border border-[#163D2B]/15">
              Live Sensor
            </span>
          </div>

          {weather && (
            <div className="space-y-4">
              <div className="flex items-baseline justify-between bg-[#F3F5F2] p-4 rounded-2xl border border-[#E2E8DF]">
                <div>
                  <p className="text-xs text-slate-500 font-medium">Temperature</p>
                  <p className="text-3xl font-extrabold text-slate-900 mt-1">{weather.temperature}°C</p>
                  <p className="text-[11px] text-slate-600 mt-0.5">{weather.forecast}</p>
                </div>
                <div className="w-12 h-12 rounded-xl bg-[#EAF0EB] text-[#163D2B] flex items-center justify-center">
                  <Thermometer className="w-6 h-6" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="p-3 bg-[#F3F5F2] rounded-xl border border-[#E2E8DF]">
                  <div className="flex items-center gap-1 text-slate-500 mb-1">
                    <CloudRain className="w-3.5 h-3.5 text-[#163D2B]" />
                    <span>Relative Humidity</span>
                  </div>
                  <p className="text-lg font-bold text-slate-900">{weather.humidity}%</p>
                  <p className="text-[10px] text-amber-700">Spore incubation alert</p>
                </div>

                <div className="p-3 bg-[#F3F5F2] rounded-xl border border-[#E2E8DF]">
                  <div className="flex items-center gap-1 text-slate-500 mb-1">
                    <Wind className="w-3.5 h-3.5 text-slate-600" />
                    <span>Wind Velocity</span>
                  </div>
                  <p className="text-lg font-bold text-slate-900">{weather.windSpeedKmH} km/h</p>
                  <p className="text-[10px] text-slate-500">East-northeast flow</p>
                </div>
              </div>

              <div className="p-3.5 bg-[#EAF0EB] rounded-xl border border-[#E2E8DF] text-xs text-slate-800">
                <strong className="font-semibold block mb-0.5 text-[#163D2B]">Weather Pathology Correlation:</strong>
                High humidity ({weather.humidity}%) triggers automatic fungal blight warnings for Rice & Tomatoes.
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Grid: My Crops & Active Risk Alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* My Crops quick cards */}
        <div className="lg:col-span-6 bg-white rounded-3xl p-6 border border-[#E2E8DF] shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-slate-900 tracking-tight flex items-center gap-2">
                <Sprout className="w-4 h-4 text-[#163D2B]" />
                <span>My Monitored Crops ({crops.length})</span>
              </h3>
              <p className="text-xs text-slate-500">Active acreage in Karnal cluster</p>
            </div>
            <button
              onClick={() => onNavigate('dashboard')}
              className="text-xs text-[#163D2B] font-semibold hover:underline flex items-center gap-1 cursor-pointer"
            >
              <span>Manage Plots</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {crops.slice(0, 4).map((crop) => (
              <div
                key={crop.id}
                className="p-3.5 rounded-2xl border border-[#E2E8DF] hover:border-[#163D2B] bg-[#F3F5F2]/50 hover:bg-[#EAF0EB]/50 transition-all flex flex-col justify-between space-y-2"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="font-bold text-sm text-slate-900">{crop.name}</h4>
                    <p className="text-[11px] text-slate-500">{crop.variety}</p>
                  </div>
                  <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-white border border-[#E2E8DF] text-slate-700">
                    {crop.acres} Ac
                  </span>
                </div>

                <div className="text-xs space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500 text-[11px]">Health:</span>
                    <span className={`font-semibold text-[11px] ${
                      crop.healthStatus === 'Healthy' ? 'text-[#163D2B]' : 'text-amber-700'
                    }`}>
                      {crop.healthStatus}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-600 truncate">
                    ⚠️ {crop.currentRisk}
                  </p>
                </div>

                <button
                  onClick={() => onNavigate('detect-disease')}
                  className="w-full mt-1 py-1.5 bg-white hover:bg-[#163D2B] hover:text-white border border-[#E2E8DF] text-slate-700 text-xs font-semibold rounded-lg transition-colors text-center cursor-pointer"
                >
                  Scan {crop.name}
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Active Risk Alerts */}
        <div className="lg:col-span-6 bg-white rounded-3xl p-6 border border-[#E2E8DF] shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-slate-900 tracking-tight flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-amber-600" />
                <span>Active Risk Alerts</span>
              </h3>
              <p className="text-xs text-slate-500">Real-time alerts triggered by weather & scouting</p>
            </div>
            <button
              onClick={() => onNavigate('alerts')}
              className="text-xs text-[#163D2B] font-semibold hover:underline flex items-center gap-1 cursor-pointer"
            >
              <span>View All ({alerts.length})</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-3">
            {alerts.slice(0, 3).map((alert) => (
              <div
                key={alert.id}
                className="p-4 rounded-2xl border border-[#E2E8DF] bg-[#F3F5F2]/60 hover:bg-[#F3F5F2] transition-colors space-y-2"
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <SeverityBadge severity={alert.severity} size="sm" />
                    <span className="text-[11px] font-semibold text-slate-500 uppercase">
                      {alert.category}
                    </span>
                  </div>
                  <span className="text-[11px] text-slate-400">{alert.validUntil}</span>
                </div>
                <h4 className="text-xs sm:text-sm font-bold text-slate-900">{alert.title}</h4>
                <p className="text-xs text-slate-600 leading-relaxed line-clamp-2">
                  {alert.description}
                </p>
                <div className="flex items-center justify-between pt-1">
                  <span className="text-[11px] text-[#163D2B] font-medium truncate max-w-xs">
                    Crops: {alert.affectedCrops.join(', ')}
                  </span>
                  <button
                    onClick={() => onNavigate('alerts')}
                    className="text-xs font-semibold text-[#163D2B] hover:text-[#1E4E37] underline flex items-center gap-0.5 cursor-pointer"
                  >
                    <span>Read Advisory</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Scan History Table (Explicit Prompt requirement) */}
      <div className="bg-white rounded-3xl p-6 border border-[#E2E8DF] shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#E2E8DF] pb-3">
          <div>
            <h3 className="text-base font-bold text-slate-900 tracking-tight flex items-center gap-2">
              <Calendar className="w-4 h-4 text-[#163D2B]" />
              <span>Recent Scan History</span>
            </h3>
            <p className="text-xs text-slate-500">Historical diagnostics across all crops on your farm</p>
          </div>
          <button
            onClick={() => onNavigate('dashboard')}
            className="text-xs font-semibold text-[#163D2B] hover:underline flex items-center gap-1 cursor-pointer"
          >
            <span>Complete Log Table</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs sm:text-sm">
            <thead>
              <tr className="border-b border-[#E2E8DF] text-slate-500 text-xs font-semibold uppercase tracking-wider">
                <th className="py-3 px-3">Crop</th>
                <th className="py-3 px-3">Date</th>
                <th className="py-3 px-3">Detection</th>
                <th className="py-3 px-3">Confidence</th>
                <th className="py-3 px-3">Severity</th>
                <th className="py-3 px-3">Recommendation</th>
                <th className="py-3 px-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E2E8DF]">
              {scans.slice(0, 5).map((scan) => (
                <tr key={scan.id} className="hover:bg-[#F3F5F2]/80 transition-colors">
                  <td className="py-3.5 px-3 font-bold text-slate-900 flex items-center gap-2">
                    <img
                      src={scan.imageUrl}
                      alt={scan.crop}
                      className="w-8 h-8 rounded-lg object-cover flex-shrink-0 border border-[#E2E8DF]"
                    />
                    <span>{scan.crop}</span>
                  </td>
                  <td className="py-3.5 px-3 text-slate-500 whitespace-nowrap text-xs">
                    {scan.date}
                  </td>
                  <td className="py-3.5 px-3 font-medium text-slate-800">
                    {scan.detectionName}
                  </td>
                  <td className="py-3.5 px-3 font-mono font-bold text-[#163D2B]">
                    {scan.confidence}%
                  </td>
                  <td className="py-3.5 px-3">
                    <SeverityBadge severity={scan.severity} size="sm" />
                  </td>
                  <td className="py-3.5 px-3 text-slate-600 max-w-xs truncate">
                    {scan.recommendationSummary}
                  </td>
                  <td className="py-3.5 px-3 text-right">
                    <button
                      onClick={() => onNavigate('detect-disease')}
                      className="text-xs font-semibold text-[#163D2B] hover:text-[#1E4E37] hover:underline cursor-pointer"
                    >
                      View Report
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
