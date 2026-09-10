import React, { useState, useEffect } from 'react';
import {
  Shield,
  User,
  KeyRound,
  Eye,
  EyeOff,
  CheckCircle2,
  AlertCircle,
  X,
  Lock,
  ArrowRight,
  Sprout,
  HelpCircle,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useToast } from './Toast';

interface AuthModalProps {
  isOpen?: boolean;
  onClose?: () => void;
  defaultTarget?: string;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen: propIsOpen,
  onClose: propOnClose,
  defaultTarget
}) => {
  const {
    users,
    currentUser,
    login,
    isAuthModalOpen,
    closeAuthModal,
    authModalTarget
  } = useAuth();
  const { showToast } = useToast();

  const isModalOpen = propIsOpen !== undefined ? propIsOpen : isAuthModalOpen;
  const handleClose = propOnClose || closeAuthModal;

  const targetFromContext = defaultTarget || authModalTarget;

  const [selectedAccountId, setSelectedAccountId] = useState<string>('user-1');
  const [usernameInput, setUsernameInput] = useState('user1');
  const [passwordInput, setPasswordInput] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [showCredentialsReference, setShowCredentialsReference] = useState(false);

  // Sync selected account when opened or target changes
  useEffect(() => {
    if (isModalOpen) {
      setPasswordInput('');
      setErrorMessage('');

      if (targetFromContext) {
        if (targetFromContext === 'admin' || targetFromContext === 'admin-1') {
          setSelectedAccountId('admin-1');
          setUsernameInput('admin');
        } else if (targetFromContext === 'user-2' || targetFromContext === 'user2' || targetFromContext === 'farmer2') {
          setSelectedAccountId('user-2');
          setUsernameInput('user2');
        } else {
          setSelectedAccountId('user-1');
          setUsernameInput('user1');
        }
      } else if (currentUser) {
        setSelectedAccountId(currentUser.id);
        setUsernameInput(currentUser.username);
      } else {
        setSelectedAccountId('user-1');
        setUsernameInput('user1');
      }
    }
  }, [isModalOpen, targetFromContext, currentUser]);

  if (!isModalOpen) return null;

  const user1 = users.find((u) => u.id === 'user-1' || u.username === 'user1' || u.username === 'farmer1') || users[0];
  const user2 = users.find((u) => u.id === 'user-2' || u.username === 'user2' || u.username === 'farmer2') || users[1];
  const admin = users.find((u) => u.role === 'admin' || u.id === 'admin-1') || users[2];

  const handleSelectAccount = (id: string, username: string) => {
    setSelectedAccountId(id);
    setUsernameInput(username);
    setPasswordInput('');
    setErrorMessage('');
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!usernameInput.trim()) {
      setErrorMessage('Please provide a valid username or email address.');
      return;
    }

    if (!passwordInput) {
      setErrorMessage('Password is required. Please enter the account password to proceed.');
      return;
    }

    const result = login(usernameInput, passwordInput);

    if (!result.success) {
      setErrorMessage(result.message || 'Incorrect credentials. Authentication failed.');
    } else {
      showToast(
        'Authentication Successful',
        `Signed in as ${result.user?.name} (${result.user?.role === 'admin' ? 'Administrator' : 'Farmer'})`,
        'success'
      );
      setPasswordInput('');
      handleClose();
    }
  };

  const currentSelectedUser = users.find((u) => u.id === selectedAccountId || u.username === usernameInput);

  return (
    <div
      id="auth-password-gate-backdrop"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in"
    >
      <div
        id="auth-password-gate-card"
        className="bg-white rounded-3xl border border-[#E2E8DF] shadow-2xl w-full max-w-xl overflow-hidden flex flex-col max-h-[92vh]"
      >
        {/* Modal Header */}
        <div className="bg-[#163D2B] text-white p-6 relative">
          {currentUser && (
            <button
              onClick={handleClose}
              className="absolute top-5 right-5 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
          )}

          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center text-2xl shadow-inner shrink-0">
              <Lock className="w-5 h-5 text-[#34D399]" />
            </div>
            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#34D399]/20 border border-[#34D399]/30 text-[#34D399] text-xs font-bold mb-1">
                <span>Password-Protected Authentication</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black tracking-tight text-white">
                CropVision Secure Sign-In
              </h2>
              <p className="text-xs text-[#EAF0EB]/80 mt-0.5">
                Password verification is required to switch roles or access isolated portal data.
              </p>
            </div>
          </div>
        </div>

        {/* Modal Content */}
        <div className="p-6 overflow-y-auto flex-1 space-y-5">
          {/* Account Selector Cards */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2.5">
              1. Select Target Account
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              {/* User 1: user1 */}
              {user1 && (
                <button
                  type="button"
                  onClick={() => handleSelectAccount(user1.id, user1.username)}
                  className={`p-3 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                    selectedAccountId === user1.id
                      ? 'border-[#163D2B] bg-[#F4F7F3] ring-2 ring-[#163D2B]/10 shadow-xs'
                      : 'border-[#E2E8DF] bg-white hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-2xl">{user1.avatar || '👨‍🌾'}</span>
                    <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200">
                      User 1
                    </span>
                  </div>
                  <div>
                    <div className="font-bold text-slate-900 text-xs truncate">{user1.name}</div>
                    <div className="text-[11px] text-slate-500 truncate">{user1.username}</div>
                  </div>
                </button>
              )}

              {/* User 2: user2 */}
              {user2 && (
                <button
                  type="button"
                  onClick={() => handleSelectAccount(user2.id, user2.username)}
                  className={`p-3 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                    selectedAccountId === user2.id
                      ? 'border-[#163D2B] bg-[#F4F7F3] ring-2 ring-[#163D2B]/10 shadow-xs'
                      : 'border-[#E2E8DF] bg-white hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-2xl">{user2.avatar || '👩‍🌾'}</span>
                    <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200">
                      User 2
                    </span>
                  </div>
                  <div>
                    <div className="font-bold text-slate-900 text-xs truncate">{user2.name}</div>
                    <div className="text-[11px] text-slate-500 truncate">{user2.username}</div>
                  </div>
                </button>
              )}

              {/* Admin: admin */}
              {admin && (
                <button
                  type="button"
                  onClick={() => handleSelectAccount(admin.id, admin.username)}
                  className={`p-3 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                    selectedAccountId === admin.id
                      ? 'border-[#163D2B] bg-[#163D2B] text-white ring-2 ring-[#163D2B]/20 shadow-xs'
                      : 'border-[#E2E8DF] bg-white hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-2xl">🛡️</span>
                    <span
                      className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                        selectedAccountId === admin.id
                          ? 'bg-[#34D399] text-[#163D2B]'
                          : 'bg-amber-100 text-amber-800 border border-amber-200'
                      }`}
                    >
                      Admin
                    </span>
                  </div>
                  <div>
                    <div
                      className={`font-bold text-xs truncate ${
                        selectedAccountId === admin.id ? 'text-white' : 'text-slate-900'
                      }`}
                    >
                      {admin.name}
                    </div>
                    <div
                      className={`text-[11px] truncate ${
                        selectedAccountId === admin.id ? 'text-white/80' : 'text-slate-500'
                      }`}
                    >
                      {admin.username}
                    </div>
                  </div>
                </button>
              )}
            </div>
          </div>

          {/* Password Authentication Form */}
          <form onSubmit={handleFormSubmit} className="space-y-4 pt-1">
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                2. Username or Registered Email
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <User className="w-4 h-4" />
                </div>
                <input
                  type="text"
                  value={usernameInput}
                  onChange={(e) => setUsernameInput(e.target.value)}
                  placeholder="Enter username or email"
                  required
                  className="w-full pl-10 pr-4 py-2.5 bg-[#F8FAF7] border border-[#E2E8DF] rounded-xl text-sm font-semibold text-slate-900 focus:outline-none focus:border-[#163D2B] focus:ring-1 focus:ring-[#163D2B]"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                  3. Account Password (Required)
                </label>
                <span className="text-[11px] text-slate-500 font-medium">
                  {currentSelectedUser?.role === 'admin'
                    ? 'Admin Credentials'
                    : 'Farmer Predefined Password'}
                </span>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <KeyRound className="w-4 h-4" />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={passwordInput}
                  onChange={(e) => setPasswordInput(e.target.value)}
                  placeholder="Enter password to verify identity"
                  required
                  autoFocus
                  className="w-full pl-10 pr-11 py-2.5 bg-[#F8FAF7] border border-[#E2E8DF] rounded-xl text-sm text-slate-900 focus:outline-none focus:border-[#163D2B] focus:ring-1 focus:ring-[#163D2B]"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600 cursor-pointer"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Error Message */}
            {errorMessage && (
              <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl flex items-start gap-2.5 text-xs text-rose-800 animate-shake">
                <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                <span>{errorMessage}</span>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={!passwordInput.trim()}
              className="w-full py-3 bg-[#163D2B] hover:bg-[#1E4E37] disabled:bg-slate-300 disabled:cursor-not-allowed text-white font-bold text-sm rounded-xl shadow-md flex items-center justify-center gap-2 cursor-pointer transition-all"
            >
              <Lock className="w-4 h-4 text-[#34D399]" />
              <span>
                {currentSelectedUser?.role === 'admin'
                  ? 'Verify Password & Access Admin Portal'
                  : 'Verify Password & Open Farmer Portal'}
              </span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Privacy & Isolation Note */}
          <div className="p-3 bg-[#F8FAF7] rounded-xl border border-[#E2E8DF] text-[11px] text-slate-600 space-y-1">
            <div className="flex items-center gap-1.5 font-bold text-slate-800">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              <span>Strict Data Isolation Active</span>
            </div>
            <p>
              Users only access their own crop scans and farm records. Admin surveillance telemetry, audit logs, and farmer directories are strictly restricted to verified Administrators.
            </p>
          </div>

          {/* Predefined Passwords Reference Accordion for Testing */}
          <div className="border-t border-[#E2E8DF] pt-3">
            <button
              type="button"
              onClick={() => setShowCredentialsReference(!showCredentialsReference)}
              className="flex items-center justify-between w-full text-xs text-slate-500 hover:text-slate-800 font-medium cursor-pointer"
            >
              <span className="flex items-center gap-1.5">
                <HelpCircle className="w-3.5 h-3.5" />
                <span>Predefined Credentials Reference (For Verification Testing)</span>
              </span>
              {showCredentialsReference ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>

            {showCredentialsReference && (
              <div className="mt-2.5 p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs font-mono space-y-2 text-slate-700">
                <div className="flex justify-between items-center pb-1.5 border-b border-slate-200">
                  <div>
                    <strong className="text-slate-900">User 1:</strong> user1
                  </div>
                  <div className="text-emerald-700 font-bold">Password@123</div>
                </div>
                <div className="flex justify-between items-center pb-1.5 border-b border-slate-200">
                  <div>
                    <strong className="text-slate-900">User 2:</strong> user2
                  </div>
                  <div className="text-emerald-700 font-bold">Password@456</div>
                </div>
                <div className="flex justify-between items-center">
                  <div>
                    <strong className="text-slate-900">Admin:</strong> admin
                  </div>
                  <div className="text-[#163D2B] font-bold">Admin@2026</div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
