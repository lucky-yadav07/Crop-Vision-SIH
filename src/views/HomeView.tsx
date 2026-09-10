import React from 'react';
import { NavTab } from '../components/Navbar';
import { WeatherWidget } from '../components/WeatherWidget';
import { useLanguage } from '../context/LanguageContext';
import {
  ScanLine,
  ShieldCheck,
  Zap,
  ArrowRight,
  Upload,
  BrainCircuit,
  ClipboardList,
  Sparkles,
  ChevronRight,
  TrendingUp,
  CloudSun,
  Award
} from 'lucide-react';

interface HomeViewProps {
  onNavigate: (tab: NavTab) => void;
}

export const HomeView: React.FC<HomeViewProps> = ({ onNavigate }) => {
  const { t, isHindi } = useLanguage();

  return (
    <div id="home-view" className="space-y-16 sm:space-y-20 pb-16">
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden pt-8 pb-12 sm:pt-14 sm:pb-20 border-b border-[#E2E8DF] bg-gradient-to-b from-[#EAF0EB]/50 via-[#F3F5F2] to-[#F3F5F2]">
        {/* Subtle decorative background circle */}
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-[#EAF0EB] blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/4 -mb-20 w-80 h-80 rounded-full bg-[#E2ECE5]/50 blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Col: Hero Copy */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EAF0EB] text-[#163D2B] border border-[#163D2B]/15 text-xs font-semibold shadow-xs">
                <Sparkles className="w-3.5 h-3.5 text-[#10B981]" />
                <span>{t.heroBadge}</span>
              </div>

              {/* Exact Hero Heading */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 leading-[1.15]">
                {t.heroHeadingLine1}<br />
                <span className="text-[#163D2B]">{t.heroHeadingLine2}</span><br />
                {t.heroHeadingLine3}
              </h1>

              {/* Exact Supporting Text */}
              <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                {t.heroSubtext}
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
                {/* Primary CTA */}
                <button
                  id="hero-scan-crop-cta"
                  onClick={() => onNavigate('detect-disease')}
                  className="w-full sm:w-auto px-8 py-4 bg-[#163D2B] hover:bg-[#1E4E37] active:bg-[#0F2A1E] text-white rounded-2xl font-bold text-base shadow-lg shadow-[#163D2B]/20 hover:shadow-xl hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-2.5 group cursor-pointer"
                >
                  <ScanLine className="w-5 h-5 text-[#34D399] group-hover:rotate-12 transition-transform" />
                  <span>{t.heroScanCta}</span>
                  <ArrowRight className="w-4 h-4 ml-1 text-[#34D399] group-hover:translate-x-1 transition-transform" />
                </button>

                {/* Secondary CTA */}
                <button
                  id="hero-explore-solutions-cta"
                  onClick={() => onNavigate('crops')}
                  className="w-full sm:w-auto px-7 py-4 bg-white hover:bg-[#F3F5F2] border border-[#E2E8DF] text-[#163D2B] rounded-2xl font-semibold text-base transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-xs"
                >
                  <span>{t.heroExploreCta}</span>
                  <ChevronRight className="w-4 h-4 text-slate-400" />
                </button>
              </div>

              {/* Key Trust Metrics */}
              <div className="pt-6 border-t border-[#E2E8DF] grid grid-cols-3 gap-4 max-w-lg mx-auto lg:mx-0">
                <div>
                  <p className="text-2xl font-extrabold text-[#163D2B]">{t.heroStatPrecision}</p>
                  <p className="text-xs text-slate-500 font-medium">{t.heroStatPrecisionLabel}</p>
                </div>
                <div>
                  <p className="text-2xl font-extrabold text-[#163D2B]">{t.heroStatCrops}</p>
                  <p className="text-xs text-slate-500 font-medium">{t.heroStatCropsLabel}</p>
                </div>
                <div>
                  <p className="text-2xl font-extrabold text-[#163D2B]">{t.heroStatSpeed}</p>
                  <p className="text-xs text-slate-500 font-medium">{t.heroStatSpeedLabel}</p>
                </div>
              </div>
            </div>

            {/* Right Col: Hero Visual with Leaf Scanning Animation */}
            <div className="lg:col-span-5 relative flex justify-center">
              <div className="relative w-full max-w-md">
                {/* Visual Card */}
                <div className="relative rounded-3xl overflow-hidden border-2 border-[#163D2B] shadow-2xl bg-slate-950 aspect-[4/5] group">
                  <img
                    src="/assets/tomato_early_blight_infected.jpg"
                    alt="Real Infected Tomato Leaf with Early Blight (Alternaria solani)"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover opacity-90"
                  />

                  {/* Gradient shade */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-slate-950/20" />

                  {/* Laser scan line */}
                  <div className="absolute left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#34D399] to-transparent shadow-[0_0_16px_#34D399] animate-scan-laser" />

                  {/* Reticle brackets */}
                  <div className="absolute top-6 left-6 w-8 h-8 border-t-2 border-l-2 border-[#34D399]" />
                  <div className="absolute top-6 right-6 w-8 h-8 border-t-2 border-r-2 border-[#34D399]" />
                  <div className="absolute bottom-16 left-6 w-8 h-8 border-b-2 border-l-2 border-[#34D399]" />
                  <div className="absolute bottom-16 right-6 w-8 h-8 border-b-2 border-r-2 border-[#34D399]" />

                  {/* Center target detection box */}
                  <div className="absolute inset-16 border border-[#34D399]/60 rounded-xl flex items-start justify-end p-2 bg-[#163D2B]/20 backdrop-blur-[1px]">
                    <span className="bg-[#34D399] text-[#0F2A1E] text-[10px] font-bold px-1.5 py-0.5 rounded">
                      Alternaria solani lesion
                    </span>
                  </div>

                  {/* Hero AI Card */}
                  <div className="absolute bottom-4 inset-x-4 bg-slate-900/90 backdrop-blur-md rounded-2xl p-4 border border-slate-700/80 text-white shadow-xl space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="flex items-center gap-1.5 text-[#34D399] font-semibold font-mono">
                        <span className="w-2 h-2 rounded-full bg-[#34D399] animate-ping" />
                        {t.analyzingCrop}
                      </span>
                      <span className="bg-amber-500/20 text-amber-300 font-bold px-2 py-0.5 rounded border border-amber-500/30 text-[11px]">
                        {t.diseaseDetected}
                      </span>
                    </div>

                    <div className="flex items-center justify-between pt-1 border-t border-slate-800">
                      <div>
                        <p className="text-xs text-slate-400">{t.suspectedPathology}</p>
                        <p className="text-sm font-bold text-white">Tomato Early Blight</p>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-slate-400">{t.confidenceLabel}</p>
                        <p className="text-sm font-bold text-[#34D399] font-mono">92% confidence</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Floating badge */}
                <div className="absolute -top-4 -left-4 bg-white rounded-2xl p-3 shadow-lg border border-[#E2E8DF] hidden sm:flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#EAF0EB] text-[#163D2B] flex items-center justify-center">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-900">{t.cropHealthIndex}</p>
                    <p className="text-[11px] text-[#163D2B] font-semibold">{t.liveFieldDiagnostic}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* LIVE GPS WEATHER SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto space-y-2 mb-6">
          <span className="text-xs font-bold uppercase tracking-wider text-[#163D2B] bg-[#EAF0EB] px-3 py-1 rounded-full border border-[#163D2B]/10">
            {isHindi ? 'लाइव जीपीएस मौसम' : 'Live GPS Meteorological Sensing'}
          </span>
          <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            {t.weatherTitle}
          </h2>
          <p className="text-sm text-slate-600">
            {t.weatherSubtitle}
          </p>
        </div>

        <WeatherWidget />
      </section>

      {/* 2. HOW IT WORKS SECTION (4 Steps) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-[#163D2B] bg-[#EAF0EB] px-3 py-1 rounded-full border border-[#163D2B]/10">
            {t.howItWorksBadge}
          </span>
          <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            {t.howItWorksTitle}
          </h2>
          <p className="text-sm text-slate-600">
            {t.howItWorksSubtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {/* Step 1 */}
          <div className="bg-white rounded-2xl p-6 border border-[#E2E8DF] shadow-xs hover:shadow-md transition-shadow relative space-y-3">
            <div className="w-12 h-12 rounded-xl bg-[#EAF0EB] text-[#163D2B] flex items-center justify-center font-bold text-lg border border-[#E2E8DF]">
              <Upload className="w-6 h-6" />
            </div>
            <span className="text-xs font-bold text-[#163D2B] uppercase tracking-wider">{isHindi ? 'चरण 1' : 'Step 1'}</span>
            <h3 className="text-lg font-bold text-slate-900">{t.step1Title}</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              {t.step1Desc}
            </p>
          </div>

          {/* Step 2 */}
          <div className="bg-white rounded-2xl p-6 border border-[#E2E8DF] shadow-xs hover:shadow-md transition-shadow relative space-y-3">
            <div className="w-12 h-12 rounded-xl bg-[#EAF0EB] text-[#163D2B] flex items-center justify-center font-bold text-lg border border-[#E2E8DF]">
              <BrainCircuit className="w-6 h-6" />
            </div>
            <span className="text-xs font-bold text-[#163D2B] uppercase tracking-wider">{isHindi ? 'चरण 2' : 'Step 2'}</span>
            <h3 className="text-lg font-bold text-slate-900">{t.step2Title}</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              {t.step2Desc}
            </p>
          </div>

          {/* Step 3 */}
          <div className="bg-white rounded-2xl p-6 border border-[#E2E8DF] shadow-xs hover:shadow-md transition-shadow relative space-y-3">
            <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-800 flex items-center justify-center font-bold text-lg border border-amber-200">
              <ClipboardList className="w-6 h-6" />
            </div>
            <span className="text-xs font-bold text-amber-700 uppercase tracking-wider">{isHindi ? 'चरण 3' : 'Step 3'}</span>
            <h3 className="text-lg font-bold text-slate-900">{t.step3Title}</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              {t.step3Desc}
            </p>
          </div>

          {/* Step 4 */}
          <div className="bg-white rounded-2xl p-6 border border-[#E2E8DF] shadow-xs hover:shadow-md transition-shadow relative space-y-3">
            <div className="w-12 h-12 rounded-xl bg-[#163D2B] text-[#34D399] flex items-center justify-center font-bold text-lg shadow-sm">
              <Zap className="w-6 h-6" />
            </div>
            <span className="text-xs font-bold text-[#163D2B] uppercase tracking-wider">{isHindi ? 'चरण 4' : 'Step 4'}</span>
            <h3 className="text-lg font-bold text-slate-900">{t.step4Title}</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              {t.step4Desc}
            </p>
          </div>
        </div>
      </section>

      {/* 3. WHY CHOOSE AGROGUARD AI SECTION */}
      <section className="bg-[#EAF0EB]/50 py-16 border-y border-[#E2E8DF]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto space-y-3 mb-12">
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
              {t.whyChooseTitle}
            </h2>
            <p className="text-sm text-slate-600">
              {t.whyChooseSubtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Card 1 */}
            <div className="bg-white rounded-2xl p-6 border border-[#E2E8DF] shadow-xs space-y-3 hover:border-[#163D2B]/40 transition-colors">
              <div className="w-11 h-11 rounded-xl bg-[#EAF0EB] text-[#163D2B] flex items-center justify-center">
                <BrainCircuit className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-slate-900">{t.whyFeature1Title}</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                {t.whyFeature1Desc}
              </p>
            </div>

            {/* Card 2 */}
            <div className="bg-white rounded-2xl p-6 border border-[#E2E8DF] shadow-xs space-y-3 hover:border-[#163D2B]/40 transition-colors">
              <div className="w-11 h-11 rounded-xl bg-[#EAF0EB] text-[#163D2B] flex items-center justify-center">
                <CloudSun className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-slate-900">{t.whyFeature2Title}</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                {t.whyFeature2Desc}
              </p>
            </div>

            {/* Card 3 */}
            <div className="bg-white rounded-2xl p-6 border border-[#E2E8DF] shadow-xs space-y-3 hover:border-[#163D2B]/40 transition-colors">
              <div className="w-11 h-11 rounded-xl bg-[#EAF0EB] text-[#163D2B] flex items-center justify-center">
                <TrendingUp className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-slate-900">{t.whyFeature3Title}</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                {t.whyFeature3Desc}
              </p>
            </div>

            {/* Card 4 */}
            <div className="bg-white rounded-2xl p-6 border border-[#E2E8DF] shadow-xs space-y-3 hover:border-[#163D2B]/40 transition-colors">
              <div className="w-11 h-11 rounded-xl bg-[#EAF0EB] text-[#163D2B] flex items-center justify-center">
                <Award className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-slate-900">{t.whyFeature4Title}</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                {t.whyFeature4Desc}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. BOTTOM CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#163D2B] rounded-3xl p-8 sm:p-12 text-white shadow-xl relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8 border border-[#0F2A1E]">
          <div className="space-y-3 max-w-xl text-center md:text-left z-10">
            <span className="px-3 py-1 bg-white/15 backdrop-blur-xs rounded-full text-xs font-semibold uppercase tracking-wider text-[#34D399]">
              {isHindi ? 'सक्रिय खेत सुरक्षा' : 'Actionable Farm Protection'}
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              {isHindi ? 'अपनी फसल को दें समय पर सुरक्षा' : 'Give Your Crops an Early Advantage'}
            </h2>
            <p className="text-sm sm:text-base text-[#EAF0EB]/90 leading-relaxed">
              {isHindi
                ? 'प्रारंभिक लक्षणों और कीटों को समय रहते पहचानें और फसल के नुकसान से बचें। आधुनिक और सुरक्षित कृषि अपनाएं।'
                : 'Detect initial lesions and pest arrivals before economic yield damage sets in. Join thousands of farmers practicing smarter agriculture.'}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto z-10">
            <button
              onClick={() => onNavigate('detect-disease')}
              className="px-8 py-4 bg-[#34D399] hover:bg-[#2ecc8f] text-[#0F2A1E] font-bold rounded-2xl shadow-lg transition-all text-center text-sm cursor-pointer"
            >
              {t.heroScanCta}
            </button>
            <button
              onClick={() => onNavigate('dashboard')}
              className="px-6 py-4 bg-white/10 hover:bg-white/15 text-white font-semibold rounded-2xl border border-white/20 transition-all text-center text-sm cursor-pointer"
            >
              {isHindi ? 'किसान डैशबोर्ड देखें' : 'View Farmer Dashboard'}
            </button>
          </div>

          {/* Background watermark icon */}
          <ScanLine className="absolute -right-10 -bottom-10 w-64 h-64 text-white/5 pointer-events-none" />
        </div>
      </section>
    </div>
  );
};
