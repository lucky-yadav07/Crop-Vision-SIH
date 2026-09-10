import React from 'react';
import { Sparkles, CheckCircle2, Loader2, Cpu } from 'lucide-react';

interface ScanProgressProps {
  currentStep: string;
  percent: number;
  previewUrl?: string;
  cropName: string;
  scanType?: 'disease' | 'pest';
}

export const ScanProgress: React.FC<ScanProgressProps> = ({
  currentStep,
  percent,
  previewUrl,
  cropName,
  scanType = 'disease'
}) => {
  const steps = [
    'Uploading image...',
    'Analyzing crop...',
    'Detecting symptoms...',
    'Comparing patterns...',
    'Generating recommendations...'
  ];

  const currentStepIndex = steps.indexOf(currentStep);

  return (
    <div id="ai-scanning-overlay" className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E2E8DF] shadow-xl max-w-xl mx-auto text-center space-y-6">
      {/* Scanner Visual Frame */}
      <div className="relative mx-auto w-48 h-48 sm:w-60 sm:h-60 rounded-2xl overflow-hidden border-2 border-[#163D2B] shadow-inner bg-slate-950 group">
        {previewUrl ? (
          <img
            src={previewUrl}
            alt="Leaf being scanned"
            className="w-full h-full object-cover opacity-80"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-slate-800 text-slate-400">
            <Cpu className="w-12 h-12 text-[#34D399] animate-pulse" />
          </div>
        )}

        {/* AI Laser Scan Line */}
        <div className="absolute left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#34D399] to-transparent shadow-[0_0_15px_#34D399] animate-scan-laser" />

        {/* Corner Reticle Markers */}
        <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-[#34D399]" />
        <div className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-[#34D399]" />
        <div className="absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 border-[#34D399]" />
        <div className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-[#34D399]" />

        {/* Live HUD telemetry */}
        <div className="absolute bottom-2 inset-x-2 bg-slate-950/85 backdrop-blur-xs rounded-lg py-1 px-2.5 text-[11px] text-[#34D399] flex items-center justify-between font-mono border border-white/10">
          <span className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#34D399] animate-ping" />
            SCANNING {cropName.toUpperCase()}
          </span>
          <span>{percent}%</span>
        </div>
      </div>

      {/* Progress & Current Action Header */}
      <div>
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#EAF0EB] text-[#163D2B] text-xs font-semibold mb-2 border border-[#163D2B]/15">
          <Sparkles className="w-3.5 h-3.5 animate-spin text-[#10B981]" />
          <span>CropVision Neural Core v2.4</span>
        </div>
        <h3 className="text-xl font-bold text-slate-900 tracking-tight">
          {currentStep}
        </h3>
        <p className="text-xs text-slate-500 mt-1">
          Examining chlorophyll dispersion, necrosis margins, and {scanType === 'pest' ? 'pest morphology' : 'spore lesions'}
        </p>
      </div>

      {/* Progress bar */}
      <div className="w-full bg-[#EAF0EB] rounded-full h-2.5 overflow-hidden">
        <div
          className="bg-[#163D2B] h-2.5 rounded-full transition-all duration-300 ease-out"
          style={{ width: `${percent}%` }}
        />
      </div>

      {/* 5-Step Checklist */}
      <div className="space-y-2 text-left bg-[#F3F5F2] p-4 rounded-2xl border border-[#E2E8DF] text-xs">
        {steps.map((step, idx) => {
          const isDone = currentStepIndex > idx || percent === 100;
          const isCurrent = currentStepIndex === idx;

          return (
            <div
              key={step}
              className={`flex items-center justify-between transition-colors ${
                isDone
                  ? 'text-[#163D2B] font-medium'
                  : isCurrent
                  ? 'text-slate-900 font-semibold'
                  : 'text-slate-400'
              }`}
            >
              <div className="flex items-center gap-2.5">
                {isDone ? (
                  <CheckCircle2 className="w-4 h-4 text-[#10B981] flex-shrink-0" />
                ) : isCurrent ? (
                  <Loader2 className="w-4 h-4 text-[#163D2B] animate-spin flex-shrink-0" />
                ) : (
                  <div className="w-4 h-4 rounded-full border border-slate-300 flex-shrink-0" />
                )}
                <span>{step}</span>
              </div>
              {isDone && <span className="text-[10px] text-[#10B981] uppercase font-mono font-bold">OK</span>}
            </div>
          );
        })}
      </div>
    </div>
  );
};
