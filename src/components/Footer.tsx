import React from 'react';
import { Sprout, Phone, ShieldCheck, HeartHandshake } from 'lucide-react';
import { NavTab } from './Navbar';

interface FooterProps {
  onSelectTab?: (tab: NavTab) => void;
  onNavigate?: (tab: NavTab) => void;
}

export const Footer: React.FC<FooterProps> = ({ onSelectTab, onNavigate }) => {
  const navigate = onSelectTab || onNavigate || (() => {});

  return (
    <footer className="bg-[#163D2B] text-[#EAF0EB] pt-14 pb-10 border-t border-[#0F2A1E]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 pb-12 border-b border-[#1E4E37]">
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#0F2A1E] border border-[#1E4E37] flex items-center justify-center text-[#34D399] shadow-md">
                <Sprout className="w-5 h-5" />
              </div>
              <span className="font-extrabold text-xl text-white tracking-tight">
                CropVision<span className="text-[#34D399]">AI</span>
              </span>
            </div>
            <p className="text-[#EAF0EB]/80 text-sm max-w-sm leading-relaxed">
              Early Detection and Management of Crop Diseases and Pest Infestations. 
              Empowering farmers with intelligent vision diagnostics, climate-linked alerts, and Integrated Pest Management (IPM).
            </p>
            <div className="pt-2 text-xs text-[#34D399] font-semibold tracking-wide flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#34D399]" />
              <span>Detect Early. Act Smart. Protect Every Crop.</span>
            </div>
          </div>

          {/* Quick Navigation */}
          <div>
            <h4 className="text-white text-sm font-semibold tracking-wider uppercase mb-3">
              Detection Tools
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <button
                  onClick={() => navigate('detect-disease')}
                  className="text-[#EAF0EB]/70 hover:text-[#34D399] transition-colors cursor-pointer"
                >
                  Scan Crop Disease
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('pest-detection')}
                  className="text-[#EAF0EB]/70 hover:text-[#34D399] transition-colors cursor-pointer"
                >
                  Pest Infestation Scanner
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('alerts')}
                  className="text-[#EAF0EB]/70 hover:text-[#34D399] transition-colors cursor-pointer"
                >
                  Weather & Risk Alerts
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('crops')}
                  className="text-[#EAF0EB]/70 hover:text-[#34D399] transition-colors cursor-pointer"
                >
                  Monitored Crops Directory
                </button>
              </li>
            </ul>
          </div>

          {/* Supported Crops */}
          <div>
            <h4 className="text-white text-sm font-semibold tracking-wider uppercase mb-3">
              Key Crops Monitored
            </h4>
            <ul className="space-y-1.5 text-xs text-[#EAF0EB]/75">
              <li className="flex items-center gap-1.5">
                <span className="text-[#34D399]">✓</span> Sugarcane (Red Rot & Smut)
              </li>
              <li className="flex items-center gap-1.5">
                <span className="text-[#34D399]">✓</span> Maize (Fall Armyworm & Blight)
              </li>
              <li className="flex items-center gap-1.5">
                <span className="text-[#34D399]">✓</span> Mustard (White Rust & Aphids)
              </li>
              <li className="flex items-center gap-1.5">
                <span className="text-[#34D399]">✓</span> Rice (BLB & Blast)
              </li>
              <li className="flex items-center gap-1.5">
                <span className="text-[#34D399]">✓</span> Tomato, Potato, Wheat, Cotton, Chili
              </li>
            </ul>
          </div>

          {/* Farmer Helpline & Support */}
          <div>
            <h4 className="text-white text-sm font-semibold tracking-wider uppercase mb-3">
              Farmer Support
            </h4>
            <div className="space-y-3 text-xs">
              <div className="bg-[#0F2A1E] p-3 rounded-xl border border-[#1E4E37]">
                <div className="flex items-center gap-2 text-[#34D399] font-bold mb-1">
                  <Phone className="w-3.5 h-3.5" />
                  <span>Kisan Advisory Desk</span>
                </div>
                <p className="text-white font-mono text-sm font-semibold">1800-AGRO-AI (24/7)</p>
                <p className="text-[#EAF0EB]/60 mt-1">Toll-free across agricultural zones</p>
              </div>

              <button
                onClick={() => navigate('expert')}
                className="w-full flex items-center justify-center gap-2 px-3 py-2 bg-[#1E4E37] hover:bg-[#256345] text-[#34D399] border border-[#34D399]/30 rounded-xl transition-colors font-medium text-xs cursor-pointer"
              >
                <HeartHandshake className="w-3.5 h-3.5" />
                <span>Request Expert Agronomist</span>
              </button>
            </div>
          </div>
        </div>

        {/* Disclaimer & Bottom Bar */}
        <div className="pt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-[#EAF0EB]/60">
          <p className="max-w-2xl text-center md:text-left leading-relaxed">
            <strong className="text-[#EAF0EB]">Agricultural Safety Notice:</strong> AI predictions are intended as decision-support screening tools. Always verify severe symptoms with certified district agriculture officers, Krishi Vigyan Kendras (KVK), or state agricultural universities.
          </p>
          <div className="flex items-center gap-4 text-[#EAF0EB]/70">
            <span>© {new Date().getFullYear()} CropVisionAI</span>
            <span>•</span>
            <button onClick={() => navigate('dashboard')} className="hover:text-[#34D399] underline cursor-pointer">
              Platform Dashboard
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
