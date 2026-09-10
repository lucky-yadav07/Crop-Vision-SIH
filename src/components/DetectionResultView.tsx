import React, { useState } from 'react';
import { DetectionResult } from '../types';
import { SeverityBadge } from './SeverityBadge';
import { ConfidenceScore } from './ConfidenceScore';
import {
  RotateCcw,
  HeadphonesIcon,
  FileText,
  AlertTriangle,
  CheckCircle,
  HelpCircle,
  ShieldCheck,
  Calendar,
  Layers,
  Sparkles,
  ExternalLink,
  Printer,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { useToast } from './Toast';

interface DetectionResultViewProps {
  result: DetectionResult;
  onScanAnother: () => void;
  onConsultExpert: (crop: string, issue: string) => void;
}

export const DetectionResultView: React.FC<DetectionResultViewProps> = ({
  result,
  onScanAnother,
  onConsultExpert
}) => {
  const { showToast } = useToast();
  const [showFullPlanModal, setShowFullPlanModal] = useState(false);
  const [showBoundingBoxes, setShowBoundingBoxes] = useState(true);
  const [expandedSection, setExpandedSection] = useState<'immediate' | 'shortTerm' | 'longTerm'>('immediate');

  const isPest = result.type === 'pest';

  const handlePrint = () => {
    window.print();
    showToast('Diagnostic Report Ready', 'Print dialog initiated');
  };

  return (
    <div id="detection-result-container" className="space-y-8 animate-in fade-in duration-300">
      {/* Top Banner with AI Prediction Disclaimer */}
      <div className="bg-[#EAF0EB] border border-[#E2E8DF] rounded-2xl p-4 sm:p-5 flex items-start gap-3.5">
        <AlertTriangle className="w-5 h-5 text-[#163D2B] flex-shrink-0 mt-0.5" />
        <div className="text-xs sm:text-sm text-slate-800 leading-relaxed">
          <p className="font-semibold text-[#163D2B]">
            Advisory Notice: Preliminary AI Prediction ({result.confidence}% Model Confidence)
          </p>
          <p className="mt-0.5 text-slate-600">
            Computer vision patterns indicate <strong className="font-semibold text-[#163D2B]">{result.name}</strong> on {result.crop}. 
            These results are designed as decision support. For severe outbreaks or high-value plots, please confirm with your local agricultural extension officer or Krishi Vigyan Kendra before aggressive chemical applications.
          </p>
        </div>
      </div>

      {/* Main Result Card */}
      <div className="bg-white rounded-3xl border border-[#E2E8DF] shadow-xs overflow-hidden">
        {/* Header */}
        <div className="p-6 sm:p-8 bg-[#163D2B] text-white flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-[#0F2A1E]">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="px-3 py-1 rounded-full bg-white/15 text-[#34D399] text-xs font-semibold uppercase tracking-wider">
                {result.crop} • {isPest ? 'Pest Infestation Analysis' : 'Crop Disease Diagnosis'}
              </span>
              <span className="text-white/70 text-xs flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5" /> {result.timestamp}
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
              {result.name}
            </h2>
            {result.scientificName && (
              <p className="text-sm font-serif italic text-[#34D399]/90">
                Scientific Taxon: {result.scientificName}
              </p>
            )}
          </div>

          <div className="flex items-center gap-4 bg-[#0F2A1E]/60 backdrop-blur-sm p-4 rounded-2xl border border-white/10">
            <ConfidenceScore score={result.confidence} size={84} strokeWidth={7} />
            <div className="space-y-1">
              <span className="text-[11px] text-white/70 font-medium block uppercase tracking-wider">
                Assessed Threat
              </span>
              <SeverityBadge severity={result.severity} size="lg" />
              {result.affectedAreaEstimate && (
                <span className="text-xs text-white/80 block font-mono">
                  {result.affectedAreaEstimate}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left: Scanned Image with Visual AI Reticle */}
          <div className="lg:col-span-5 space-y-4">
            <div className="relative rounded-2xl overflow-hidden border border-[#E2E8DF] bg-slate-950 shadow-inner group">
              <img
                src={result.imageUrl}
                alt={`${result.crop} scan`}
                className="w-full h-80 object-cover"
              />

              {/* Bounding Box / Lesion Overlay toggle */}
              {showBoundingBoxes && (
                <div className="absolute inset-0 pointer-events-none p-6 flex flex-col justify-center items-center">
                  <div className="w-48 h-40 border-2 border-dashed border-[#34D399] rounded-xl bg-[#34D399]/15 flex items-start justify-end p-2 relative animate-pulse">
                    <span className="bg-[#34D399] text-[#0F2A1E] text-[10px] font-bold px-1.5 py-0.5 rounded shadow-xs">
                      Symptom Focus ({result.confidence}%)
                    </span>
                  </div>
                </div>
              )}

              <div className="absolute bottom-3 right-3 flex gap-2">
                <button
                  onClick={() => setShowBoundingBoxes(!showBoundingBoxes)}
                  className="px-2.5 py-1 bg-slate-900/80 hover:bg-slate-900 text-white text-xs rounded-lg backdrop-blur-xs flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Layers className="w-3.5 h-3.5 text-[#34D399]" />
                  <span>{showBoundingBoxes ? 'Hide AI Reticle' : 'Show AI Reticle'}</span>
                </button>
              </div>
            </div>

            {/* Quick action buttons */}
            <div className="flex flex-col sm:flex-row gap-2.5 pt-2">
              <button
                id="btn-scan-another"
                onClick={onScanAnother}
                className="flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl border border-[#E2E8DF] text-slate-700 hover:bg-[#F3F5F2] font-medium text-sm transition-colors cursor-pointer"
              >
                <RotateCcw className="w-4 h-4 text-slate-500" />
                <span>Scan Another Crop</span>
              </button>

              <button
                id="btn-consult-expert-trigger"
                onClick={() => onConsultExpert(result.crop, `${result.name} (${result.confidence}%)`)}
                className="flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-[#163D2B] hover:bg-[#1E4E37] text-white font-semibold text-sm shadow-xs transition-colors cursor-pointer"
              >
                <HeadphonesIcon className="w-4 h-4 text-[#34D399]" />
                <span>Consult an Expert</span>
              </button>
            </div>

            <button
              onClick={handlePrint}
              className="w-full flex items-center justify-center gap-1.5 py-2 text-xs font-medium text-slate-500 hover:text-[#163D2B] transition-colors cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / Save Diagnostic Report</span>
            </button>
          </div>

          {/* Right: Diagnostic Details */}
          <div className="lg:col-span-7 space-y-6">
            {/* Symptoms Detected */}
            <div className="bg-[#F3F5F2] rounded-2xl p-5 border border-[#E2E8DF]">
              <h3 className="text-sm font-bold text-[#163D2B] uppercase tracking-wider flex items-center gap-2 mb-3">
                <CheckCircle className="w-4 h-4 text-[#10B981]" />
                <span>Visible Symptoms Detected By Model</span>
              </h3>
              <ul className="space-y-2">
                {(result.symptoms || []).map((symptom, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-sm text-slate-700">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] mt-2 flex-shrink-0" />
                    <span>{symptom}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Possible Causes */}
            <div className="bg-[#F3F5F2] rounded-2xl p-5 border border-[#E2E8DF]">
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2 mb-3">
                <HelpCircle className="w-4 h-4 text-amber-600" />
                <span>Probable Pathological & Environmental Causes</span>
              </h3>
              <ul className="space-y-2">
                {(result.possibleCauses || []).map((cause, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-sm text-slate-700">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-2 flex-shrink-0" />
                    <span>{cause}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Integrated Pest Management / Practical Actions */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-[#163D2B] uppercase tracking-wider flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#10B981]" />
                  <span>{isPest ? 'Integrated Pest Management (IPM) Steps' : 'Recommended Management Plan'}</span>
                </h3>
                <button
                  onClick={() => setShowFullPlanModal(true)}
                  className="text-xs font-semibold text-[#163D2B] hover:text-[#1E4E37] underline flex items-center gap-1 cursor-pointer"
                >
                  <span>View Full Management Plan</span>
                  <ExternalLink className="w-3 h-3" />
                </button>
              </div>

              {/* Action Tabs Accordion */}
              <div className="border border-[#E2E8DF] rounded-2xl overflow-hidden divide-y divide-[#E2E8DF] bg-white">
                {/* Immediate Steps */}
                <div>
                  <button
                    onClick={() => setExpandedSection(expandedSection === 'immediate' ? 'immediate' : 'immediate')}
                    className="w-full px-5 py-3.5 flex items-center justify-between text-left hover:bg-[#F3F5F2] font-semibold text-sm text-slate-800 cursor-pointer"
                  >
                    <span className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-rose-500" />
                      1. Immediate Containment (Within 24 Hours)
                    </span>
                    {expandedSection === 'immediate' ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
                  </button>
                  {expandedSection === 'immediate' && (
                    <div className="px-5 pb-4 pt-1 bg-[#F3F5F2]/50">
                      <ul className="space-y-2">
                        {(result.recommendedActions?.immediate || []).map((act, i) => (
                          <li key={i} className="text-xs sm:text-sm text-slate-700 flex items-start gap-2">
                            <span className="text-rose-600 font-bold">•</span>
                            <span>{act}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                {/* Short Term Treatment */}
                <div>
                  <button
                    onClick={() => setExpandedSection(expandedSection === 'shortTerm' ? 'immediate' : 'shortTerm')}
                    className="w-full px-5 py-3.5 flex items-center justify-between text-left hover:bg-[#F3F5F2] font-semibold text-sm text-slate-800 cursor-pointer"
                  >
                    <span className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-amber-500" />
                      2. Short-Term Treatment & Remediation (3-7 Days)
                    </span>
                    {expandedSection === 'shortTerm' ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
                  </button>
                  {expandedSection === 'shortTerm' && (
                    <div className="px-5 pb-4 pt-1 bg-[#F3F5F2]/50">
                      <ul className="space-y-2">
                        {(result.recommendedActions?.shortTerm || []).map((act, i) => (
                          <li key={i} className="text-xs sm:text-sm text-slate-700 flex items-start gap-2">
                            <span className="text-amber-600 font-bold">•</span>
                            <span>{act}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                {/* Preventive Long-Term */}
                <div>
                  <button
                    onClick={() => setExpandedSection(expandedSection === 'longTerm' ? 'immediate' : 'longTerm')}
                    className="w-full px-5 py-3.5 flex items-center justify-between text-left hover:bg-[#F3F5F2] font-semibold text-sm text-slate-800 cursor-pointer"
                  >
                    <span className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-[#10B981]" />
                      3. Long-Term Cultural & Preventive Strategies
                    </span>
                    {expandedSection === 'longTerm' ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
                  </button>
                  {expandedSection === 'longTerm' && (
                    <div className="px-5 pb-4 pt-1 bg-[#F3F5F2]/50">
                      <ul className="space-y-2">
                        {(result.recommendedActions?.longTerm || []).map((act, i) => (
                          <li key={i} className="text-xs sm:text-sm text-slate-700 flex items-start gap-2">
                            <span className="text-[#10B981] font-bold">•</span>
                            <span>{act}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* IPM Specific Breakdown if Pest */}
            {isPest && result.ipmPractices && (
              <div className="bg-[#EAF0EB]/60 border border-[#E2E8DF] rounded-2xl p-5 space-y-2">
                <div className="flex items-center gap-2 text-xs font-bold text-[#163D2B] uppercase tracking-wider">
                  <Sparkles className="w-4 h-4 text-[#10B981]" />
                  <span>IPM Biological & Economic Threshold Guidelines</span>
                </div>
                <p className="text-xs text-slate-700">
                  <strong className="font-semibold text-[#163D2B]">Chemical Spray Threshold:</strong> {result.ipmPractices.chemicalThreshold}
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs pt-1">
                  <div className="bg-white p-2.5 rounded-xl border border-[#E2E8DF]">
                    <span className="font-semibold text-[#163D2B] block mb-1">Biological Allies:</span>
                    <ul className="list-disc pl-4 text-slate-600 space-y-0.5">
                      {(result.ipmPractices.biological || []).map((b, idx) => (
                        <li key={idx}>{b}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="bg-white p-2.5 rounded-xl border border-[#E2E8DF]">
                    <span className="font-semibold text-[#163D2B] block mb-1">Cultural Tactics:</span>
                    <ul className="list-disc pl-4 text-slate-600 space-y-0.5">
                      {(result.ipmPractices.cultural || []).map((c, idx) => (
                        <li key={idx}>{c}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Modal: Full Detailed Management Plan */}
      {showFullPlanModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 space-y-6 max-h-[90vh] overflow-y-auto border border-slate-200 shadow-2xl animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between border-b pb-4">
              <div>
                <span className="text-xs font-bold text-emerald-600 uppercase tracking-wider">
                  Complete Field Protocol
                </span>
                <h3 className="text-xl font-bold text-slate-900">
                  {result.name} Full Management Plan
                </h3>
              </div>
              <button
                onClick={() => setShowFullPlanModal(false)}
                className="p-2 text-slate-400 hover:text-slate-600 rounded-lg"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4 text-sm text-slate-700 leading-relaxed">
              <div className="bg-slate-50 p-4 rounded-xl border">
                <h4 className="font-bold text-slate-900 mb-1">Field Bio-Security Measures:</h4>
                <p className="text-xs text-slate-600">
                  Sanitize sickles, shears, and boots in a 5% copper sulfate or bleach solution between rows to avoid vectoring spores across adjacent plots.
                </p>
              </div>

              <div>
                <h4 className="font-bold text-slate-900 mb-2">Preventive Cultural Measures:</h4>
                <ul className="list-disc pl-5 space-y-1 text-xs sm:text-sm">
                  {(result.preventiveMeasures || []).map((pm, idx) => (
                    <li key={idx}>{pm}</li>
                  ))}
                </ul>
              </div>

              <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-200 text-xs text-emerald-900">
                <p className="font-semibold mb-1">Safe Handling of Agri-Inputs:</p>
                <p>
                  Always wear protective nitrile gloves, eye masks, and long sleeves when spraying. Follow pre-harvest interval (PHI) periods indicated on the bottle label.
                </p>
              </div>
            </div>

            <div className="pt-4 border-t flex justify-end gap-3">
              <button
                onClick={() => setShowFullPlanModal(false)}
                className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-sm font-semibold rounded-xl transition-colors"
              >
                Close Plan
              </button>
              <button
                onClick={() => {
                  setShowFullPlanModal(false);
                  handlePrint();
                }}
                className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold rounded-xl flex items-center gap-2 shadow-xs transition-colors"
              >
                <FileText className="w-4 h-4" />
                <span>Save to PDF</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
