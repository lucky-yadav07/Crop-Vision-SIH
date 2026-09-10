import React, { useState, useEffect } from 'react';
import {
  User,
  Sprout,
  Shield,
  ScanLine,
  FileCheck,
  AlertTriangle,
  Headphones,
  CheckCircle2,
  Calendar,
  MapPin,
  Building,
  KeyRound,
  Eye,
  EyeOff,
  ArrowRight,
  Sparkles,
  Phone,
  RefreshCw
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { ScanRecord, RiskAlert, ExpertConsultation, CropType } from '../types';
import { AgroApiService } from '../services/agroApi';
import { useToast } from '../components/Toast';

interface UserPortalViewProps {
  onNavigate: (tab: any) => void;
}

export const UserPortalView: React.FC<UserPortalViewProps> = ({ onNavigate }) => {
  const { currentUser, isAdmin, users, openAuthModal, resetUserPassword } = useAuth();
  const { showToast } = useToast();

  const [myScans, setMyScans] = useState<ScanRecord[]>([]);
  const [alerts, setAlerts] = useState<RiskAlert[]>([]);
  const [consultations, setConsultations] = useState<ExpertConsultation[]>([]);
  const [showPassword, setShowPassword] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [isChangingPass, setIsChangingPass] = useState(false);

  useEffect(() => {
    async function loadUserData() {
      if (!currentUser) return;
      try {
        // Strict Data Isolation: Only retrieve scans belonging to the active logged-in user
        const [scansData, alertsData] = await Promise.all([
          AgroApiService.getScanHistory(currentUser.id),
          AgroApiService.getAlerts()
        ]);
        setMyScans(scansData);
        setAlerts(alertsData);

        const storedConsultations = localStorage.getItem('agroguard_expert_requests');
        if (storedConsultations) {
          const allConsultations = JSON.parse(storedConsultations);
          // Data isolation: only show consultations belonging to this user
          if (Array.isArray(allConsultations)) {
            const userConsultations = allConsultations.filter(
              (c: ExpertConsultation) => c.userId === currentUser.id || c.farmerName === currentUser.name
            );
            setConsultations(userConsultations);
          }
        }
      } catch (err) {
        console.error('Error loading farmer portal data:', err);
      }
    }
    loadUserData();
  }, [currentUser]);

  const handleUpdatePassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser) return;
    if (!newPassword || newPassword.length < 6) {
      showToast('Error', 'Password must be at least 6 characters.', 'error');
      return;
    }
    const success = resetUserPassword(currentUser.id, newPassword);
    if (success) {
      showToast('Password Updated', 'Your predefined login password has been changed.', 'success');
      setNewPassword('');
      setIsChangingPass(false);
    }
  };

  // Farmer portal state
  const isSelf = currentUser?.role === 'user';

  return (
    <div id="user-portal-dashboard" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Farm Profile Header Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E2E8DF] shadow-xs relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-start gap-4">
            <div className="w-16 h-16 rounded-2xl bg-[#EAF0EB] text-4xl flex items-center justify-center border border-[#163D2B]/10 shrink-0">
              {currentUser?.avatar || '👨‍🌾'}
            </div>
            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold mb-1">
                <User className="w-3 h-3 text-emerald-600" />
                <span>{currentUser?.role === 'user' ? 'Kisan Member Portal' : 'Admin Signed In as User'}</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                {currentUser?.name}
              </h1>
              <p className="text-xs sm:text-sm text-slate-600 mt-0.5 flex flex-wrap items-center gap-x-3 gap-y-1">
                <span className="font-semibold text-slate-800">{currentUser?.farmName || 'Greenfield Farm'}</span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-slate-400" />
                  {currentUser?.location || 'Karnal, Haryana'}
                </span>
                <span>•</span>
                <span className="text-emerald-700 font-bold">{currentUser?.totalAcres || 18} Acres Registered</span>
              </p>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="flex flex-wrap items-center gap-2.5">
            <button
              onClick={() => onNavigate('detect-disease')}
              className="px-4 py-2.5 bg-[#163D2B] hover:bg-[#1E4E37] text-white text-xs sm:text-sm font-bold rounded-xl shadow-xs flex items-center gap-2 cursor-pointer transition-colors"
            >
              <ScanLine className="w-4 h-4 text-[#34D399]" />
              <span>Scan Crop Now</span>
            </button>

            <button
              onClick={() => onNavigate('expert')}
              className="px-4 py-2.5 bg-[#F3F5F2] hover:bg-[#EAF0EB] text-slate-800 text-xs sm:text-sm font-bold rounded-xl border border-[#E2E8DF] flex items-center gap-2 cursor-pointer transition-colors"
            >
              <Headphones className="w-4 h-4 text-[#163D2B]" />
              <span>Consult Agronomist</span>
            </button>
          </div>
        </div>

        {/* Crops Badge Bar */}
        <div className="mt-6 pt-4 border-t border-[#E2E8DF] flex flex-wrap items-center justify-between gap-4 text-xs">
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-bold text-slate-700">Monitored Crops on Your Land:</span>
            {(currentUser?.primaryCrops || ['Sugarcane', 'Rice', 'Wheat', 'Tomato']).map((crop) => (
              <span
                key={crop}
                className="px-2.5 py-1 rounded-lg bg-[#F8FAF7] border border-[#E2E8DF] font-semibold text-slate-800"
              >
                🌱 {crop}
              </span>
            ))}
          </div>

          <div className="text-slate-500 font-mono text-[11px]">
            Account ID: <strong>{currentUser?.username}</strong> | Last Login: {currentUser?.lastLogin || 'Today'}
          </div>
        </div>
      </div>

      {/* Grid: 2 Columns */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column (2 cols): Scans & Consultations */}
        <div className="lg:col-span-2 space-y-6">
          {/* Recent Scans & Moderation Status */}
          <div className="bg-white rounded-3xl p-6 border border-[#E2E8DF] shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                  <FileCheck className="w-5 h-5 text-[#163D2B]" />
                  <span>My Crop Scans & Expert Validation Status</span>
                </h3>
                <p className="text-xs text-slate-500">
                  Scans processed by CropVisionAI and validated by Chief Agronomist admin.
                </p>
              </div>
              <button
                onClick={() => onNavigate('history')}
                className="text-xs text-[#163D2B] font-bold hover:underline"
              >
                View Full History
              </button>
            </div>

            <div className="space-y-3">
              {myScans.slice(0, 4).map((scan) => (
                <div
                  key={scan.id}
                  className="p-4 rounded-2xl bg-[#F8FAF7] border border-[#E2E8DF] flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:border-[#163D2B]/30 transition-all"
                >
                  <div className="flex items-center gap-3.5">
                    <img
                      src={scan.imageUrl}
                      alt={scan.crop}
                      referrerPolicy="no-referrer"
                      className="w-14 h-14 rounded-xl object-cover border border-[#E2E8DF] shrink-0"
                    />
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-extrabold text-slate-900 text-sm">{scan.detectionName}</span>
                        <span className="text-[11px] px-2 py-0.2 rounded bg-white text-slate-600 border border-[#E2E8DF] font-bold">
                          {scan.crop}
                        </span>
                      </div>
                      <div className="text-xs text-slate-500 mt-0.5">
                        Confidence: <strong className="text-slate-800">{scan.confidence}%</strong> • Severity:{' '}
                        <strong className="text-amber-600">{scan.severity}</strong> • {scan.date}
                      </div>

                      {scan.verifiedByAdmin ? (
                        <div className="mt-1.5 flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md w-fit border border-emerald-200">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                          <span>Officially Verified by Agronomist admin</span>
                        </div>
                      ) : (
                        <div className="mt-1.5 text-[10px] text-slate-400">
                          AI Diagnostic Recorded • Under Regular Quality Monitoring
                        </div>
                      )}
                    </div>
                  </div>

                  <button
                    onClick={() => onNavigate('detect-disease')}
                    className="px-3.5 py-1.5 bg-white hover:bg-[#163D2B] hover:text-white text-slate-700 text-xs font-bold rounded-xl border border-[#E2E8DF] shadow-2xs transition-colors self-start sm:self-auto cursor-pointer"
                  >
                    Rescan
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Expert Responses for this Farmer */}
          <div className="bg-white rounded-3xl p-6 border border-[#E2E8DF] shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                  <Headphones className="w-5 h-5 text-[#163D2B]" />
                  <span>Agronomist Consultations & Official Responses</span>
                </h3>
                <p className="text-xs text-slate-500">
                  Direct guidance sent from National Agricultural Support Directorate.
                </p>
              </div>
            </div>

            <div className="space-y-3">
              {consultations.slice(0, 3).map((item) => (
                <div
                  key={item.id}
                  className="p-4 rounded-2xl border border-[#E2E8DF] bg-white space-y-2.5"
                >
                  <div className="flex items-center justify-between">
                    <div className="font-bold text-slate-900 text-xs sm:text-sm">
                      Inquiry for {item.crop}
                    </div>
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold ${
                        item.status === 'Resolved'
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-amber-100 text-amber-800'
                      }`}
                    >
                      {item.status}
                    </span>
                  </div>

                  <p className="text-xs text-slate-600 bg-[#F8FAF7] p-2.5 rounded-xl">
                    "{item.problemDescription}"
                  </p>

                  {item.officialReply && (
                    <div className="bg-[#EAF0EB] p-3 rounded-xl border border-[#163D2B]/15 text-xs space-y-1">
                      <div className="font-bold text-[#163D2B] flex items-center gap-1.5">
                        <Shield className="w-3.5 h-3.5" />
                        <span>Official Agronomist Advisory:</span>
                      </div>
                      <p className="text-slate-800">{item.officialReply}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column (1 col): Account Security & Quick Role Switcher */}
        <div className="space-y-6">
          {/* Predefined Account Details Card */}
          <div className="bg-white rounded-3xl p-6 border border-[#E2E8DF] shadow-xs space-y-4">
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <KeyRound className="w-4 h-4 text-[#163D2B]" />
              <span>Farmer Account Credentials</span>
            </h3>

            <div className="bg-[#F8FAF7] p-4 rounded-2xl border border-[#E2E8DF] text-xs space-y-2.5 font-mono">
              <div>
                <span className="text-slate-500 font-sans font-semibold block text-[11px]">Username</span>
                <span className="font-bold text-slate-900 text-sm">{currentUser?.username}</span>
              </div>
              <div>
                <span className="text-slate-500 font-sans font-semibold block text-[11px]">Registered Email</span>
                <span className="text-slate-700">{currentUser?.email}</span>
              </div>
              <div>
                <span className="text-slate-500 font-sans font-semibold block text-[11px]">Predefined Password</span>
                <div className="flex items-center justify-between mt-1">
                  <span className="font-bold text-[#163D2B] bg-white px-2 py-1 rounded border border-[#E2E8DF]">
                    {showPassword ? currentUser?.password : '••••••••••••'}
                  </span>
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="text-slate-400 hover:text-slate-700 text-xs font-sans font-bold flex items-center gap-1 cursor-pointer"
                  >
                    {showPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                    <span>{showPassword ? 'Hide' : 'Show'}</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Change Password Inline */}
            {!isChangingPass ? (
              <button
                type="button"
                onClick={() => setIsChangingPass(true)}
                className="w-full py-2 bg-[#F3F5F2] hover:bg-[#EAF0EB] text-slate-800 text-xs font-bold rounded-xl border border-[#E2E8DF] transition-colors cursor-pointer"
              >
                Change My Password
              </button>
            ) : (
              <form onSubmit={handleUpdatePassword} className="space-y-2 text-xs pt-2 border-t border-[#E2E8DF]">
                <label className="block font-bold text-slate-700">Enter New Password</label>
                <input
                  type="text"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Min 6 characters"
                  className="w-full px-3 py-2 bg-[#F3F5F2] border border-[#E2E8DF] rounded-xl text-slate-900 focus:outline-none focus:border-[#163D2B]"
                />
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setIsChangingPass(false)}
                    className="flex-1 py-1.5 text-slate-600 text-xs font-bold hover:bg-slate-100 rounded-lg"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-1.5 bg-[#163D2B] text-white text-xs font-bold rounded-lg"
                  >
                    Save
                  </button>
                </div>
              </form>
            )}
          </div>

          {/* Switch Account Gate */}
          <div className="bg-white rounded-3xl p-6 border border-[#E2E8DF] shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <KeyRound className="w-4 h-4 text-[#163D2B]" />
                <span>Switch Portal Account</span>
              </h3>
              <span className="text-[10px] font-bold text-amber-700 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-md">
                Password Protected
              </span>
            </div>

            <p className="text-xs text-slate-600">
              Switching to another farmer's isolated portal or to the Administrator Portal requires entering that account's password.
            </p>

            <div className="space-y-2.5 text-xs">
              <button
                type="button"
                onClick={() => openAuthModal()}
                className="w-full p-3 rounded-2xl bg-[#F8FAF7] border border-[#E2E8DF] text-left hover:border-[#163D2B] transition-colors flex items-center justify-between group cursor-pointer"
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center text-sm font-bold">
                    👨‍🌾
                  </div>
                  <div>
                    <div className="font-bold text-slate-900 group-hover:text-[#163D2B] flex items-center gap-1.5">
                      <span>Sign In with Another Account</span>
                      <span className="text-[10px] bg-emerald-100 text-emerald-800 px-1.5 py-0.2 rounded font-bold">
                        Farmer
                      </span>
                    </div>
                    <div className="text-[11px] text-slate-500">Enter your credentials to switch account</div>
                  </div>
                </div>
                <div className="flex items-center gap-1 text-[11px] text-[#163D2B] font-bold group-hover:translate-x-0.5 transition-transform">
                  <span>Switch</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </button>

              <button
                type="button"
                onClick={() => openAuthModal('admin')}
                className="w-full p-3 rounded-2xl bg-[#163D2B] text-white text-left shadow-xs hover:bg-[#1E4E37] transition-all flex items-center justify-between group cursor-pointer"
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-white/10 flex items-center justify-center text-sm">
                    🛡️
                  </div>
                  <div>
                    <div className="font-bold text-white flex items-center gap-1.5">
                      <span>Access Administrator Portal</span>
                      <span className="text-[10px] bg-[#34D399] text-[#163D2B] px-1.5 py-0.2 rounded font-bold">
                        Admin Only
                      </span>
                    </div>
                    <div className="text-[11px] text-white/80">Authorized Agronomists • Password Required</div>
                  </div>
                </div>
                <div className="flex items-center gap-1 text-[11px] text-[#34D399] font-bold group-hover:translate-x-0.5 transition-transform">
                  <span>Admin Login</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
