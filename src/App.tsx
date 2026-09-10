import React, { useState } from 'react';
import { Navbar, NavTab } from './components/Navbar';
import { Footer } from './components/Footer';
import { ToastProvider } from './components/Toast';
import { LanguageProvider } from './context/LanguageContext';
import { AuthProvider } from './context/AuthContext';
import { AuthModal } from './components/AuthModal';
import { HomeView } from './views/HomeView';
import { DiseaseScanView } from './views/DiseaseScanView';
import { PestScanView } from './views/PestScanView';
import { DashboardView } from './views/DashboardView';
import { AlertsView } from './views/AlertsView';
import { ExpertSupportView } from './views/ExpertSupportView';
import { MyCropsView } from './views/MyCropsView';
import { ScanHistoryView } from './views/ScanHistoryView';
import { SettingsView } from './views/SettingsView';
import { AdminPortalView } from './views/AdminPortalView';
import { UserPortalView } from './views/UserPortalView';
import { CropType } from './types';

function AppContent() {
  const [activeTab, setActiveTab] = useState<NavTab>('home');
  const [expertInitialData, setExpertInitialData] = useState<{ crop?: string; issue?: string }>({});

  const handleNavigate = (tab: NavTab) => {
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleConsultExpert = (crop: string, issue: string) => {
    setExpertInitialData({ crop, issue });
    setActiveTab('expert');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleScanSpecificCrop = (crop: CropType) => {
    setActiveTab('detect-disease');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F3F5F2] text-slate-800 font-sans selection:bg-[#163D2B] selection:text-white">
      {/* Navigation Bar with Multi-role Portals */}
      <Navbar activeTab={activeTab} currentTab={activeTab} onSelectTab={handleNavigate} />

      {/* Auth Modal with Predefined User/Admin Credentials */}
      <AuthModal />

      {/* Main Content Area */}
      <main className="flex-1">
        {activeTab === 'home' && <HomeView onNavigate={handleNavigate} />}

        {activeTab === 'detect-disease' && (
          <DiseaseScanView onConsultExpert={handleConsultExpert} />
        )}

        {(activeTab === 'detect-pest' || activeTab === 'pest-detection') && (
          <PestScanView onConsultExpert={handleConsultExpert} />
        )}

        {activeTab === 'dashboard' && (
          <DashboardView
            onNavigate={handleNavigate}
            onNewScan={() => handleNavigate('detect-disease')}
          />
        )}

        {activeTab === 'alerts' && <AlertsView />}

        {activeTab === 'admin-portal' && <AdminPortalView />}

        {activeTab === 'user-portal' && <UserPortalView onNavigate={handleNavigate} />}

        {activeTab === 'expert' && (
          <ExpertSupportView
            initialCrop={expertInitialData.crop}
            initialIssue={expertInitialData.issue}
          />
        )}

        {activeTab === 'crops' && (
          <MyCropsView onScanCrop={handleScanSpecificCrop} />
        )}

        {activeTab === 'history' && <ScanHistoryView />}

        {activeTab === 'settings' && <SettingsView />}
      </main>

      {/* Global Footer */}
      <Footer onNavigate={handleNavigate} />
    </div>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <ToastProvider>
        <AuthProvider>
          <AppContent />
        </AuthProvider>
      </ToastProvider>
    </LanguageProvider>
  );
}

