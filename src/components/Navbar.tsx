import React, { useState, useRef, useEffect } from 'react';
import {
  Sprout,
  ScanLine,
  Bug,
  LayoutDashboard,
  BellRing,
  HeadphonesIcon,
  Info,
  User,
  Menu,
  X,
  Languages,
  Wifi,
  Sparkles,
  Check,
  Shield,
  KeyRound,
  LogOut,
  ChevronDown,
  Lock,
  UserCheck,
  ArrowRight
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';
import { useToast } from './Toast';

export type NavTab = 
  | 'home'
  | 'detect-disease'
  | 'pest-detection'
  | 'detect-pest'
  | 'dashboard'
  | 'alerts'
  | 'expert'
  | 'crops'
  | 'history'
  | 'settings'
  | 'about'
  | 'profile'
  | 'admin-portal'
  | 'user-portal';

interface NavbarProps {
  currentTab?: NavTab;
  activeTab?: NavTab;
  onSelectTab: (tab: NavTab) => void;
  isHighContrast?: boolean;
  onToggleContrast?: () => void;
  activeAlertsCount?: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  activeTab,
  onSelectTab,
  activeAlertsCount = 4
}) => {
  const current = currentTab || activeTab || 'home';
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const userMenuRef = useRef<HTMLDivElement>(null);

  const { language, setLanguage, t, isHindi } = useLanguage();
  const { currentUser, isAdmin, users, switchUser, logout, openAuthModal } = useAuth();
  const { showToast } = useToast();

  // Close user dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setUserMenuOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const navItems: { id: NavTab; label: string; icon: React.ComponentType<{ className?: string }>; highlight?: boolean }[] = [
    { id: 'home', label: t.navHome, icon: Sprout },
    { id: 'detect-disease', label: t.navDetectDisease, icon: ScanLine },
    { id: 'pest-detection', label: t.navPestDetection, icon: Bug },
    { id: 'dashboard', label: t.navDashboard, icon: LayoutDashboard },
    { id: 'alerts', label: t.navAlerts, icon: BellRing },
    { id: 'user-portal', label: 'Farmer Portal', icon: UserCheck },
    ...(isAdmin ? [{ id: 'admin-portal' as NavTab, label: 'Admin Portal', icon: Shield, highlight: true }] : []),
    { id: 'expert', label: t.navExpert, icon: HeadphonesIcon },
    { id: 'crops', label: t.navMyCrops, icon: Sprout },
    { id: 'history', label: t.navHistory, icon: Info }
  ];

  const handleNavClick = (tab: NavTab) => {
    onSelectTab(tab);
    setMobileMenuOpen(false);
    setUserMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-[#E2E8DF] shadow-xs">
      {/* Top micro-bar with active session and secure role switcher */}
      <div className="hidden lg:flex items-center justify-between px-6 py-1.5 bg-[#163D2B] text-[#EAF0EB] text-xs font-medium border-b border-[#0F2A1E]">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#34D399] animate-pulse" />
            <span className="font-semibold text-white">CropVision Role Security</span>
          </span>
          <span className="text-[#34D399]/60">|</span>
          <div className="text-[#EAF0EB]/90 flex items-center gap-2">
            <span className="text-slate-300">Active Session:</span>
            <span className="font-bold text-white flex items-center gap-1.5">
              <span>{currentUser?.avatar || (isAdmin ? '🛡️' : '👨‍🌾')}</span>
              <span>{currentUser?.name || 'Guest'}</span>
              <span className={`text-[10px] uppercase px-1.5 py-0.2 rounded font-bold ${isAdmin ? 'bg-amber-400 text-slate-950' : 'bg-[#34D399] text-[#163D2B]'}`}>
                {currentUser?.role || 'Guest'}
              </span>
            </span>
          </div>
        </div>

        {/* Right side switcher controls */}
        <div className="flex items-center gap-3">
          {isAdmin ? (
            <div className="flex items-center gap-2">
              <span className="text-[#34D399] text-[11px] font-bold">Admin Switcher:</span>
              {users.map((u) => {
                const isCurrent = currentUser?.id === u.id;
                return (
                  <button
                    key={u.id}
                    type="button"
                    onClick={() => {
                      switchUser(u.id);
                      showToast('Admin Session Switch', `Switched session to ${u.name} without password.`, 'success');
                    }}
                    className={`text-[11px] font-bold flex items-center gap-1 px-2.5 py-0.5 rounded-lg transition-colors cursor-pointer ${
                      isCurrent
                        ? 'bg-[#34D399] text-[#163D2B]'
                        : 'bg-white/10 hover:bg-white/20 text-white'
                    }`}
                  >
                    <span>{u.avatar || (u.role === 'admin' ? '🛡️' : '👨‍🌾')}</span>
                    <span>{u.name.split(' ')[0]}</span>
                    {isCurrent && <span className="text-[9px] font-black uppercase ml-0.5">(Active)</span>}
                  </button>
                );
              })}
            </div>
          ) : (
            <div className="flex items-center gap-2.5">
              <button
                type="button"
                onClick={() => openAuthModal()}
                className="text-[11px] text-[#34D399] hover:text-white font-bold flex items-center gap-1.5 px-2.5 py-0.5 rounded-lg bg-white/10 hover:bg-white/20 transition-colors cursor-pointer"
              >
                <KeyRound className="w-3 h-3" />
                <span>Switch Account</span>
              </button>

              <button
                type="button"
                onClick={() => openAuthModal('admin')}
                className="text-[11px] text-amber-300 hover:text-white font-bold flex items-center gap-1 px-2.5 py-0.5 rounded-lg bg-amber-400/20 hover:bg-amber-400/30 transition-colors cursor-pointer"
              >
                <Lock className="w-3 h-3" />
                <span>Admin Sign-In</span>
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18">
          {/* Logo & Tagline */}
          <div
            id="brand-logo-btn"
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-3 cursor-pointer group shrink-0"
          >
            <div className="w-10 h-10 rounded-xl bg-[#163D2B] flex items-center justify-center text-white shadow-md shadow-[#163D2B]/20 group-hover:bg-[#1E4E37] transition-all">
              <Sprout className="w-6 h-6 text-[#34D399]" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-xl tracking-tight text-[#163D2B]">
                  CropVision<span className="text-[#10B981]">AI</span>
                </span>
                <span className="bg-[#EAF0EB] text-[#163D2B] border border-[#163D2B]/15 text-[10px] font-bold px-1.5 py-0.5 rounded tracking-wide uppercase">
                  AgriTech
                </span>
              </div>
              <p className="text-[11px] text-slate-500 hidden sm:block font-medium">
                Detect Early. Act Smart. Protect Every Crop.
              </p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden xl:flex items-center gap-0.5">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = current === item.id || (item.id === 'pest-detection' && current === 'detect-pest');
              const isHighlightAdmin = item.id === 'admin-portal';

              return (
                <button
                  key={item.id}
                  id={`nav-link-${item.id}`}
                  onClick={() => handleNavClick(item.id)}
                  className={`relative flex items-center gap-1.5 px-2.5 py-2 rounded-lg text-sm font-medium transition-all ${
                    isActive
                      ? isHighlightAdmin
                        ? 'bg-[#163D2B] text-white font-bold shadow-xs'
                        : 'bg-[#EAF0EB] text-[#163D2B] font-semibold shadow-xs'
                      : isHighlightAdmin
                      ? 'text-[#163D2B] font-bold hover:bg-[#EAF0EB]'
                      : 'text-slate-600 hover:text-[#163D2B] hover:bg-[#F3F5F2]'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? (isHighlightAdmin ? 'text-[#34D399]' : 'text-[#163D2B]') : isHighlightAdmin ? 'text-[#163D2B]' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                  {item.id === 'admin-portal' && (
                    <span className="px-1.5 py-0.2 bg-amber-100 text-amber-800 text-[10px] font-bold rounded">
                      Role
                    </span>
                  )}
                  {item.id === 'alerts' && activeAlertsCount > 0 && (
                    <span className="ml-0.5 px-1.5 py-0.2 bg-amber-500 text-white text-[10px] font-bold rounded-full">
                      {activeAlertsCount}
                    </span>
                  )}
                  {isActive && (
                    <span className={`absolute bottom-0 left-3 right-3 h-0.5 rounded-full ${isHighlightAdmin ? 'bg-[#34D399]' : 'bg-[#163D2B]'}`} />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right Action Area */}
          <div className="hidden sm:flex items-center gap-3">
            {/* User Account / Role Dropdown Button */}
            <div className="relative" ref={userMenuRef}>
              <button
                type="button"
                id="user-session-dropdown-btn"
                onClick={() => setUserMenuOpen(!userMenuOpen)}
                className={`flex items-center gap-2 p-1.5 pr-3 rounded-2xl border transition-all cursor-pointer ${
                  isAdmin
                    ? 'bg-[#163D2B] text-white border-[#0F2A1E] shadow-sm'
                    : 'bg-[#EAF0EB] text-slate-800 border-[#E2E8DF] hover:border-[#163D2B]/30'
                }`}
              >
                <div className={`w-8 h-8 rounded-xl flex items-center justify-center text-lg ${isAdmin ? 'bg-white/10' : 'bg-white shadow-2xs'}`}>
                  {currentUser?.avatar || (isAdmin ? '🛡️' : '👨‍🌾')}
                </div>
                <div className="text-left leading-tight hidden md:block">
                  <div className="text-xs font-extrabold truncate max-w-[110px]">
                    {currentUser?.name || 'Guest User'}
                  </div>
                  <div className={`text-[10px] font-bold uppercase ${isAdmin ? 'text-[#34D399]' : 'text-[#163D2B]'}`}>
                    {currentUser?.role || 'Guest'}
                  </div>
                </div>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform ${userMenuOpen ? 'rotate-180' : ''} ${isAdmin ? 'text-white/70' : 'text-slate-500'}`} />
              </button>

              {/* User Session Dropdown Menu */}
              {userMenuOpen && (
                <div className="absolute right-0 mt-2 w-72 bg-white rounded-2xl shadow-xl border border-[#E2E8DF] p-3 space-y-3 z-50 animate-fade-in">
                  <div className="p-2.5 bg-[#F8FAF7] rounded-xl border border-[#E2E8DF] space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-900">{currentUser?.name}</span>
                      <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full ${isAdmin ? 'bg-[#163D2B] text-white' : 'bg-emerald-100 text-emerald-800'}`}>
                        {currentUser?.role}
                      </span>
                    </div>
                    <div className="text-[11px] text-slate-500 font-mono">{currentUser?.username}</div>
                    {currentUser?.farmName && (
                      <div className="text-[11px] text-slate-600">{currentUser.farmName}</div>
                    )}
                  </div>

                  {/* Switch account actions */}
                  {isAdmin ? (
                    <div className="space-y-1">
                      <div className="flex items-center justify-between px-1">
                        <span className="text-[11px] font-bold text-slate-500 uppercase">Switch Account</span>
                        <span className="text-[10px] text-emerald-600 font-bold">Direct Admin Switch</span>
                      </div>
                      {users.map((u) => {
                        const isCurrent = currentUser?.id === u.id;
                        return (
                          <button
                            key={u.id}
                            type="button"
                            onClick={() => {
                              setUserMenuOpen(false);
                              switchUser(u.id);
                              showToast('Admin Session Switch', `Switched session to ${u.name} without password.`, 'success');
                            }}
                            className={`w-full p-2 rounded-xl text-left text-xs flex items-center justify-between cursor-pointer transition-colors ${
                              isCurrent
                                ? 'bg-[#EAF0EB] text-[#163D2B] font-bold'
                                : 'hover:bg-[#F3F5F2] text-slate-700'
                            }`}
                          >
                            <div className="flex items-center gap-2">
                              <span>{u.avatar || (u.role === 'admin' ? '🛡️' : '👨‍🌾')}</span>
                              <div>
                                <div className="font-semibold text-slate-900">{u.name}</div>
                                <div className="text-[10px] text-slate-400 font-mono">{u.username} • {u.role}</div>
                              </div>
                            </div>
                            {isCurrent ? (
                              <Check className="w-3.5 h-3.5 text-[#163D2B]" />
                            ) : (
                              <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
                            )}
                          </button>
                        );
                      })}
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <button
                        type="button"
                        onClick={() => {
                          setUserMenuOpen(false);
                          openAuthModal();
                        }}
                        className="w-full p-2.5 rounded-xl bg-[#F8FAF7] hover:bg-[#EAF0EB] border border-[#E2E8DF] text-left text-xs flex items-center justify-between cursor-pointer transition-colors"
                      >
                        <div className="flex items-center gap-2">
                          <KeyRound className="w-4 h-4 text-[#163D2B]" />
                          <div>
                            <div className="font-bold text-slate-900">Switch Account</div>
                            <div className="text-[10px] text-slate-500">Sign in with different credentials</div>
                          </div>
                        </div>
                        <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          setUserMenuOpen(false);
                          openAuthModal('admin');
                        }}
                        className="w-full p-2.5 rounded-xl bg-[#163D2B] hover:bg-[#1E4E37] text-white text-left text-xs flex items-center justify-between cursor-pointer transition-colors"
                      >
                        <div className="flex items-center gap-2">
                          <Shield className="w-4 h-4 text-[#34D399]" />
                          <div>
                            <div className="font-bold text-white">Administrator Portal</div>
                            <div className="text-[10px] text-[#34D399]">Admin credentials required</div>
                          </div>
                        </div>
                        <ArrowRight className="w-3.5 h-3.5 text-[#34D399]" />
                      </button>
                    </div>
                  )}

                  <div className="pt-2 border-t border-[#E2E8DF] flex items-center justify-between">
                    <button
                      type="button"
                      onClick={() => {
                        setUserMenuOpen(false);
                        openAuthModal();
                      }}
                      className="text-xs font-bold text-[#163D2B] hover:underline flex items-center gap-1 cursor-pointer"
                    >
                      <KeyRound className="w-3.5 h-3.5" />
                      <span>Credentials Gate</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setUserMenuOpen(false);
                        logout();
                      }}
                      className="text-xs font-bold text-rose-600 hover:text-rose-700 flex items-center gap-1 cursor-pointer"
                    >
                      <LogOut className="w-3.5 h-3.5" />
                      <span>Log Out</span>
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Instant 1-Click Language Switcher Pill */}
            <div
              id="language-switcher-pill"
              className="inline-flex items-center p-1 bg-[#EAF0EB] border border-[#E2E8DF] rounded-xl shadow-inner"
              title={isHindi ? 'भाषा बदलें (Switch Language)' : 'Switch Language to Hindi'}
            >
              <button
                type="button"
                id="btn-lang-en"
                onClick={() => setLanguage('en')}
                className={`px-2.5 py-1 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                  language === 'en'
                    ? 'bg-[#163D2B] text-white shadow-xs'
                    : 'text-slate-700 hover:text-[#163D2B]'
                }`}
              >
                EN
              </button>
              <button
                type="button"
                id="btn-lang-hi"
                onClick={() => setLanguage('hi')}
                className={`px-2.5 py-1 text-xs font-bold rounded-lg transition-all cursor-pointer flex items-center gap-1 ${
                  language === 'hi'
                    ? 'bg-[#163D2B] text-[#34D399] shadow-xs'
                    : 'text-slate-700 hover:text-[#163D2B]'
                }`}
              >
                <span>हिन्दी</span>
                {language === 'hi' && <Check className="w-3 h-3 text-[#34D399]" />}
              </button>
            </div>

            {/* Quick Scan Action CTA */}
            <button
              id="header-quick-scan-btn"
              onClick={() => handleNavClick('detect-disease')}
              className="flex items-center gap-2 px-4 py-2 bg-[#163D2B] hover:bg-[#1E4E37] active:bg-[#0F2A1E] text-white text-sm font-semibold rounded-xl shadow-sm hover:shadow-md transition-all group cursor-pointer"
            >
              <ScanLine className="w-4 h-4 text-[#34D399] group-hover:rotate-12 transition-transform" />
              <span>{t.scanCrop}</span>
              <Sparkles className="w-3.5 h-3.5 text-[#34D399]" />
            </button>
          </div>

          {/* Mobile menu button & quick language button */}
          <div className="flex xl:hidden items-center gap-2">
            <button
              type="button"
              id="mobile-auth-btn"
              onClick={openAuthModal}
              className="px-2 py-1.5 bg-[#163D2B] text-white text-xs font-bold rounded-xl flex items-center gap-1 cursor-pointer"
            >
              <span>{currentUser?.avatar || '👤'}</span>
              <span className="text-[10px] uppercase font-bold">{currentUser?.role || 'Login'}</span>
            </button>

            <button
              type="button"
              id="mobile-lang-toggle"
              onClick={() => setLanguage(isHindi ? 'en' : 'hi')}
              className="px-2.5 py-1.5 bg-[#EAF0EB] text-[#163D2B] border border-[#E2E8DF] font-bold text-xs rounded-xl flex items-center gap-1 cursor-pointer"
              aria-label="Toggle language"
            >
              <Languages className="w-3.5 h-3.5" />
              <span>{isHindi ? 'EN' : 'हिन्दी'}</span>
            </button>

            <button
              id="mobile-menu-toggle-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 text-slate-700 hover:text-[#163D2B] hover:bg-[#F3F5F2] rounded-xl transition-colors cursor-pointer"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile drawer navigation */}
      {mobileMenuOpen && (
        <div id="mobile-nav-drawer" className="xl:hidden bg-white border-b border-[#E2E8DF] px-4 pt-2 pb-6 space-y-3 shadow-xl max-h-[85vh] overflow-y-auto">
          {/* Active User Card in Mobile */}
          <div className="p-3 bg-[#163D2B] text-white rounded-2xl flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <span className="text-2xl">{currentUser?.avatar || '👨‍🌾'}</span>
              <div>
                <div className="font-bold text-sm text-white">{currentUser?.name}</div>
                <div className="text-[11px] text-[#34D399] uppercase font-bold">{currentUser?.role}</div>
              </div>
            </div>
            <button
              type="button"
              onClick={openAuthModal}
              className="px-2.5 py-1 bg-white/10 hover:bg-white/20 text-white text-xs font-bold rounded-lg border border-white/20"
            >
              Switch
            </button>
          </div>

          {/* Mobile Language Switcher Box */}
          <div className="bg-[#F8FAF7] p-2.5 rounded-2xl border border-[#E2E8DF] flex items-center justify-between">
            <span className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
              <Languages className="w-4 h-4 text-[#163D2B]" />
              {t.langToggleLabel}:
            </span>
            <div className="inline-flex p-1 bg-white border border-[#E2E8DF] rounded-xl">
              <button
                type="button"
                onClick={() => setLanguage('en')}
                className={`px-3 py-1 text-xs font-bold rounded-lg transition-all ${
                  language === 'en' ? 'bg-[#163D2B] text-white' : 'text-slate-700'
                }`}
              >
                English
              </button>
              <button
                type="button"
                onClick={() => setLanguage('hi')}
                className={`px-3 py-1 text-xs font-bold rounded-lg transition-all ${
                  language === 'hi' ? 'bg-[#163D2B] text-[#34D399]' : 'text-slate-700'
                }`}
              >
                हिन्दी
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 pt-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = current === item.id || (item.id === 'pest-detection' && current === 'detect-pest');
              const isHighlight = item.id === 'admin-portal';

              return (
                <button
                  key={item.id}
                  id={`mobile-nav-${item.id}`}
                  onClick={() => handleNavClick(item.id)}
                  className={`flex items-center gap-2.5 p-3 rounded-xl text-sm font-medium text-left min-h-[44px] transition-colors cursor-pointer ${
                    isActive
                      ? 'bg-[#163D2B] text-white font-semibold shadow-xs'
                      : isHighlight
                      ? 'bg-[#EAF0EB] text-[#163D2B] font-bold border border-[#163D2B]/30'
                      : 'bg-[#F3F5F2] text-slate-700 hover:bg-[#EAF0EB]'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-[#34D399]' : isHighlight ? 'text-[#163D2B]' : 'text-[#163D2B]'}`} />
                  <span className="truncate">{item.label}</span>
                  {item.id === 'alerts' && activeAlertsCount > 0 && (
                    <span className={`ml-auto px-1.5 py-0.5 text-[10px] font-bold rounded-full ${isActive ? 'bg-[#34D399] text-[#163D2B]' : 'bg-amber-500 text-white'}`}>
                      {activeAlertsCount}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </header>
  );
};

