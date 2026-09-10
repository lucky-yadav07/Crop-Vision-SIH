import React, { useState, useEffect } from 'react';
import {
  Shield,
  Users,
  AlertTriangle,
  FileCheck,
  Headphones,
  Sliders,
  Plus,
  Search,
  Filter,
  Download,
  CheckCircle2,
  XCircle,
  Eye,
  EyeOff,
  Edit2,
  Trash2,
  Radio,
  Send,
  Sparkles,
  RefreshCw,
  KeyRound,
  ExternalLink,
  ChevronRight,
  UserCheck,
  Lock,
  ArrowRight,
  Sprout,
  Activity,
  AlertOctagon,
  Phone,
  MapPin,
  Calendar,
  Check,
  Copy,
  X
} from 'lucide-react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { useAuth } from '../context/AuthContext';
import { UserAccount, ScanRecord, RiskAlert, ExpertConsultation, CropType, SeverityLevel } from '../types';
import { AgroApiService } from '../services/agroApi';
import { useToast } from '../components/Toast';

type AdminTab = 'overview' | 'users' | 'scans' | 'alerts' | 'expert-desk' | 'settings';

export const AdminPortalView: React.FC = () => {
  const {
    currentUser,
    users,
    isAdmin,
    login,
    switchUser,
    openAuthModal,
    resetUserPassword,
    toggleUserStatus,
    addUser,
    auditLogs,
    addAuditLog,
    systemConfig,
    updateSystemConfig
  } = useAuth();

  const { showToast } = useToast();
  const [activeTab, setActiveTab] = useState<AdminTab>('overview');

  // Admin access gate state
  const [adminPasswordInput, setAdminPasswordInput] = useState('');
  const [adminPasswordError, setAdminPasswordError] = useState('');
  const [showAdminPassword, setShowAdminPassword] = useState(false);

  // Scans state
  const [scans, setScans] = useState<ScanRecord[]>([]);
  const [loadingScans, setLoadingScans] = useState(false);
  const [selectedScanForReview, setSelectedScanForReview] = useState<ScanRecord | null>(null);
  const [adminNoteInput, setAdminNoteInput] = useState('');

  // Alerts state
  const [alerts, setAlerts] = useState<RiskAlert[]>([]);
  const [isNewAlertModalOpen, setIsNewAlertModalOpen] = useState(false);
  const [newAlertForm, setNewAlertForm] = useState<{
    title: string;
    category: 'Disease Risk' | 'Pest Risk' | 'Weather';
    severity: SeverityLevel;
    affectedCrops: CropType[];
    description: string;
    weatherFactor: string;
    recommendedAction: string;
  }>({
    title: '',
    category: 'Disease Risk',
    severity: 'High',
    affectedCrops: ['Tomato', 'Potato'],
    description: '',
    weatherFactor: 'Relative Humidity > 85% with intermittent rain',
    recommendedAction: ''
  });

  // Consultations state
  const [consultations, setConsultations] = useState<ExpertConsultation[]>([]);
  const [selectedConsultation, setSelectedConsultation] = useState<ExpertConsultation | null>(null);
  const [consultationReplyInput, setConsultationReplyInput] = useState('');

  // User Management modals
  const [isNewUserModalOpen, setIsNewUserModalOpen] = useState(false);
  const [newUserForm, setNewUserForm] = useState({
    username: '',
    email: '',
    password: '',
    name: '',
    role: 'user' as 'user' | 'admin',
    farmName: '',
    location: '',
    district: '',
    state: '',
    totalAcres: 10,
    phone: ''
  });

  const [passwordResetUserId, setPasswordResetUserId] = useState<string | null>(null);
  const [newPasswordInput, setNewPasswordInput] = useState('');
  const [showPasswordsMap, setShowPasswordsMap] = useState<Record<string, boolean>>({});
  const [selectedUserForDataView, setSelectedUserForDataView] = useState<UserAccount | null>(null);

  // Fetch scans, alerts, and consultations on load
  useEffect(() => {
    async function loadData() {
      setLoadingScans(true);
      try {
        const [fetchedScans, fetchedAlerts] = await Promise.all([
          AgroApiService.getScanHistory(),
          AgroApiService.getAlerts()
        ]);
        setScans(fetchedScans);
        setAlerts(fetchedAlerts);

        // Load consultations from local storage
        const storedConsultations = localStorage.getItem('agroguard_expert_requests');
        if (storedConsultations) {
          try {
            const parsed = JSON.parse(storedConsultations);
            if (Array.isArray(parsed)) {
              const normalized = parsed.map((c: ExpertConsultation) => {
                if (c.userId === 'user-1' || c.farmerName === 'Ramesh Patel') {
                  return { ...c, farmerName: 'user1', userId: 'user-1' };
                }
                if (c.userId === 'user-2' || c.farmerName === 'Priya Sharma') {
                  return { ...c, farmerName: 'user2', userId: 'user-2' };
                }
                if (c.assignedOfficer === 'Dr. Vikram Joshi') {
                  return { ...c, assignedOfficer: 'admin' };
                }
                return c;
              });
              setConsultations(normalized);
            }
          } catch (e) {
            console.warn('Could not parse stored consultations:', e);
          }
        } else {
          // Provide realistic initial consultations
          const initial: ExpertConsultation[] = [
            {
              id: 'exp-101',
              farmerName: 'user1',
              userId: 'user-1',
              phone: '+91 98765 43210',
              crop: 'Tomato',
              problemDescription: 'Dark concentric rings observed on lower leaves of tomato plants. Spreading quickly after rain.',
              location: 'Karnal, Haryana',
              contactPreference: 'Phone Call',
              urgency: 'Urgent (within 4h)',
              status: 'Resolved',
              createdAt: 'Yesterday, 10:15 AM',
              assignedOfficer: 'admin',
              officialReply: 'Confirmed Early Blight (Alternaria solani). Immediately spray Mancozeb 75 WP @ 2.5g/L and prune lower infected foliage.',
              resolvedAt: 'Yesterday, 12:40 PM'
            },
            {
              id: 'exp-102',
              farmerName: 'user2',
              userId: 'user-2',
              phone: '+91 98112 34567',
              crop: 'Chili',
              problemDescription: 'Upward curling of leaves with slight chlorosis on shoot tips. Whitefly presence suspected.',
              location: 'Nashik, Maharashtra',
              contactPreference: 'WhatsApp',
              urgency: 'Standard (within 24h)',
              status: 'Under Review',
              createdAt: 'Today, 08:30 AM',
              assignedOfficer: 'admin'
            }
          ];
          setConsultations(initial);
          localStorage.setItem('agroguard_expert_requests', JSON.stringify(initial));
        }
      } catch (err) {
        console.error('Failed to load admin telemetry:', err);
      } finally {
        setLoadingScans(false);
      }
    }
    loadData();
  }, []);

  // If user is not admin, show Access Restricted Password Gate
  if (!isAdmin) {
    const handleAdminLoginSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      setAdminPasswordError('');
      if (!adminPasswordInput) {
        setAdminPasswordError('Please enter the administrator password.');
        return;
      }
      const res = login('admin', adminPasswordInput);
      if (!res.success) {
        setAdminPasswordError(res.message || 'Incorrect administrator password. Access denied.');
      } else {
        showToast('Admin Authenticated', 'Welcome back admin. Admin session active.', 'success');
        setAdminPasswordInput('');
      }
    };

    return (
      <div id="admin-access-restricted" className="max-w-xl mx-auto px-4 py-16 text-center">
        <div className="bg-white rounded-3xl border border-[#E2E8DF] p-8 sm:p-10 shadow-lg space-y-6">
          <div className="w-16 h-16 bg-[#163D2B] text-white rounded-2xl flex items-center justify-center mx-auto text-3xl shadow-sm">
            <Lock className="w-8 h-8 text-[#34D399]" />
          </div>

          <div className="max-w-md mx-auto space-y-2">
            <span className="px-3 py-1 rounded-full bg-amber-100 text-amber-900 border border-amber-200 text-xs font-bold uppercase tracking-wider">
              Protected Administrator Area
            </span>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900">
              Admin Password Required
            </h1>
            <p className="text-sm text-slate-600">
              You are currently signed in as <strong>{currentUser?.name || 'Farmer'}</strong>. Surveillance controls, user directories, and moderation tools are restricted to verified administrators.
            </p>
          </div>

          {/* Admin Password Gate Form */}
          <form onSubmit={handleAdminLoginSubmit} className="max-w-md mx-auto text-left space-y-4 pt-2">
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                Administrator Password
              </label>
              <div className="relative">
                <input
                  type={showAdminPassword ? 'text' : 'password'}
                  value={adminPasswordInput}
                  onChange={(e) => {
                    setAdminPasswordInput(e.target.value);
                    setAdminPasswordError('');
                  }}
                  placeholder="Enter administrator password"
                  autoFocus
                  required
                  className="w-full pl-4 pr-11 py-3 bg-[#F8FAF7] border border-[#E2E8DF] rounded-xl text-sm text-slate-900 focus:outline-none focus:border-[#163D2B] focus:ring-1 focus:ring-[#163D2B]"
                />
                <button
                  type="button"
                  onClick={() => setShowAdminPassword(!showAdminPassword)}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600 cursor-pointer"
                >
                  {showAdminPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {adminPasswordError && (
              <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-800 flex items-start gap-2 animate-shake">
                <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                <span>{adminPasswordError}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={!adminPasswordInput}
              className="w-full py-3 bg-[#163D2B] hover:bg-[#1E4E37] disabled:bg-slate-300 disabled:cursor-not-allowed text-white font-bold text-sm rounded-xl shadow-md flex items-center justify-center gap-2 cursor-pointer transition-all"
            >
              <Shield className="w-4 h-4 text-[#34D399]" />
              <span>Verify & Access Admin Portal</span>
            </button>
          </form>

          <div className="text-xs text-slate-500 pt-3 border-t border-[#E2E8DF] max-w-md mx-auto flex items-center justify-between">
            <span>Predefined Admin Account: <strong className="text-slate-800 font-mono">admin</strong></span>
            <button
              type="button"
              onClick={() => openAuthModal('admin')}
              className="text-[#163D2B] hover:underline font-bold"
            >
              Credentials Assistance
            </button>
          </div>
        </div>
      </div>
    );
  }

  // --- Scan Moderation Handlers ---
  const handleVerifyScan = (scanId: string) => {
    const updated = scans.map((s) => {
      if (s.id === scanId) {
        return {
          ...s,
          verifiedByAdmin: true,
          adminNotes: adminNoteInput || 'Verified by Chief Agronomist admin. Diagnosis confirmed.',
          status: 'Monitoring' as const
        };
      }
      return s;
    });
    setScans(updated);
    try {
      localStorage.setItem('agroguard_scan_history', JSON.stringify(updated));
    } catch {}
    addAuditLog('Scan Verified', `Admin verified scan #${scanId} for crop ${selectedScanForReview?.crop}`, 'success');
    showToast('Scan Verified', 'The diagnosis has been officially validated.', 'success');
    setSelectedScanForReview(null);
    setAdminNoteInput('');
  };

  // --- Alert Broadcast Handler ---
  const handleBroadcastAlert = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAlertForm.title || !newAlertForm.description) {
      showToast('Error', 'Please fill in title and description.', 'error');
      return;
    }

    const newAlert: RiskAlert = {
      id: `alert-${Date.now()}`,
      title: newAlertForm.title,
      category: newAlertForm.category,
      severity: newAlertForm.severity,
      affectedCrops: newAlertForm.affectedCrops,
      description: newAlertForm.description,
      weatherFactor: newAlertForm.weatherFactor,
      recommendedAction: newAlertForm.recommendedAction,
      validUntil: 'Next 5 Days'
    };

    const updatedAlerts = [newAlert, ...alerts];
    setAlerts(updatedAlerts);
    addAuditLog('Alert Broadcasted', `Dispatched "${newAlert.title}" (${newAlert.severity} Severity)`, 'warning');
    showToast('Alert Broadcasted', 'Farmers will immediately see this advisory alert.', 'success');
    setIsNewAlertModalOpen(false);
    setNewAlertForm({
      title: '',
      category: 'Disease Risk',
      severity: 'High',
      affectedCrops: ['Tomato'],
      description: '',
      weatherFactor: 'High Humidity',
      recommendedAction: ''
    });
  };

  const handleDeleteAlert = (alertId: string) => {
    const updated = alerts.filter((a) => a.id !== alertId);
    setAlerts(updated);
    addAuditLog('Alert Revoked', `Revoked alert ID ${alertId}`, 'info');
    showToast('Alert Removed', 'The alert was revoked from the farmer feed.', 'info');
  };

  // --- Consultation Reply Handler ---
  const handleReplyConsultation = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedConsultation || !consultationReplyInput.trim()) return;

    const updated = consultations.map((c) => {
      if (c.id === selectedConsultation.id) {
        return {
          ...c,
          status: 'Resolved' as const,
          assignedOfficer: 'admin',
          officialReply: consultationReplyInput,
          resolvedAt: 'Just now'
        };
      }
      return c;
    });

    setConsultations(updated);
    try {
      localStorage.setItem('agroguard_expert_requests', JSON.stringify(updated));
    } catch {}

    addAuditLog(
      'Expert Inquiry Resolved',
      `Sent advisory reply to farmer ${selectedConsultation.farmerName} on ${selectedConsultation.crop}`,
      'success'
    );
    showToast('Reply Dispatched', 'Agronomic advisory sent directly to farmer.', 'success');
    setSelectedConsultation(null);
    setConsultationReplyInput('');
  };

  // --- User Provisioning Handler ---
  const handleCreateUserSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newUserForm.username || !newUserForm.password || !newUserForm.name) {
      showToast('Error', 'Username, password, and name are required.', 'error');
      return;
    }

    addUser({
      username: newUserForm.username.trim(),
      email: newUserForm.email.trim() || `${newUserForm.username.trim()}@agroguard.org`,
      password: newUserForm.password.trim(),
      name: newUserForm.name.trim(),
      role: newUserForm.role,
      farmName: newUserForm.farmName || 'Kisan Agricultural Field',
      location: newUserForm.location || 'Agri Belt',
      district: newUserForm.district || 'Karnal',
      state: newUserForm.state || 'Haryana',
      totalAcres: Number(newUserForm.totalAcres) || 10,
      phone: newUserForm.phone || '+91 99000 11222'
    });

    showToast('User Created', `Account for ${newUserForm.name} created successfully.`, 'success');
    setIsNewUserModalOpen(false);
    setNewUserForm({
      username: '',
      email: '',
      password: '',
      name: '',
      role: 'user',
      farmName: '',
      location: '',
      district: '',
      state: '',
      totalAcres: 10,
      phone: ''
    });
  };

  const handlePasswordResetSubmit = (userId: string) => {
    if (!newPasswordInput || newPasswordInput.length < 6) {
      showToast('Error', 'Password must be at least 6 characters.', 'error');
      return;
    }
    const success = resetUserPassword(userId, newPasswordInput);
    if (success) {
      showToast('Password Updated', 'Predefined credentials updated.', 'success');
      setPasswordResetUserId(null);
      setNewPasswordInput('');
    }
  };

  // --- Export Telemetry ---
  const handleExportTelemetry = () => {
    const reportData = {
      generatedAt: new Date().toISOString(),
      generatedBy: currentUser?.name,
      role: currentUser?.role,
      summary: {
        totalUsers: users.length,
        totalScans: scans.length,
        activeAlerts: alerts.length,
        totalInquiries: consultations.length
      },
      users: users.map((u) => ({
        id: u.id,
        name: u.name,
        username: u.username,
        email: u.email,
        role: u.role,
        farmName: u.farmName,
        status: u.status,
        lastLogin: u.lastLogin
      })),
      recentScans: scans.slice(0, 10),
      alerts,
      auditLogs: auditLogs.slice(0, 15)
    };

    const blob = new Blob([JSON.stringify(reportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `agroguard-surveillance-report-${Date.now()}.json`;
    link.click();
    showToast('Report Exported', 'Surveillance telemetry downloaded successfully.', 'success');
  };

  // Chart Data Calculations
  const cropScanCounts: Record<string, number> = {};
  scans.forEach((s) => {
    cropScanCounts[s.crop] = (cropScanCounts[s.crop] || 0) + 1;
  });
  const chartData = Object.entries(cropScanCounts).map(([crop, count]) => ({
    crop,
    scans: count
  }));

  const severityCounts: Record<string, number> = {
    Low: 0,
    Moderate: 0,
    High: 0,
    Severe: 0
  };
  scans.forEach((s) => {
    if (severityCounts[s.severity] !== undefined) {
      severityCounts[s.severity]++;
    }
  });
  const pieData = Object.entries(severityCounts).map(([name, value]) => ({
    name,
    value
  }));
  const SEVERITY_COLORS: Record<string, string> = {
    Low: '#10B981',
    Moderate: '#F59E0B',
    High: '#F97316',
    Severe: '#EF4444'
  };

  return (
    <div id="admin-portal-dashboard" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Top Banner & Context Header */}
      <div className="bg-[#163D2B] text-white rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden border border-[#0F2A1E]">
        <div className="absolute right-0 top-0 translate-x-10 -translate-y-10 w-96 h-96 bg-[#34D399]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#34D399]/20 border border-[#34D399]/30 text-[#34D399] text-xs font-bold mb-2">
              <Shield className="w-3.5 h-3.5" />
              <span>National Crop Surveillance & System Administration</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white flex items-center gap-3">
              <span>CropVision Admin Portal</span>
              <span className="text-xs font-bold uppercase px-2.5 py-1 bg-[#34D399] text-[#163D2B] rounded-lg">
                Super Admin
              </span>
            </h1>
            <p className="text-sm text-[#EAF0EB]/80 mt-1 max-w-2xl">
              Logged in as <strong>{currentUser?.name}</strong> • {currentUser?.designation || 'Lead Agronomist'}. Manage registered farmer accounts, review AI scan diagnoses, dispatch regional pest alerts, and oversee platform health.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => setIsNewAlertModalOpen(true)}
              className="px-4 py-2.5 bg-[#34D399] hover:bg-[#10B981] text-[#163D2B] text-xs sm:text-sm font-bold rounded-xl shadow-xs flex items-center gap-2 transition-all cursor-pointer"
            >
              <Radio className="w-4 h-4" />
              <span>Broadcast Alert</span>
            </button>

            <button
              onClick={() => setIsNewUserModalOpen(true)}
              className="px-4 py-2.5 bg-white/10 hover:bg-white/20 text-white text-xs sm:text-sm font-bold rounded-xl border border-white/20 flex items-center gap-2 transition-all cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Add Farmer</span>
            </button>

            <button
              onClick={handleExportTelemetry}
              className="px-4 py-2.5 bg-white/10 hover:bg-white/20 text-white text-xs sm:text-sm font-bold rounded-xl border border-white/20 flex items-center gap-2 transition-all cursor-pointer"
              title="Download Surveillance Report"
            >
              <Download className="w-4 h-4" />
              <span>Export Report</span>
            </button>
          </div>
        </div>

        {/* Quick Credentials Info Bar */}
        <div className="mt-6 pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-4 text-xs text-[#EAF0EB]/90">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#34D399] animate-pulse" />
            <span>Predefined Accounts: <strong>2 Active Farmers</strong> (user1, user2) + <strong>1 Admin</strong> (admin)</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-white/70">AI Diagnostic Confidence Floor: <strong>{systemConfig.aiConfidenceThreshold}%</strong></span>
            <span className="text-white/40">|</span>
            <span className="text-white/70">Image Validation: <strong className="text-[#34D399]">Enforced</strong></span>
          </div>
        </div>
      </div>

      {/* Navigation Sub-Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-[#E2E8DF]">
        {[
          { id: 'overview', label: 'Overview & Metrics', icon: Activity },
          { id: 'users', label: `User Management (${users.length})`, icon: Users },
          { id: 'scans', label: `Scan Moderation (${scans.length})`, icon: FileCheck },
          { id: 'alerts', label: `Regional Alerts (${alerts.length})`, icon: AlertTriangle },
          { id: 'expert-desk', label: `Expert Consultations (${consultations.length})`, icon: Headphones },
          { id: 'settings', label: 'System & Audit Logs', icon: Sliders }
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as AdminTab)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap cursor-pointer ${
                isActive
                  ? 'bg-[#163D2B] text-white shadow-xs'
                  : 'bg-white text-slate-600 hover:text-slate-900 hover:bg-[#EAF0EB] border border-[#E2E8DF]'
              }`}
            >
              <Icon className={`w-4 h-4 ${isActive ? 'text-[#34D399]' : 'text-slate-400'}`} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* TAB 1: OVERVIEW & METRICS */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          {/* Key Stat Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white rounded-2xl p-5 border border-[#E2E8DF] shadow-xs">
              <div className="flex items-center justify-between text-slate-500 mb-2">
                <span className="text-xs font-bold uppercase tracking-wider">Registered Farmers</span>
                <Users className="w-4 h-4 text-[#163D2B]" />
              </div>
              <div className="text-3xl font-extrabold text-slate-900">
                {users.filter((u) => u.role === 'user').length}
              </div>
              <div className="text-xs text-slate-500 mt-1 flex items-center gap-1.5">
                <span className="text-emerald-600 font-bold">2 Predefined Users</span>
                <span>(user1 & user2)</span>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-5 border border-[#E2E8DF] shadow-xs">
              <div className="flex items-center justify-between text-slate-500 mb-2">
                <span className="text-xs font-bold uppercase tracking-wider">Total Scans Monitored</span>
                <FileCheck className="w-4 h-4 text-[#163D2B]" />
              </div>
              <div className="text-3xl font-extrabold text-slate-900">
                {scans.length}
              </div>
              <div className="text-xs text-emerald-600 font-bold mt-1">
                {scans.filter((s) => s.verifiedByAdmin).length} Verified by Agronomist
              </div>
            </div>

            <div className="bg-white rounded-2xl p-5 border border-[#E2E8DF] shadow-xs">
              <div className="flex items-center justify-between text-slate-500 mb-2">
                <span className="text-xs font-bold uppercase tracking-wider">Active Regional Alerts</span>
                <AlertTriangle className="w-4 h-4 text-amber-500" />
              </div>
              <div className="text-3xl font-extrabold text-slate-900">
                {alerts.length}
              </div>
              <div className="text-xs text-amber-600 font-semibold mt-1">
                Broadcasted to farmer feeds
              </div>
            </div>

            <div className="bg-white rounded-2xl p-5 border border-[#E2E8DF] shadow-xs">
              <div className="flex items-center justify-between text-slate-500 mb-2">
                <span className="text-xs font-bold uppercase tracking-wider">Expert Queries</span>
                <Headphones className="w-4 h-4 text-[#163D2B]" />
              </div>
              <div className="text-3xl font-extrabold text-slate-900">
                {consultations.length}
              </div>
              <div className="text-xs text-slate-500 mt-1">
                {consultations.filter((c) => c.status === 'Resolved').length} resolved with advisory
              </div>
            </div>
          </div>

          {/* Charts & Situational Overview Row */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Outbreak Severity Breakdown */}
            <div className="bg-white rounded-3xl p-6 border border-[#E2E8DF] shadow-xs space-y-4">
              <div>
                <h3 className="text-base font-bold text-slate-900">Diagnostic Severity Breakdown</h3>
                <p className="text-xs text-slate-500">Outbreak threat distribution in incoming diagnostic scans.</p>
              </div>
              <div className="h-48 w-full flex items-center justify-center">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={pieData}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      outerRadius={65}
                      innerRadius={38}
                    >
                      {pieData.map((entry) => (
                        <Cell key={`cell-${entry.name}`} fill={SEVERITY_COLORS[entry.name] || '#64748B'} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="grid grid-cols-2 gap-2 text-xs pt-2 border-t border-[#E2E8DF]">
                {pieData.map((d) => (
                  <div key={d.name} className="flex items-center gap-1.5">
                    <span
                      className="w-2.5 h-2.5 rounded-full"
                      style={{ backgroundColor: SEVERITY_COLORS[d.name] }}
                    />
                    <span className="text-slate-600">{d.name}:</span>
                    <strong className="text-slate-900">{d.value}</strong>
                  </div>
                ))}
              </div>
            </div>

            {/* Active Regional Advisory Feed */}
            <div className="lg:col-span-2 bg-white rounded-3xl p-6 border border-[#E2E8DF] shadow-xs space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4 text-amber-600" />
                    <span>Active Regional Risk & Advisory Feed</span>
                  </h3>
                  <p className="text-xs text-slate-500">Real-time biological pathogen and weather alerts broadcast to farmers.</p>
                </div>
                <button
                  type="button"
                  onClick={() => setIsNewAlertModalOpen(true)}
                  className="px-3 py-1.5 bg-[#163D2B] hover:bg-[#1E4E37] text-white text-xs font-bold rounded-xl flex items-center gap-1 shadow-xs cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Broadcast Alert</span>
                </button>
              </div>

              <div className="space-y-2.5">
                {alerts.slice(0, 3).map((alert) => (
                  <div
                    key={alert.id}
                    className="p-3.5 rounded-2xl bg-[#F8FAF7] border border-[#E2E8DF] flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span
                          className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase ${
                            alert.severity === 'Severe'
                              ? 'bg-rose-100 text-rose-800'
                              : alert.severity === 'High'
                              ? 'bg-amber-100 text-amber-800'
                              : 'bg-emerald-100 text-emerald-800'
                          }`}
                        >
                          {alert.severity} Risk
                        </span>
                        <span className="font-bold text-xs text-slate-900">{alert.title}</span>
                      </div>
                      <p className="text-xs text-slate-600 line-clamp-1">{alert.description}</p>
                      <div className="flex items-center gap-2 text-[11px] text-slate-500">
                        <span>Crops: <strong>{alert.affectedCrops.join(', ')}</strong></span>
                        <span>•</span>
                        <span>{alert.date}</span>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => setActiveTab('alerts')}
                      className="text-xs font-bold text-[#163D2B] hover:underline flex items-center gap-1 shrink-0 cursor-pointer"
                    >
                      <span>Manage</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Quick Predefined Accounts Panel for instant verification */}
          <div className="bg-white rounded-3xl p-6 border border-[#E2E8DF] shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                  <KeyRound className="w-4 h-4 text-[#163D2B]" />
                  <span>Configured Accounts & Direct Session Switcher</span>
                </h3>
                <p className="text-xs text-slate-500">
                  As Administrator, you can switch to any user without a password, and view or edit their passwords.
                </p>
              </div>
              <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-lg">
                Admin Privilege Active: 1-Click Switch
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {users.map((u) => {
                const isCurrent = currentUser?.id === u.id;
                const isPassVisible = showPasswordsMap[u.id] !== false;
                return (
                  <div
                    key={u.id}
                    className={`p-4 rounded-2xl border transition-all ${
                      isCurrent
                        ? 'border-[#163D2B] bg-[#F8FAF7] ring-1 ring-[#163D2B]'
                        : 'border-[#E2E8DF] bg-white hover:border-[#163D2B]/30'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-2.5">
                        <span className="text-2xl">{u.avatar || (u.role === 'admin' ? '🛡️' : '👨‍🌾')}</span>
                        <div>
                          <div className="font-extrabold text-sm text-slate-900 flex items-center gap-1.5">
                            <span>{u.name}</span>
                            {isCurrent && (
                              <span className="text-[10px] bg-[#163D2B] text-white px-1.5 py-0.2 rounded font-bold">
                                Active
                              </span>
                            )}
                          </div>
                          <div className="text-xs text-slate-500 font-mono">
                            Username: <strong>{u.username}</strong>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="mt-3 text-xs bg-[#F8FAF7] p-2.5 rounded-xl border border-[#E2E8DF] space-y-1.5 font-mono text-slate-700">
                      <div className="flex justify-between items-center">
                        <span>Role:</span>
                        <strong className="uppercase text-slate-900">{u.role}</strong>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>Username:</span>
                        <strong className="text-slate-800">{u.username}</strong>
                      </div>
                      <div className="flex justify-between items-center pt-1.5 border-t border-[#E2E8DF]">
                        <span>Password:</span>
                        <div className="flex items-center gap-1">
                          <strong className="text-[#163D2B] font-mono">
                            {isPassVisible ? u.password : '••••••••'}
                          </strong>
                          <button
                            type="button"
                            onClick={() =>
                              setShowPasswordsMap((prev) => ({
                                ...prev,
                                [u.id]: prev[u.id] === false ? true : false
                              }))
                            }
                            className="text-slate-400 hover:text-slate-600 p-0.5 cursor-pointer"
                            title={isPassVisible ? 'Hide Password' : 'Show Password'}
                          >
                            {isPassVisible ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              setPasswordResetUserId(u.id);
                              setNewPasswordInput('');
                            }}
                            className="text-emerald-700 hover:text-emerald-900 font-sans text-[11px] font-bold underline cursor-pointer ml-1"
                          >
                            Edit
                          </button>
                        </div>
                      </div>
                      {u.farmName && (
                        <div className="text-[11px] text-slate-500 pt-0.5">Farm: {u.farmName}</div>
                      )}
                    </div>

                    <div className="mt-3 pt-2.5 flex items-center justify-between border-t border-[#E2E8DF] gap-2">
                      <button
                        type="button"
                        onClick={() => setSelectedUserForDataView(u)}
                        className="px-2.5 py-1 text-xs font-bold text-[#163D2B] bg-[#EAF0EB] hover:bg-[#D5E2D7] rounded-lg border border-[#163D2B]/15 transition-colors flex items-center gap-1 cursor-pointer"
                        title={`View data for ${u.name}`}
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>View Data</span>
                      </button>

                      {!isCurrent ? (
                        <button
                          type="button"
                          onClick={() => {
                            switchUser(u.id);
                            showToast('Admin Session Switch', `Switched session to ${u.name} without password.`, 'success');
                          }}
                          className="px-3 py-1.5 bg-[#163D2B] hover:bg-[#1E4E37] text-white text-xs font-bold rounded-lg transition-colors cursor-pointer flex items-center gap-1 shadow-xs"
                        >
                          <span>Switch</span>
                          <ArrowRight className="w-3 h-3" />
                        </button>
                      ) : (
                        <span className="text-xs font-bold text-[#163D2B] px-2 py-0.5 bg-[#EAF0EB] rounded-md">
                          Current
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: USER & FARM DIRECTORY */}
      {activeTab === 'users' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-extrabold text-slate-900">User Management Directory</h2>
              <p className="text-xs sm:text-sm text-slate-600">
                Inspect and manage the predefined farmer users and system administrators.
              </p>
            </div>

            <button
              onClick={() => setIsNewUserModalOpen(true)}
              className="px-4 py-2 bg-[#163D2B] hover:bg-[#1E4E37] text-white text-xs sm:text-sm font-bold rounded-xl flex items-center gap-1.5 shadow-xs cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Create New Farmer Account</span>
            </button>
          </div>

          <div className="bg-white rounded-3xl border border-[#E2E8DF] overflow-hidden shadow-xs">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead className="bg-[#F8FAF7] border-b border-[#E2E8DF] text-slate-700 font-bold">
                  <tr>
                    <th className="p-4">User / Farmer Name</th>
                    <th className="p-4">Username & Email</th>
                    <th className="p-4">Predefined Password</th>
                    <th className="p-4">Farm & Location</th>
                    <th className="p-4">Role</th>
                    <th className="p-4">Status</th>
                    <th className="p-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E2E8DF]">
                  {users.map((user) => {
                    const isPasswordVisible = showPasswordsMap[user.id] !== false;
                    return (
                      <tr key={user.id} className="hover:bg-[#F8FAF7]/60 transition-colors">
                        <td className="p-4 font-semibold text-slate-900">
                          <div className="flex items-center gap-2.5">
                            <span className="text-xl">{user.avatar || (user.role === 'admin' ? '🛡️' : '👨‍🌾')}</span>
                            <div>
                              <div className="font-bold text-slate-900">{user.name}</div>
                              <div className="text-[11px] text-slate-500">{user.phone || 'No phone'}</div>
                            </div>
                          </div>
                        </td>

                        <td className="p-4 text-slate-600 font-mono text-xs">
                          <div className="font-bold text-slate-900">{user.username}</div>
                          <div className="text-[11px] text-slate-500">{user.email}</div>
                        </td>

                        <td className="p-4 text-xs">
                          <div className="flex items-center gap-2">
                            <span className="font-mono bg-[#F3F5F2] px-2.5 py-1 rounded-lg border border-[#E2E8DF] font-bold text-slate-800 text-xs">
                              {isPasswordVisible ? user.password : '••••••••'}
                            </span>
                            <button
                              type="button"
                              onClick={() =>
                                setShowPasswordsMap((prev) => ({
                                  ...prev,
                                  [user.id]: prev[user.id] === false ? true : false
                                }))
                              }
                              className="text-slate-400 hover:text-slate-600 p-1 cursor-pointer"
                              title={isPasswordVisible ? 'Hide Password' : 'Show Password'}
                            >
                              {isPasswordVisible ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                            </button>
                            <button
                              type="button"
                              onClick={() => {
                                setPasswordResetUserId(user.id);
                                setNewPasswordInput('');
                              }}
                              className="px-2 py-1 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 rounded-lg text-xs font-bold flex items-center gap-1 cursor-pointer transition-colors"
                              title="Edit User Password"
                            >
                              <Edit2 className="w-3 h-3" />
                              <span>Edit</span>
                            </button>
                          </div>
                        </td>

                        <td className="p-4 text-xs text-slate-600">
                          {user.farmName ? (
                            <div>
                              <div className="font-semibold text-slate-800">{user.farmName}</div>
                              <div className="text-slate-500">{user.location} • {user.totalAcres} Acres</div>
                            </div>
                          ) : (
                            <span className="text-slate-400">Headquarters / Ministry</span>
                          )}
                        </td>

                        <td className="p-4">
                          <span
                            className={`px-2.5 py-1 rounded-full text-[11px] font-bold uppercase ${
                              user.role === 'admin'
                                ? 'bg-[#163D2B] text-white'
                                : 'bg-emerald-100 text-emerald-800'
                            }`}
                          >
                            {user.role}
                          </span>
                        </td>

                        <td className="p-4">
                          <button
                            onClick={() => toggleUserStatus(user.id)}
                            className={`px-2.5 py-1 rounded-lg text-xs font-bold flex items-center gap-1 cursor-pointer ${
                              user.status === 'active'
                                ? 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200'
                                : 'bg-rose-50 text-rose-700 hover:bg-rose-100 border border-rose-200'
                            }`}
                          >
                            {user.status === 'active' ? <CheckCircle2 className="w-3.5 h-3.5" /> : <XCircle className="w-3.5 h-3.5" />}
                            <span className="capitalize">{user.status}</span>
                          </button>
                        </td>

                        <td className="p-4 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <button
                              type="button"
                              onClick={() => setSelectedUserForDataView(user)}
                              className="px-2.5 py-1.5 bg-[#EAF0EB] hover:bg-[#D5E2D7] text-[#163D2B] text-xs font-bold rounded-lg transition-colors cursor-pointer flex items-center gap-1 border border-[#163D2B]/15"
                              title={`Inspect all data and password for ${user.name}`}
                            >
                              <Eye className="w-3.5 h-3.5" />
                              <span>View Data</span>
                            </button>
                            {user.id === currentUser?.id ? (
                              <span className="px-3 py-1.5 bg-[#EAF0EB] text-[#163D2B] text-xs font-bold rounded-lg inline-block">
                                Active
                              </span>
                            ) : (
                              <button
                                type="button"
                                onClick={() => {
                                  switchUser(user.id);
                                  showToast('Admin Session Switch', `Switched session to ${user.name} without password.`, 'success');
                                }}
                                className="px-3 py-1.5 bg-[#163D2B] hover:bg-[#1E4E37] text-white text-xs font-bold rounded-lg shadow-xs transition-colors cursor-pointer flex items-center gap-1"
                              >
                                <span>Switch</span>
                                <ArrowRight className="w-3 h-3" />
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: SCAN MODERATION & AI QA */}
      {activeTab === 'scans' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-extrabold text-slate-900">Crop Scan Moderation Desk</h2>
              <p className="text-xs sm:text-sm text-slate-600">
                Review farmer scan submissions, validate AI diagnoses, or override with expert agronomist recommendations.
              </p>
            </div>
          </div>

          <div className="bg-white rounded-3xl border border-[#E2E8DF] overflow-hidden shadow-xs">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead className="bg-[#F8FAF7] border-b border-[#E2E8DF] text-slate-700 font-bold">
                  <tr>
                    <th className="p-4">Crop & Image</th>
                    <th className="p-4">AI Diagnosis</th>
                    <th className="p-4">Confidence & Severity</th>
                    <th className="p-4">Scan Date</th>
                    <th className="p-4">Agronomist Verification</th>
                    <th className="p-4 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E2E8DF]">
                  {scans.map((scan) => (
                    <tr key={scan.id} className="hover:bg-[#F8FAF7]/60 transition-colors">
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <img
                            src={scan.imageUrl}
                            alt={scan.crop}
                            referrerPolicy="no-referrer"
                            className="w-12 h-12 rounded-xl object-cover border border-[#E2E8DF]"
                          />
                          <div>
                            <span className="font-bold text-slate-900 block">{scan.crop}</span>
                            <span className="text-[11px] text-slate-500 uppercase font-semibold">
                              {scan.type}
                            </span>
                          </div>
                        </div>
                      </td>

                      <td className="p-4">
                        <div className="font-bold text-slate-900">{scan.detectionName}</div>
                        <div className="text-[11px] text-slate-500 truncate max-w-xs">
                          {scan.recommendationSummary}
                        </div>
                      </td>

                      <td className="p-4 text-xs">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-slate-900">{scan.confidence}%</span>
                          <span
                            className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                              scan.severity === 'Severe'
                                ? 'bg-rose-100 text-rose-800'
                                : scan.severity === 'High'
                                ? 'bg-amber-100 text-amber-800'
                                : 'bg-emerald-100 text-emerald-800'
                            }`}
                          >
                            {scan.severity}
                          </span>
                        </div>
                      </td>

                      <td className="p-4 text-xs text-slate-500">{scan.date}</td>

                      <td className="p-4 text-xs">
                        {scan.verifiedByAdmin ? (
                          <div className="flex items-center gap-1.5 text-emerald-700 font-bold">
                            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                            <span>Verified by Agronomist</span>
                          </div>
                        ) : (
                          <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-600 text-[11px] font-medium">
                            Pending Admin Review
                          </span>
                        )}
                        {scan.adminNotes && (
                          <p className="text-[11px] text-slate-600 mt-1 italic max-w-xs truncate">
                            "{scan.adminNotes}"
                          </p>
                        )}
                      </td>

                      <td className="p-4 text-right">
                        <button
                          onClick={() => {
                            setSelectedScanForReview(scan);
                            setAdminNoteInput(scan.adminNotes || '');
                          }}
                          className="px-3 py-1.5 bg-[#163D2B] hover:bg-[#1E4E37] text-white text-xs font-bold rounded-lg cursor-pointer transition-colors"
                        >
                          Review & Verify
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: REGIONAL ALERT DISPATCHER */}
      {activeTab === 'alerts' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-extrabold text-slate-900">Regional Disease & Pest Alert Dispatcher</h2>
              <p className="text-xs sm:text-sm text-slate-600">
                Broadcast high-priority quarantine and outbreak advisories directly to all farmer devices.
              </p>
            </div>

            <button
              onClick={() => setIsNewAlertModalOpen(true)}
              className="px-4 py-2.5 bg-[#163D2B] hover:bg-[#1E4E37] text-white text-xs sm:text-sm font-bold rounded-xl shadow-xs flex items-center gap-2 cursor-pointer transition-colors"
            >
              <Radio className="w-4 h-4 text-[#34D399]" />
              <span>Broadcast New Alert</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {alerts.map((alert) => (
              <div
                key={alert.id}
                className="bg-white rounded-2xl p-5 border border-[#E2E8DF] shadow-xs space-y-3 relative group"
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${
                        alert.severity === 'Severe'
                          ? 'bg-rose-100 text-rose-800 border border-rose-200'
                          : alert.severity === 'High'
                          ? 'bg-amber-100 text-amber-800 border border-amber-200'
                          : 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                      }`}
                    >
                      {alert.severity} Risk
                    </span>
                    <span className="text-xs font-semibold text-slate-500">• {alert.category}</span>
                  </div>

                  <button
                    onClick={() => handleDeleteAlert(alert.id)}
                    className="text-slate-400 hover:text-rose-600 p-1 cursor-pointer transition-colors"
                    title="Revoke / Delete Alert"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                <h3 className="font-extrabold text-base text-slate-900">{alert.title}</h3>
                <p className="text-xs text-slate-600 line-clamp-2">{alert.description}</p>

                <div className="bg-[#F8FAF7] p-3 rounded-xl border border-[#E2E8DF] text-xs space-y-1">
                  <div>
                    <strong className="text-slate-800">Target Crops:</strong>{' '}
                    <span className="text-slate-600">{alert.affectedCrops.join(', ')}</span>
                  </div>
                  <div>
                    <strong className="text-slate-800">Recommended Action:</strong>{' '}
                    <span className="text-slate-600">{alert.recommendedAction}</span>
                  </div>
                </div>

                <div className="text-[11px] text-slate-400 flex items-center justify-between pt-1">
                  <span>Validity: {alert.validUntil}</span>
                  <span className="text-emerald-700 font-bold flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    Broadcasting Live
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 5: EXPERT INQUIRIES DESK */}
      {activeTab === 'expert-desk' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-extrabold text-slate-900">Farmer Expert Consultations Desk</h2>
              <p className="text-xs sm:text-sm text-slate-600">
                Respond to field inquiries submitted by farmers and provide direct agronomic guidance.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {consultations.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-3xl p-6 border border-[#E2E8DF] shadow-xs space-y-4"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#E2E8DF] pb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-2xl bg-[#EAF0EB] text-[#163D2B] flex items-center justify-center font-bold">
                      {item.crop.slice(0, 2)}
                    </div>
                    <div>
                      <div className="font-extrabold text-slate-900 text-base flex items-center gap-2">
                        <span>{item.farmerName}</span>
                        <span className="text-xs px-2 py-0.5 rounded bg-slate-100 text-slate-700 font-normal">
                          {item.crop}
                        </span>
                      </div>
                      <div className="text-xs text-slate-500 flex items-center gap-2 mt-0.5">
                        <MapPin className="w-3 h-3" />
                        <span>{item.location}</span>
                        <span>•</span>
                        <Phone className="w-3 h-3" />
                        <span>{item.phone}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-bold ${
                        item.status === 'Resolved'
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-amber-100 text-amber-800'
                      }`}
                    >
                      {item.status}
                    </span>
                    <span className="text-xs text-slate-400">{item.createdAt}</span>
                  </div>
                </div>

                <div className="text-xs sm:text-sm text-slate-700 bg-[#F8FAF7] p-4 rounded-2xl border border-[#E2E8DF]">
                  <strong className="block text-slate-900 font-bold mb-1">Farmer Inquiry:</strong>
                  {item.problemDescription}
                </div>

                {item.officialReply ? (
                  <div className="bg-[#EAF0EB] p-4 rounded-2xl border border-[#163D2B]/15 text-xs sm:text-sm space-y-1">
                    <div className="flex items-center justify-between">
                      <strong className="text-[#163D2B] font-bold flex items-center gap-1.5">
                        <Shield className="w-4 h-4" />
                        <span>Official Agronomist Advisory from {item.assignedOfficer || 'admin'}:</span>
                      </strong>
                      <span className="text-[11px] text-slate-500">{item.resolvedAt}</span>
                    </div>
                    <p className="text-slate-800">{item.officialReply}</p>
                  </div>
                ) : (
                  <div className="flex justify-end">
                    <button
                      onClick={() => {
                        setSelectedConsultation(item);
                        setConsultationReplyInput('');
                      }}
                      className="px-4 py-2 bg-[#163D2B] hover:bg-[#1E4E37] text-white text-xs font-bold rounded-xl flex items-center gap-1.5 cursor-pointer shadow-xs"
                    >
                      <Send className="w-3.5 h-3.5 text-[#34D399]" />
                      <span>Send Official Advisory Response</span>
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 6: SYSTEM CONFIGURATION & AUDIT LOGS */}
      {activeTab === 'settings' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* AI Diagnostics Engine Settings */}
            <div className="bg-white rounded-3xl p-6 border border-[#E2E8DF] shadow-xs space-y-5">
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <Sliders className="w-4 h-4 text-[#163D2B]" />
                <span>AI Inference Engine Parameters</span>
              </h3>

              <div className="space-y-2">
                <div className="flex justify-between text-xs font-bold text-slate-700">
                  <span>Minimum AI Confidence Floor</span>
                  <span className="text-[#163D2B] font-mono">{systemConfig.aiConfidenceThreshold}%</span>
                </div>
                <input
                  type="range"
                  min={50}
                  max={95}
                  step={5}
                  value={systemConfig.aiConfidenceThreshold}
                  onChange={(e) => updateSystemConfig({ aiConfidenceThreshold: Number(e.target.value) })}
                  className="w-full accent-[#163D2B] cursor-pointer"
                />
                <p className="text-[11px] text-slate-500">
                  Scans scoring below this confidence trigger an automatic "Under Agronomist Review" flag.
                </p>
              </div>

              <div className="pt-3 border-t border-[#E2E8DF] space-y-3">
                <label className="flex items-center justify-between text-xs font-bold text-slate-700 cursor-pointer">
                  <span>Strict Plant Image Validation</span>
                  <input
                    type="checkbox"
                    checked={systemConfig.strictPlantValidation}
                    onChange={(e) => updateSystemConfig({ strictPlantValidation: e.target.checked })}
                    className="w-4 h-4 accent-[#163D2B] rounded cursor-pointer"
                  />
                </label>
                <p className="text-[11px] text-slate-500">
                  Rejects non-agricultural images (e.g. human faces, random objects) prior to deep diagnostic analysis.
                </p>
              </div>

              <div className="pt-3 border-t border-[#E2E8DF] flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold text-slate-800 block">Surveillance Report</span>
                  <span className="text-[11px] text-slate-500">Download formatted telemetry and audit trail.</span>
                </div>
                <button
                  onClick={handleExportTelemetry}
                  className="px-3.5 py-2 bg-[#F3F5F2] hover:bg-[#163D2B] hover:text-white text-slate-800 text-xs font-bold rounded-xl flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download JSON</span>
                </button>
              </div>
            </div>

            {/* Audit Logs Table */}
            <div className="bg-white rounded-3xl p-6 border border-[#E2E8DF] shadow-xs space-y-4 flex flex-col">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                  <Activity className="w-4 h-4 text-[#163D2B]" />
                  <span>Administrative Security Audit Log</span>
                </h3>
                <span className="text-xs text-slate-400 font-mono">Immutable</span>
              </div>

              <div className="flex-1 overflow-y-auto max-h-80 space-y-2.5 pr-1">
                {auditLogs.map((log) => (
                  <div
                    key={log.id}
                    className="p-3 rounded-xl bg-[#F8FAF7] border border-[#E2E8DF] text-xs space-y-1"
                  >
                    <div className="flex items-center justify-between text-slate-500">
                      <span className="font-bold text-slate-800">{log.action}</span>
                      <span className="text-[11px] font-mono">{log.timestamp}</span>
                    </div>
                    <p className="text-slate-600">{log.details}</p>
                    <div className="text-[10px] text-slate-400">
                      By: <strong>{log.actorName}</strong> ({log.actorRole.toUpperCase()})
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* --- MODAL: SCAN VERIFICATION REVIEW --- */}
      {selectedScanForReview && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-3xl border border-[#E2E8DF] shadow-2xl max-w-lg w-full p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-[#E2E8DF] pb-3">
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <FileCheck className="w-5 h-5 text-[#163D2B]" />
                <span>Validate Diagnosis #{selectedScanForReview.id.slice(-6)}</span>
              </h3>
              <button
                onClick={() => setSelectedScanForReview(null)}
                className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg"
              >
                ✕
              </button>
            </div>

            <div className="flex items-center gap-4">
              <img
                src={selectedScanForReview.imageUrl}
                alt={selectedScanForReview.crop}
                referrerPolicy="no-referrer"
                className="w-20 h-20 rounded-2xl object-cover border border-[#E2E8DF]"
              />
              <div className="text-xs space-y-1">
                <div>Crop: <strong className="text-slate-900">{selectedScanForReview.crop}</strong></div>
                <div>Detected: <strong className="text-[#163D2B]">{selectedScanForReview.detectionName}</strong></div>
                <div>Confidence: <strong>{selectedScanForReview.confidence}%</strong></div>
                <div>Severity: <strong className="text-amber-600">{selectedScanForReview.severity}</strong></div>
              </div>
            </div>

            <div className="space-y-1 text-xs">
              <label className="block font-bold text-slate-700">Official Agronomist Validation Note</label>
              <textarea
                rows={3}
                value={adminNoteInput}
                onChange={(e) => setAdminNoteInput(e.target.value)}
                placeholder="Add verification notes, dosage adjustments, or confirmation..."
                className="w-full p-3 bg-[#F3F5F2] border border-[#E2E8DF] rounded-xl text-slate-900 focus:outline-none focus:border-[#163D2B]"
              />
            </div>

            <div className="flex items-center justify-end gap-2 pt-2 border-t border-[#E2E8DF]">
              <button
                type="button"
                onClick={() => setSelectedScanForReview(null)}
                className="px-4 py-2 text-slate-600 text-xs font-bold hover:bg-slate-100 rounded-xl"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => handleVerifyScan(selectedScanForReview.id)}
                className="px-4 py-2 bg-[#163D2B] hover:bg-[#1E4E37] text-white text-xs font-bold rounded-xl flex items-center gap-1.5 shadow-xs cursor-pointer"
              >
                <Check className="w-4 h-4 text-[#34D399]" />
                <span>Mark Verified as Agronomist</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* --- MODAL: BROADCAST NEW REGIONAL ALERT --- */}
      {isNewAlertModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-3xl border border-[#E2E8DF] shadow-2xl max-w-lg w-full p-6 space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-[#E2E8DF] pb-3">
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <Radio className="w-5 h-5 text-[#163D2B]" />
                <span>Broadcast Regional Advisory Alert</span>
              </h3>
              <button
                onClick={() => setIsNewAlertModalOpen(false)}
                className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleBroadcastAlert} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Alert Title</label>
                <input
                  type="text"
                  value={newAlertForm.title}
                  onChange={(e) => setNewAlertForm({ ...newAlertForm, title: e.target.value })}
                  placeholder="e.g. Locust Infestation Warning in Western Agri Belt"
                  className="w-full px-3 py-2 bg-[#F3F5F2] border border-[#E2E8DF] rounded-xl text-slate-900"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Category</label>
                  <select
                    value={newAlertForm.category}
                    onChange={(e) => setNewAlertForm({ ...newAlertForm, category: e.target.value as any })}
                    className="w-full px-3 py-2 bg-[#F3F5F2] border border-[#E2E8DF] rounded-xl text-slate-900"
                  >
                    <option value="Disease Risk">Disease Risk</option>
                    <option value="Pest Risk">Pest Risk</option>
                    <option value="Weather">Weather Hazard</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Severity Level</label>
                  <select
                    value={newAlertForm.severity}
                    onChange={(e) => setNewAlertForm({ ...newAlertForm, severity: e.target.value as any })}
                    className="w-full px-3 py-2 bg-[#F3F5F2] border border-[#E2E8DF] rounded-xl text-slate-900"
                  >
                    <option value="Low">Low</option>
                    <option value="Moderate">Moderate</option>
                    <option value="High">High</option>
                    <option value="Severe">Severe</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Description & Field Advisory</label>
                <textarea
                  rows={3}
                  value={newAlertForm.description}
                  onChange={(e) => setNewAlertForm({ ...newAlertForm, description: e.target.value })}
                  placeholder="Detailed warning for farmers in affected districts..."
                  className="w-full p-3 bg-[#F3F5F2] border border-[#E2E8DF] rounded-xl text-slate-900"
                  required
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Recommended Preventative Action</label>
                <input
                  type="text"
                  value={newAlertForm.recommendedAction}
                  onChange={(e) => setNewAlertForm({ ...newAlertForm, recommendedAction: e.target.value })}
                  placeholder="e.g. Inspect whorls immediately, apply neem barrier traps"
                  className="w-full px-3 py-2 bg-[#F3F5F2] border border-[#E2E8DF] rounded-xl text-slate-900"
                  required
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-[#E2E8DF]">
                <button
                  type="button"
                  onClick={() => setIsNewAlertModalOpen(false)}
                  className="px-4 py-2 text-slate-600 text-xs font-bold hover:bg-slate-100 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#163D2B] hover:bg-[#1E4E37] text-white text-xs font-bold rounded-xl flex items-center gap-1.5 shadow-xs cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5 text-[#34D399]" />
                  <span>Broadcast to Farmers</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* --- MODAL: REPLY TO EXPERT CONSULTATION --- */}
      {selectedConsultation && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-3xl border border-[#E2E8DF] shadow-2xl max-w-lg w-full p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-[#E2E8DF] pb-3">
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <Headphones className="w-5 h-5 text-[#163D2B]" />
                <span>Agronomist Advisory Response</span>
              </h3>
              <button
                onClick={() => setSelectedConsultation(null)}
                className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg"
              >
                ✕
              </button>
            </div>

            <div className="bg-[#F8FAF7] p-3 rounded-2xl border border-[#E2E8DF] text-xs space-y-1">
              <div>Farmer: <strong className="text-slate-900">{selectedConsultation.farmerName}</strong> ({selectedConsultation.crop})</div>
              <div>Issue: <span className="text-slate-600">{selectedConsultation.problemDescription}</span></div>
            </div>

            <form onSubmit={handleReplyConsultation} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Official Agronomist Recommendation</label>
                <textarea
                  rows={4}
                  value={consultationReplyInput}
                  onChange={(e) => setConsultationReplyInput(e.target.value)}
                  placeholder="Provide precise treatment dosage, irrigation guidelines, and immediate actions..."
                  className="w-full p-3 bg-[#F3F5F2] border border-[#E2E8DF] rounded-xl text-slate-900 focus:outline-none focus:border-[#163D2B]"
                  required
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-[#E2E8DF]">
                <button
                  type="button"
                  onClick={() => setSelectedConsultation(null)}
                  className="px-4 py-2 text-slate-600 text-xs font-bold hover:bg-slate-100 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#163D2B] hover:bg-[#1E4E37] text-white text-xs font-bold rounded-xl flex items-center gap-1.5 shadow-xs cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5 text-[#34D399]" />
                  <span>Send Advisory & Resolve</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* --- MODAL: CREATE NEW USER --- */}
      {isNewUserModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-3xl border border-[#E2E8DF] shadow-2xl max-w-lg w-full p-6 space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-[#E2E8DF] pb-3">
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <Users className="w-5 h-5 text-[#163D2B]" />
                <span>Provision New Farmer Account</span>
              </h3>
              <button
                onClick={() => setIsNewUserModalOpen(false)}
                className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateUserSubmit} className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Username</label>
                  <input
                    type="text"
                    value={newUserForm.username}
                    onChange={(e) => setNewUserForm({ ...newUserForm, username: e.target.value })}
                    placeholder="e.g. farmer3"
                    className="w-full px-3 py-2 bg-[#F3F5F2] border border-[#E2E8DF] rounded-xl text-slate-900"
                    required
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Predefined Password</label>
                  <input
                    type="text"
                    value={newUserForm.password}
                    onChange={(e) => setNewUserForm({ ...newUserForm, password: e.target.value })}
                    placeholder="e.g. Farmer@789"
                    className="w-full px-3 py-2 bg-[#F3F5F2] border border-[#E2E8DF] rounded-xl text-slate-900"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Farmer Full Name</label>
                <input
                  type="text"
                  value={newUserForm.name}
                  onChange={(e) => setNewUserForm({ ...newUserForm, name: e.target.value })}
                  placeholder="e.g. Harpreet Singh"
                  className="w-full px-3 py-2 bg-[#F3F5F2] border border-[#E2E8DF] rounded-xl text-slate-900"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Farm Name</label>
                  <input
                    type="text"
                    value={newUserForm.farmName}
                    onChange={(e) => setNewUserForm({ ...newUserForm, farmName: e.target.value })}
                    placeholder="e.g. Golden Harvest Fields"
                    className="w-full px-3 py-2 bg-[#F3F5F2] border border-[#E2E8DF] rounded-xl text-slate-900"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Total Acres</label>
                  <input
                    type="number"
                    value={newUserForm.totalAcres}
                    onChange={(e) => setNewUserForm({ ...newUserForm, totalAcres: Number(e.target.value) })}
                    className="w-full px-3 py-2 bg-[#F3F5F2] border border-[#E2E8DF] rounded-xl text-slate-900"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">District / Region</label>
                  <input
                    type="text"
                    value={newUserForm.district}
                    onChange={(e) => setNewUserForm({ ...newUserForm, district: e.target.value })}
                    placeholder="e.g. Ludhiana"
                    className="w-full px-3 py-2 bg-[#F3F5F2] border border-[#E2E8DF] rounded-xl text-slate-900"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Role</label>
                  <select
                    value={newUserForm.role}
                    onChange={(e) => setNewUserForm({ ...newUserForm, role: e.target.value as any })}
                    className="w-full px-3 py-2 bg-[#F3F5F2] border border-[#E2E8DF] rounded-xl text-slate-900"
                  >
                    <option value="user">User / Farmer</option>
                    <option value="admin">System Administrator</option>
                  </select>
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-[#E2E8DF]">
                <button
                  type="button"
                  onClick={() => setIsNewUserModalOpen(false)}
                  className="px-4 py-2 text-slate-600 text-xs font-bold hover:bg-slate-100 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#163D2B] hover:bg-[#1E4E37] text-white text-xs font-bold rounded-xl shadow-xs cursor-pointer"
                >
                  Create Account
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* --- MODAL: ADMIN PASSWORD INSPECTOR & EDITOR --- */}
      {passwordResetUserId && (() => {
        const targetAccount = users.find((u) => u.id === passwordResetUserId);
        return (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
            <div className="bg-white rounded-3xl border border-[#E2E8DF] shadow-2xl max-w-md w-full p-6 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                  <KeyRound className="w-5 h-5 text-[#163D2B]" />
                  <span>Admin Password Manager</span>
                </h3>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 uppercase">
                  Admin Authority
                </span>
              </div>

              <p className="text-xs text-slate-600">
                You can inspect the existing password and save a new password for account <strong>{targetAccount?.name}</strong>.
              </p>

              {/* Current Account Credentials Overview */}
              <div className="bg-[#F8FAF7] p-3.5 rounded-2xl border border-[#E2E8DF] space-y-2 text-xs">
                <div className="flex justify-between items-center">
                  <span className="text-slate-500">Account User:</span>
                  <span className="font-bold text-slate-900 flex items-center gap-1.5">
                    <span>{targetAccount?.avatar || '👤'}</span>
                    <span>{targetAccount?.name}</span>
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-500">Username:</span>
                  <span className="font-mono font-bold text-slate-800">{targetAccount?.username}</span>
                </div>
                <div className="flex justify-between items-center pt-2 border-t border-[#E2E8DF]">
                  <span className="text-slate-500 font-medium">Current Password:</span>
                  <span className="font-mono font-extrabold text-[#163D2B] bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                    {targetAccount?.password}
                  </span>
                </div>
              </div>

              <div className="space-y-1.5 text-xs">
                <label className="block font-bold text-slate-700">Enter New Password</label>
                <input
                  type="text"
                  value={newPasswordInput}
                  onChange={(e) => setNewPasswordInput(e.target.value)}
                  placeholder="Enter updated password (minimum 6 characters)"
                  className="w-full px-3.5 py-2.5 bg-[#F3F5F2] border border-[#E2E8DF] rounded-xl text-slate-900 font-mono text-sm focus:outline-none focus:border-[#163D2B] focus:ring-1 focus:ring-[#163D2B]"
                />
                <p className="text-[11px] text-slate-500">
                  Saving updates this user's password immediately across the entire system.
                </p>
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-[#E2E8DF]">
                <button
                  type="button"
                  onClick={() => {
                    setPasswordResetUserId(null);
                    setNewPasswordInput('');
                  }}
                  className="px-4 py-2 text-slate-600 text-xs font-bold hover:bg-slate-100 rounded-xl cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={() => handlePasswordResetSubmit(passwordResetUserId)}
                  className="px-4 py-2 bg-[#163D2B] hover:bg-[#1E4E37] text-white text-xs font-bold rounded-xl shadow-xs cursor-pointer flex items-center gap-1.5"
                >
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#34D399]" />
                  <span>Save New Password</span>
                </button>
              </div>
            </div>
          </div>
        );
      })()}

      {/* --- MODAL: ADMIN USER DATA & PASSWORD INSPECTOR --- */}
      {selectedUserForDataView && (() => {
        const u = selectedUserForDataView;
        const isCurrent = currentUser?.id === u.id;
        const uScans = scans.filter((s) => s.userId === u.id || s.farmerName === u.name || s.farmerName === u.username);
        const uConsultations = consultations.filter((c) => c.userId === u.id || c.farmerName === u.name || c.farmerName === u.username);

        return (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in overflow-y-auto">
            <div className="bg-white rounded-3xl border border-[#E2E8DF] shadow-2xl max-w-3xl w-full my-8 p-6 sm:p-8 space-y-6 max-h-[90vh] overflow-y-auto">
              {/* Header */}
              <div className="flex items-start justify-between gap-4 pb-4 border-b border-[#E2E8DF]">
                <div className="flex items-center gap-3">
                  <span className="text-3xl p-2 bg-[#F4F7F3] rounded-2xl border border-[#E2E8DF]">
                    {u.avatar || (u.role === 'admin' ? '🛡️' : '👨‍🌾')}
                  </span>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-lg sm:text-xl font-extrabold text-slate-900">
                        {u.name}
                      </h3>
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase ${
                          u.role === 'admin' ? 'bg-[#163D2B] text-white' : 'bg-emerald-100 text-emerald-800'
                        }`}
                      >
                        {u.role}
                      </span>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 border border-slate-200">
                        {u.status.toUpperCase()}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Confidential User Profile & Agricultural Records (Admin-Only Access with Password)
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setSelectedUserForDataView(null)}
                  className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-xl cursor-pointer transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* SECTION 1: PREDEFINED CREDENTIALS & PASSWORD (ADMIN VISIBILITY) */}
              <div className="bg-[#F8FAF7] p-4 sm:p-5 rounded-2xl border border-[#163D2B]/20 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <KeyRound className="w-4 h-4 text-[#163D2B]" />
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-700">
                      User Credentials & Predefined Password
                    </span>
                  </div>
                  <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100/80 px-2 py-0.5 rounded border border-emerald-300">
                    Visible to Admin
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                  <div className="p-3 bg-white rounded-xl border border-[#E2E8DF]">
                    <div className="text-slate-400 text-[11px]">Username</div>
                    <div className="font-mono font-bold text-slate-900 text-sm mt-0.5">{u.username}</div>
                  </div>
                  <div className="p-3 bg-white rounded-xl border border-[#E2E8DF]">
                    <div className="text-slate-400 text-[11px]">Email Address</div>
                    <div className="font-mono text-slate-800 text-xs mt-0.5 truncate">{u.email}</div>
                  </div>
                  <div className="p-3 bg-emerald-50/70 rounded-xl border border-emerald-300 flex flex-col justify-between">
                    <div>
                      <div className="text-emerald-800 font-bold text-[11px]">Account Password</div>
                      <div className="font-mono font-extrabold text-[#163D2B] text-base mt-0.5 tracking-wider">
                        {u.password}
                      </div>
                    </div>
                    <div className="flex items-center gap-2 mt-2 pt-2 border-t border-emerald-200">
                      <button
                        type="button"
                        onClick={() => {
                          navigator.clipboard.writeText(u.password);
                          showToast('Copied', `Password for ${u.name} copied to clipboard.`, 'success');
                        }}
                        className="text-[11px] font-bold text-emerald-800 hover:text-emerald-950 flex items-center gap-1 cursor-pointer"
                      >
                        <Copy className="w-3 h-3" />
                        <span>Copy</span>
                      </button>
                      <span className="text-emerald-300">|</span>
                      <button
                        type="button"
                        onClick={() => {
                          setPasswordResetUserId(u.id);
                          setNewPasswordInput('');
                        }}
                        className="text-[11px] font-bold text-[#163D2B] hover:underline flex items-center gap-1 cursor-pointer"
                      >
                        <Edit2 className="w-3 h-3" />
                        <span>Change</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* SECTION 2: FARM PROFILE & LAND METRICS */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-600 flex items-center gap-1.5">
                  <Sprout className="w-4 h-4 text-[#163D2B]" />
                  <span>Farm Profile & Land Data</span>
                </h4>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-xs">
                  <div className="p-3 bg-[#F8FAF7] rounded-xl border border-[#E2E8DF]">
                    <div className="text-slate-400 text-[10px] uppercase font-bold">Farm Name</div>
                    <div className="font-bold text-slate-900 mt-0.5 truncate">{u.farmName || 'N/A'}</div>
                  </div>
                  <div className="p-3 bg-[#F8FAF7] rounded-xl border border-[#E2E8DF]">
                    <div className="text-slate-400 text-[10px] uppercase font-bold">Location</div>
                    <div className="font-bold text-slate-900 mt-0.5 truncate">{u.location || 'N/A'}</div>
                  </div>
                  <div className="p-3 bg-[#F8FAF7] rounded-xl border border-[#E2E8DF]">
                    <div className="text-slate-400 text-[10px] uppercase font-bold">Total Land</div>
                    <div className="font-bold text-slate-900 mt-0.5">{u.totalAcres ? `${u.totalAcres} Acres` : 'N/A'}</div>
                  </div>
                  <div className="p-3 bg-[#F8FAF7] rounded-xl border border-[#E2E8DF]">
                    <div className="text-slate-400 text-[10px] uppercase font-bold">Contact Phone</div>
                    <div className="font-bold text-slate-900 mt-0.5">{u.phone || 'N/A'}</div>
                  </div>
                </div>
              </div>

              {/* SECTION 3: USER'S SCANS & DIAGNOSTICS */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-600 flex items-center gap-1.5">
                    <FileCheck className="w-4 h-4 text-[#163D2B]" />
                    <span>Logged Scans & Diagnostics ({uScans.length})</span>
                  </h4>
                </div>

                {uScans.length === 0 ? (
                  <div className="p-4 rounded-xl bg-[#F8FAF7] border border-[#E2E8DF] text-center text-xs text-slate-500">
                    No diagnostic scans logged for {u.name} yet.
                  </div>
                ) : (
                  <div className="space-y-2.5 max-h-56 overflow-y-auto pr-1">
                    {uScans.map((scan) => (
                      <div
                        key={scan.id}
                        className="p-3 rounded-xl bg-[#F8FAF7] border border-[#E2E8DF] flex items-center justify-between gap-3 text-xs"
                      >
                        <div className="flex items-center gap-3">
                          <img
                            src={scan.imageUrl}
                            alt={scan.crop}
                            referrerPolicy="no-referrer"
                            className="w-11 h-11 rounded-lg object-cover border border-[#E2E8DF] shrink-0"
                          />
                          <div>
                            <div className="font-bold text-slate-900 flex items-center gap-2">
                              <span>{scan.detectionName}</span>
                              <span className="text-[10px] px-1.5 py-0.2 rounded bg-white text-slate-600 border border-[#E2E8DF] font-bold">
                                {scan.crop}
                              </span>
                            </div>
                            <div className="text-[11px] text-slate-500 mt-0.5">
                              Confidence: <strong>{scan.confidence}%</strong> • Severity:{' '}
                              <strong className="text-amber-600">{scan.severity}</strong> • {scan.date}
                            </div>
                          </div>
                        </div>

                        <div>
                          {scan.verifiedByAdmin ? (
                            <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                              Verified
                            </span>
                          ) : (
                            <span className="text-[10px] font-bold text-slate-600 bg-slate-100 px-2 py-0.5 rounded border border-slate-200">
                              AI Diagnostic
                            </span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* SECTION 4: USER'S EXPERT CONSULTATIONS */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-600 flex items-center gap-1.5">
                  <Headphones className="w-4 h-4 text-[#163D2B]" />
                  <span>Expert Consultation Inquiries ({uConsultations.length})</span>
                </h4>

                {uConsultations.length === 0 ? (
                  <div className="p-4 rounded-xl bg-[#F8FAF7] border border-[#E2E8DF] text-center text-xs text-slate-500">
                    No expert consultation requests submitted by {u.name}.
                  </div>
                ) : (
                  <div className="space-y-2.5 max-h-48 overflow-y-auto pr-1">
                    {uConsultations.map((c) => (
                      <div
                        key={c.id}
                        className="p-3 rounded-xl bg-[#F8FAF7] border border-[#E2E8DF] text-xs space-y-1.5"
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-slate-900">{c.crop} Advisory</span>
                          <span
                            className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                              c.status === 'Resolved'
                                ? 'bg-emerald-100 text-emerald-800'
                                : 'bg-amber-100 text-amber-800'
                            }`}
                          >
                            {c.status}
                          </span>
                        </div>
                        <p className="text-slate-600 text-[11px] line-clamp-2">{c.problemDescription}</p>
                        {c.officialReply && (
                          <div className="p-2 rounded-lg bg-white border border-[#E2E8DF] text-[11px] text-slate-800">
                            <strong className="text-[#163D2B]">Agronomist:</strong> {c.officialReply}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Modal Actions */}
              <div className="flex items-center justify-between pt-4 border-t border-[#E2E8DF]">
                {!isCurrent ? (
                  <button
                    type="button"
                    onClick={() => {
                      switchUser(u.id);
                      showToast('Admin Session Switch', `Switched session to ${u.name} without password.`, 'success');
                      setSelectedUserForDataView(null);
                    }}
                    className="px-4 py-2 bg-[#163D2B] hover:bg-[#1E4E37] text-white text-xs font-bold rounded-xl shadow-xs transition-colors cursor-pointer flex items-center gap-1.5"
                  >
                    <span>Switch to this User (Passwordless)</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                ) : (
                  <span className="text-xs font-bold text-[#163D2B] px-3 py-1.5 bg-[#EAF0EB] rounded-lg">
                    Current Active Session
                  </span>
                )}

                <button
                  type="button"
                  onClick={() => setSelectedUserForDataView(null)}
                  className="px-5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl cursor-pointer transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        );
      })()}
    </div>
  );
};
