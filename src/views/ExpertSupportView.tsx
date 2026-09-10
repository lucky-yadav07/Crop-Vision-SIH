import React, { useState } from 'react';
import { CropType } from '../types';
import { SUPPORTED_CROPS } from '../data/mockData';
import { AgroApiService } from '../services/agroApi';
import { useToast } from '../components/Toast';
import { useAuth } from '../context/AuthContext';
import {
  HeadphonesIcon,
  Phone,
  MessageSquare,
  MapPin,
  UploadCloud,
  CheckCircle2,
  AlertTriangle,
  UserCheck,
  Building,
  Sparkles
} from 'lucide-react';

interface ExpertSupportViewProps {
  initialCrop?: string;
  initialIssue?: string;
}

export const ExpertSupportView: React.FC<ExpertSupportViewProps> = ({
  initialCrop = 'Tomato',
  initialIssue = ''
}) => {
  const { showToast } = useToast();
  const { currentUser } = useAuth();
  const [crop, setCrop] = useState<CropType>((initialCrop as CropType) || 'Tomato');
  const [problemDescription, setProblemDescription] = useState(
    initialIssue ? `Suspected ${initialIssue}. Requesting agronomist confirmation.` : ''
  );
  const [location, setLocation] = useState(currentUser?.location || 'Karnal Agri Belt, Plot 4');
  const [farmerName, setFarmerName] = useState(currentUser?.name || 'user1');
  const [phone, setPhone] = useState(currentUser?.phone || '+91 98765 43210');
  const [contactPreference, setContactPreference] = useState<'Phone Call' | 'WhatsApp' | 'Field Visit' | 'Email'>('Phone Call');
  const [urgency, setUrgency] = useState<'Standard (within 24h)' | 'Urgent (within 4h)'>('Standard (within 24h)');
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!problemDescription.trim()) {
      showToast('Missing Details', 'Please describe the observed crop symptoms.', 'error');
      return;
    }

    setIsSubmitting(true);
    try {
      await AgroApiService.submitExpertRequest({
        farmerName,
        userId: currentUser?.id,
        phone,
        crop,
        problemDescription,
        location,
        contactPreference,
        urgency
      });
      setSubmitted(true);
      showToast('Expert Request Submitted', 'An agronomist has been assigned to your case.', 'success');
    } catch {
      showToast('Submission Error', 'Please check your connection and retry.', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div id="expert-support-view" className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EAF0EB] text-[#163D2B] border border-[#163D2B]/15 text-xs font-semibold shadow-xs">
          <HeadphonesIcon className="w-3.5 h-3.5 text-[#163D2B]" />
          <span>Kisan Extension Agronomist Network</span>
        </div>
        {/* Exact heading from prompt */}
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Need Expert Help?
        </h1>
        <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
          Connect directly with certified university agronomists, plant pathologists, and local Krishi Vigyan Kendra extension officers for rapid second opinions.
        </p>
      </div>

      {/* Preliminary Notice from prompt */}
      <div className="bg-amber-50 border border-amber-200/80 rounded-2xl p-4 sm:p-5 flex items-start gap-3.5">
        <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
        <div className="text-xs sm:text-sm text-amber-900 leading-relaxed">
          <p className="font-semibold text-amber-950">Important Agricultural Notice</p>
          <p className="mt-0.5 text-amber-800/90">
            AI results are preliminary. Consult an agricultural expert for confirmation when needed, especially prior to expensive or regulated chemical treatments.
          </p>
        </div>
      </div>

      {/* Main Container */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E2E8DF] shadow-xs">
        {!submitted ? (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {/* Farmer Name */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                  Farmer Name
                </label>
                <input
                  type="text"
                  value={farmerName}
                  onChange={(e) => setFarmerName(e.target.value)}
                  required
                  className="w-full px-4 py-2.5 bg-[#F3F5F2] border border-[#E2E8DF] rounded-xl text-sm focus:outline-none focus:border-[#163D2B] text-slate-900"
                />
              </div>

              {/* Phone */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                  Phone / WhatsApp Number
                </label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                  className="w-full px-4 py-2.5 bg-[#F3F5F2] border border-[#E2E8DF] rounded-xl text-sm focus:outline-none focus:border-[#163D2B] text-slate-900"
                />
              </div>

              {/* Crop Selection */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                  Affected Crop
                </label>
                <select
                  value={crop}
                  onChange={(e) => setCrop(e.target.value as CropType)}
                  className="w-full px-4 py-2.5 bg-[#F3F5F2] border border-[#E2E8DF] rounded-xl text-sm focus:outline-none focus:border-[#163D2B] text-slate-900"
                >
                  {SUPPORTED_CROPS.map((c) => (
                    <option key={c.name} value={c.name}>
                      {c.name} ({c.scientific})
                    </option>
                  ))}
                </select>
              </div>

              {/* Location */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                  Location / District
                </label>
                <div className="relative">
                  <MapPin className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                  <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    required
                    placeholder="Village, Tehsil, District"
                    className="w-full pl-10 pr-4 py-2.5 bg-[#F3F5F2] border border-[#E2E8DF] rounded-xl text-sm focus:outline-none focus:border-[#163D2B] text-slate-900"
                  />
                </div>
              </div>
            </div>

            {/* Problem Description */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                Problem Description & Symptoms Observed
              </label>
              <textarea
                rows={4}
                value={problemDescription}
                onChange={(e) => setProblemDescription(e.target.value)}
                placeholder="Describe visible leaf spots, insect counts, wilting, affected acre area, or recent weather events..."
                className="w-full px-4 py-3 bg-[#F3F5F2] border border-[#E2E8DF] rounded-xl text-sm focus:outline-none focus:border-[#163D2B] text-slate-900 placeholder:text-slate-400"
              />
            </div>

            {/* Contact Preference */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                Preferred Consultation Channel
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {(['Phone Call', 'WhatsApp', 'Field Visit', 'Email'] as const).map((pref) => (
                  <button
                    key={pref}
                    type="button"
                    onClick={() => setContactPreference(pref)}
                    className={`py-2.5 px-3 rounded-xl border text-xs font-semibold transition-all cursor-pointer ${
                      contactPreference === pref
                        ? 'border-[#163D2B] bg-[#EAF0EB] text-[#163D2B] shadow-xs'
                        : 'border-[#E2E8DF] text-slate-600 hover:bg-[#F3F5F2]'
                    }`}
                  >
                    {pref}
                  </button>
                ))}
              </div>
            </div>

            {/* Urgency */}
            <div className="flex items-center gap-4 text-xs">
              <span className="font-bold uppercase text-slate-700">Urgency Level:</span>
              <label className="inline-flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="urgency"
                  checked={urgency === 'Standard (within 24h)'}
                  onChange={() => setUrgency('Standard (within 24h)')}
                  className="accent-[#163D2B]"
                />
                <span>Standard (24h)</span>
              </label>
              <label className="inline-flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="urgency"
                  checked={urgency === 'Urgent (within 4h)'}
                  onChange={() => setUrgency('Urgent (within 4h)')}
                  className="text-rose-600 focus:ring-rose-500"
                />
                <span className="text-rose-700 font-semibold">Urgent Outbreak (&lt;4h)</span>
              </label>
            </div>

            {/* Submit Button (Exact text from prompt) */}
            <div className="pt-4 border-t border-[#E2E8DF] flex flex-col sm:flex-row items-center justify-between gap-4">
              <span className="text-xs text-slate-500">
                Average agronomist response time: 28 minutes
              </span>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full sm:w-auto px-8 py-3.5 bg-[#163D2B] hover:bg-[#1E4E37] active:bg-[#0F2A1E] text-white font-bold text-sm rounded-xl shadow-xs transition-colors cursor-pointer"
              >
                {isSubmitting ? 'Dispatching Case...' : 'Submit for Expert Review'}
              </button>
            </div>
          </form>
        ) : (
          /* Submission Success Card */
          <div className="text-center py-10 space-y-4 max-w-md mx-auto animate-in fade-in duration-300">
            <div className="w-16 h-16 rounded-full bg-[#EAF0EB] text-[#163D2B] flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-bold text-slate-900">Case Dispatched Successfully</h3>
            <p className="text-sm text-slate-600">
              Case Ref: <strong className="font-mono text-[#163D2B]">AGRO-EXP-{Date.now().toString().slice(-4)}</strong>
            </p>
            <p className="text-xs text-slate-500 leading-relaxed">
              Dr. S. K. Verma (Senior Plant Pathologist, Karnal KVK) has been assigned. You will receive a {contactPreference.toLowerCase()} shortly at {phone}.
            </p>
            <button
              onClick={() => setSubmitted(false)}
              className="mt-4 px-6 py-2.5 bg-[#EAF0EB] hover:bg-[#E2E8DF] text-slate-700 font-semibold text-xs rounded-xl transition-colors cursor-pointer"
            >
              Submit Another Inquiry
            </button>
          </div>
        )}
      </div>

      {/* Direct Agronomist Directory Card */}
      <div className="bg-[#F3F5F2] rounded-3xl p-6 border border-[#E2E8DF] space-y-4">
        <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
          <UserCheck className="w-4 h-4 text-[#163D2B]" />
          <span>Regional Extension Officers On Duty</span>
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          <div className="bg-white p-4 rounded-2xl border border-[#E2E8DF] space-y-1">
            <p className="font-bold text-slate-900">Dr. Sunita Rani</p>
            <p className="text-[#163D2B] font-medium">Sugarcane & Cereals Pathologist</p>
            <p className="text-slate-500 text-[11px]">ICAR-Sugarcane Breeding Institute</p>
          </div>
          <div className="bg-white p-4 rounded-2xl border border-[#E2E8DF] space-y-1">
            <p className="font-bold text-slate-900">Er. Harpreet Singh</p>
            <p className="text-[#163D2B] font-medium">IPM & Sucking Pests Specialist</p>
            <p className="text-slate-500 text-[11px]">Punjab Agricultural University</p>
          </div>
          <div className="bg-white p-4 rounded-2xl border border-[#E2E8DF] space-y-1">
            <p className="font-bold text-slate-900">Dr. Vivek Sharma</p>
            <p className="text-[#163D2B] font-medium">Horticulture & Solanaceae Officer</p>
            <p className="text-slate-500 text-[11px]">Karnal Krishi Vigyan Kendra</p>
          </div>
        </div>
      </div>
    </div>
  );
};
