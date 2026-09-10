import React, { useState, useEffect } from 'react';
import { FarmerProfile, CropType } from '../types';
import { AgroApiService } from '../services/agroApi';
import { useToast } from '../components/Toast';
import {
  User,
  Building,
  Languages,
  Bell,
  WifiOff,
  Save,
  CheckCircle,
  Shield,
  Smartphone,
  MapPin,
  Sprout
} from 'lucide-react';

export const SettingsView: React.FC = () => {
  const { showToast } = useToast();
  const [profile, setProfile] = useState<FarmerProfile | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    async function loadProfile() {
      const data = await AgroApiService.getProfile();
      setProfile(data);
    }
    loadProfile();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!profile) return;
    setIsSaving(true);
    try {
      await AgroApiService.updateProfile(profile);
      showToast('Profile Saved', 'Farmer settings updated successfully.', 'success');
    } catch {
      showToast('Save Error', 'Could not save profile.', 'error');
    } finally {
      setIsSaving(false);
    }
  };

  if (!profile) {
    return <div className="p-12 text-center text-slate-500">Loading farmer profile...</div>;
  }

  return (
    <div id="settings-profile-view" className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      {/* Header */}
      <div className="border-b border-[#E2E8DF] pb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EAF0EB] text-[#163D2B] border border-[#163D2B]/15 text-xs font-semibold mb-2 shadow-xs">
            <User className="w-3.5 h-3.5 text-[#163D2B]" />
            <span>Kisan Account & Farm Configuration</span>
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            Farmer Profile & Settings
          </h1>
          <p className="text-sm text-slate-600 mt-0.5">
            Manage your land holdings, language preferences, notification frequencies, and offline field cache.
          </p>
        </div>

        <button
          onClick={handleSave}
          disabled={isSaving}
          className="px-6 py-2.5 bg-[#163D2B] hover:bg-[#1E4E37] active:bg-[#0F2A1E] text-white text-xs sm:text-sm font-bold rounded-xl flex items-center gap-2 shadow-xs transition-colors self-start sm:self-auto cursor-pointer"
        >
          <Save className="w-4 h-4" />
          <span>{isSaving ? 'Saving...' : 'Save Changes'}</span>
        </button>
      </div>

      <form onSubmit={handleSave} className="space-y-8">
        {/* Section 1: Farmer & Farm Info */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E2E8DF] shadow-xs space-y-6">
          <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <Building className="w-5 h-5 text-[#163D2B]" />
            <span>Farm & Farmer Identity</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm">
            <div>
              <label className="block font-bold text-slate-700 mb-1">Farmer Full Name</label>
              <input
                type="text"
                value={profile.name}
                onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                className="w-full px-4 py-2.5 bg-[#F3F5F2] border border-[#E2E8DF] rounded-xl focus:outline-none focus:border-[#163D2B] text-slate-900"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Farm / Estate Name</label>
              <input
                type="text"
                value={profile.farmName}
                onChange={(e) => setProfile({ ...profile, farmName: e.target.value })}
                className="w-full px-4 py-2.5 bg-[#F3F5F2] border border-[#E2E8DF] rounded-xl focus:outline-none focus:border-[#163D2B] text-slate-900"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Mobile / WhatsApp Number</label>
              <input
                type="tel"
                value={profile.phone}
                onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                className="w-full px-4 py-2.5 bg-[#F3F5F2] border border-[#E2E8DF] rounded-xl focus:outline-none focus:border-[#163D2B] text-slate-900"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Total Acreage Cultivated</label>
              <input
                type="number"
                step="0.5"
                value={profile.totalAcres}
                onChange={(e) => setProfile({ ...profile, totalAcres: Number(e.target.value) })}
                className="w-full px-4 py-2.5 bg-[#F3F5F2] border border-[#E2E8DF] rounded-xl focus:outline-none focus:border-[#163D2B] text-slate-900"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">District</label>
              <input
                type="text"
                value={profile.district}
                onChange={(e) => setProfile({ ...profile, district: e.target.value })}
                className="w-full px-4 py-2.5 bg-[#F3F5F2] border border-[#E2E8DF] rounded-xl focus:outline-none focus:border-[#163D2B] text-slate-900"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">State / Province</label>
              <input
                type="text"
                value={profile.state}
                onChange={(e) => setProfile({ ...profile, state: e.target.value })}
                className="w-full px-4 py-2.5 bg-[#F3F5F2] border border-[#E2E8DF] rounded-xl focus:outline-none focus:border-[#163D2B] text-slate-900"
              />
            </div>
          </div>
        </div>

        {/* Section 2: Preferred Language & Offline Mode */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E2E8DF] shadow-xs space-y-6">
          <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <Languages className="w-5 h-5 text-[#163D2B]" />
            <span>Language & Field Offline Sync</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Preferred Language</label>
              <select
                value={profile.preferredLanguage}
                onChange={(e) => setProfile({ ...profile, preferredLanguage: e.target.value })}
                className="w-full px-4 py-2.5 bg-[#F3F5F2] border border-[#E2E8DF] rounded-xl text-sm focus:outline-none focus:border-[#163D2B] text-slate-900"
              >
                <option value="English">English</option>
                <option value="हिन्दी (Hindi)">हिन्दी (Hindi)</option>
                <option value="ਪੰਜਾਬੀ (Punjabi)">ਪੰਜਾਬੀ (Punjabi)</option>
                <option value="বাংলা (Bengali)">বাংলা (Bengali)</option>
                <option value="मराठी (Marathi)">मराठी (Marathi)</option>
                <option value="తెలుగు (Telugu)">తెలుగు (Telugu)</option>
              </select>
            </div>

            <div className="flex items-center justify-between p-4 bg-[#F3F5F2] rounded-2xl border border-[#E2E8DF]">
              <div className="space-y-0.5">
                <span className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
                  <WifiOff className="w-4 h-4 text-[#163D2B]" />
                  <span>Offline Field Mode</span>
                </span>
                <p className="text-xs text-slate-500">
                  Cache diagnosis models and past scan history for deep rural plots without 4G/5G signal.
                </p>
              </div>
              <input
                type="checkbox"
                checked={profile.offlineMode}
                onChange={(e) => setProfile({ ...profile, offlineMode: e.target.checked })}
                className="w-5 h-5 accent-[#163D2B] rounded cursor-pointer ml-4"
              />
            </div>
          </div>
        </div>

        {/* Section 3: Notification Preferences */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E2E8DF] shadow-xs space-y-4">
          <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <Bell className="w-5 h-5 text-amber-600" />
            <span>Kisan SMS & Early Warning Preferences</span>
          </h3>

          <div className="space-y-3">
            {[
              {
                id: 'smsAlerts',
                title: 'High-Risk SMS Alerts',
                desc: 'Receive urgent SMS broadcast when regional blight or armyworm thresholds are breached.'
              },
              {
                id: 'weatherWarnings',
                title: 'Monsoon & Humidity Spore Alerts',
                desc: 'Alert when consecutive humid days create high fungal sporulation risk.'
              },
              {
                id: 'pestOutbreakUpdates',
                title: 'Pest Outbreak Bulletins',
                desc: 'Alerts on locust or sucking pest migrations detected in neighboring districts.'
              },
              {
                id: 'weeklyDigest',
                title: 'Weekly Farm Health Summary',
                desc: 'Consolidated report of scans, weather outlook, and preventative tasks.'
              }
            ].map((pref) => {
              const key = pref.id as keyof FarmerProfile['notifications'];
              return (
                <label
                  key={pref.id}
                  className="flex items-start justify-between p-4 rounded-2xl border border-[#E2E8DF]/70 hover:bg-[#F3F5F2] cursor-pointer transition-colors"
                >
                  <div className="pr-4">
                    <p className="text-sm font-bold text-slate-800">{pref.title}</p>
                    <p className="text-xs text-slate-500">{pref.desc}</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={profile.notifications[key]}
                    onChange={(e) =>
                      setProfile({
                        ...profile,
                        notifications: {
                          ...profile.notifications,
                          [key]: e.target.checked
                        }
                      })
                    }
                    className="w-5 h-5 accent-[#163D2B] rounded cursor-pointer mt-1"
                  />
                </label>
              );
            })}
          </div>
        </div>
      </form>
    </div>
  );
};
