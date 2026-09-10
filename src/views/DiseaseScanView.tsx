import React, { useState } from 'react';
import { CropType, DetectionResult, ImageValidationResult } from '../types';
import { ImageUploader } from '../components/ImageUploader';
import { ScanProgress } from '../components/ScanProgress';
import { DetectionResultView } from '../components/DetectionResultView';
import { AgroApiService } from '../services/agroApi';
import { useToast } from '../components/Toast';
import { ScanLine, AlertCircle, ShieldAlert, ShieldCheck } from 'lucide-react';

interface DiseaseScanViewProps {
  onConsultExpert: (crop: string, issue: string) => void;
}

export const DiseaseScanView: React.FC<DiseaseScanViewProps> = ({ onConsultExpert }) => {
  const { showToast } = useToast();
  const [selectedCrop, setSelectedCrop] = useState<CropType>('Tomato');
  const [isScanning, setIsScanning] = useState(false);
  const [scanStep, setScanStep] = useState('Uploading image...');
  const [scanPercent, setScanPercent] = useState(0);
  const [previewImage, setPreviewImage] = useState<string | undefined>(undefined);
  const [diagnosticResult, setDiagnosticResult] = useState<DetectionResult | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [validationError, setValidationError] = useState<ImageValidationResult | null>(null);

  const handleStartAnalysis = async (image: File | string, crop: CropType) => {
    setErrorMessage(null);
    setValidationError(null);
    setIsScanning(true);
    setScanStep('Running AI Validation Layer: Checking for plant or crop subject...');
    setScanPercent(15);

    const preview = typeof image === 'string' ? image : URL.createObjectURL(image);
    setPreviewImage(preview);

    try {
      showToast('Validating Image', 'Checking for plant foliage and filtering non-agricultural subjects...', 'info');

      // 1. Real-time AI Validation Layer
      const validation = await AgroApiService.validatePlantImage(image);

      if (!validation.isValid) {
        setIsScanning(false);
        setValidationError(validation);
        const displayMsg = validation.userMessage.startsWith('Please upload a plant-related image')
          ? validation.userMessage
          : `Please upload a plant-related image. ${validation.userMessage}`;
        setErrorMessage(displayMsg);
        showToast('Validation Rejected', 'Please upload a plant-related image', 'error');
        return;
      }

      // 2. Proceed with pathology diagnostic vision
      showToast('Plant Subject Confirmed', 'Proceeding with neural pathology inference...', 'success');
      setScanStep('Screening crop foliage symptoms & lesions...');
      setScanPercent(35);

      const result = await AgroApiService.analyzeDisease(image, crop, (step, percent) => {
        setScanStep(step);
        setScanPercent(percent);
      });

      setDiagnosticResult(result);
      setIsScanning(false);
      showToast('Analysis completed', `Identified: ${result.name} (${result.confidence}% match)`, 'success');
    } catch (err: any) {
      setIsScanning(false);
      const msg = err?.message || 'AI analysis encountered an error. Please verify the image clarity and try again.';
      if (msg.includes('Please upload a plant-related image')) {
        setValidationError({
          isValid: false,
          category: 'other_invalid',
          reason: 'Non-agricultural subject detected during diagnostic scan.',
          userMessage: msg,
        });
        setErrorMessage(msg);
        showToast('Validation Rejected', 'Please upload a plant-related image', 'error');
      } else {
        setErrorMessage('AI analysis encountered an error. Please verify the image clarity and try again.');
        showToast('Analysis Failed', 'Could not process image. Please try again.', 'error');
      }
    }
  };

  const handleReset = () => {
    setDiagnosticResult(null);
    setErrorMessage(null);
    setValidationError(null);
    setIsScanning(false);
    setPreviewImage(undefined);
  };

  return (
    <div id="disease-scan-view" className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      {/* Page Header */}
      {!diagnosticResult && !isScanning && (
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EAF0EB] text-[#163D2B] border border-[#163D2B]/15 text-xs font-semibold shadow-xs">
            <ScanLine className="w-3.5 h-3.5 text-[#10B981]" />
            <span>Pathology Diagnostic Vision</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Scan Your Crop
          </h1>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            Upload a clear image of the affected crop part and let CropVisionAI analyze visible symptoms.
          </p>
        </div>
      )}

      {/* Real-time AI Validation Guard: Non-Plant Rejection Banner */}
      {validationError && (
        <div id="disease-validation-error-banner" className="p-6 bg-rose-50 border-2 border-rose-300 rounded-3xl shadow-sm space-y-4">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-rose-100 border border-rose-300 flex items-center justify-center text-rose-700 flex-shrink-0">
              <ShieldAlert className="w-6 h-6" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex flex-wrap items-center gap-2 mb-1.5">
                <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-rose-200 text-rose-900 border border-rose-300">
                  Validation Failed
                </span>
                <span className="text-xs font-medium px-2.5 py-0.5 rounded-full bg-white text-rose-800 border border-rose-200">
                  {validationError.category === 'human_face' && '👤 Detected: Human Face / Portrait'}
                  {validationError.category === 'animal' && '🐾 Detected: Animal / Pet'}
                  {validationError.category === 'non_agricultural_object' && '🚗 Detected: Non-Agricultural Object'}
                  {validationError.category === 'other_invalid' && '⚠️ Detected: Non-Plant Subject'}
                  {validationError.category === 'plant_or_crop' && '🌱 Plant'}
                  {validationError.category === 'agricultural_pest' && '🐛 Pest'}
                </span>
              </div>
              <h3 className="text-lg font-extrabold text-rose-950 tracking-tight">
                Please upload a plant-related image
              </h3>
              <p className="text-sm text-rose-800 mt-1 leading-relaxed font-medium">
                {validationError.userMessage}
              </p>
              <div className="text-xs text-rose-700 mt-2.5 bg-white/70 p-3 rounded-xl border border-rose-200 space-y-1">
                <p>
                  <strong>Validation Rule:</strong> CropVisionAI requires photos of crops, leaves, stems, roots, fruits, or agricultural pests. Images containing human faces, animals, or non-agricultural objects are automatically rejected to maintain diagnostic accuracy.
                </p>
                {validationError.reason && (
                  <p className="text-slate-600 italic">
                    AI Vision Reasoning: {validationError.reason}
                  </p>
                )}
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-end gap-3 pt-2 border-t border-rose-200">
            <button
              onClick={handleReset}
              className="px-4 py-2 bg-white hover:bg-rose-100 text-rose-900 border border-rose-300 text-xs font-bold rounded-xl transition-colors cursor-pointer"
            >
              Upload Another Image
            </button>
            <button
              onClick={() => {
                handleReset();
                handleStartAnalysis('https://images.unsplash.com/photo-1598512752271-33f913a5af13?auto=format&fit=crop&w=600&q=80', selectedCrop);
              }}
              className="px-4 py-2 bg-rose-800 hover:bg-rose-900 text-white text-xs font-bold rounded-xl shadow-xs transition-colors cursor-pointer"
            >
              Try Valid Plant Leaf Sample
            </button>
          </div>
        </div>
      )}

      {/* Generic Error State Banner if non-validation analysis failed */}
      {!validationError && errorMessage && (
        <div className="p-4 bg-rose-50 border border-rose-200 rounded-2xl flex items-center gap-3 text-rose-800 text-sm">
          <AlertCircle className="w-5 h-5 flex-shrink-0" />
          <div className="flex-1">
            <p className="font-semibold">Analysis Notice</p>
            <p className="text-xs text-rose-700">{errorMessage}</p>
          </div>
          <button
            onClick={handleReset}
            className="px-3 py-1 bg-rose-200 hover:bg-rose-300 text-rose-900 text-xs font-semibold rounded-lg cursor-pointer"
          >
            Retry Scan
          </button>
        </div>
      )}

      {/* State 1: Active Scanning Animation */}
      {isScanning && (
        <ScanProgress
          currentStep={scanStep}
          percent={scanPercent}
          previewUrl={previewImage}
          cropName={selectedCrop}
          scanType="disease"
        />
      )}

      {/* State 2: Diagnostic Result View */}
      {!isScanning && diagnosticResult && (
        <DetectionResultView
          result={diagnosticResult}
          onScanAnother={handleReset}
          onConsultExpert={(crop, issue) => onConsultExpert(crop, issue)}
        />
      )}

      {/* State 3: Upload Interface */}
      {!isScanning && !diagnosticResult && (
        <div className="space-y-6">
          {/* Quick Real-Time AI Validation Guard Bar */}
          <div className="p-4 rounded-2xl bg-[#EAF0EB] border border-[#163D2B]/15 text-slate-800 shadow-xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2.5">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#163D2B]" />
                <span className="text-xs font-bold uppercase tracking-wider text-[#163D2B]">
                  Real-Time AI Validation Layer
                </span>
              </div>
              <span className="text-[11px] text-slate-600 font-medium">
                Enforcing strict rejection of faces, animals & non-ag objects
              </span>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-medium text-slate-600">Quick Test Validator:</span>
              <button
                type="button"
                id="btn-test-face-disease"
                onClick={() => handleStartAnalysis('https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80', selectedCrop)}
                className="px-2.5 py-1.5 bg-white hover:bg-rose-50 border border-rose-300 hover:border-rose-400 text-rose-800 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <span>👤 Test Face (Rejects)</span>
              </button>
              <button
                type="button"
                id="btn-test-animal-disease"
                onClick={() => handleStartAnalysis('https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=600&q=80', selectedCrop)}
                className="px-2.5 py-1.5 bg-white hover:bg-rose-50 border border-rose-300 hover:border-rose-400 text-rose-800 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <span>🐾 Test Animal (Rejects)</span>
              </button>
              <button
                type="button"
                id="btn-test-object-disease"
                onClick={() => handleStartAnalysis('https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=600&q=80', selectedCrop)}
                className="px-2.5 py-1.5 bg-white hover:bg-rose-50 border border-rose-300 hover:border-rose-400 text-rose-800 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <span>🚗 Test Object (Rejects)</span>
              </button>
              <button
                type="button"
                id="btn-test-plant-disease"
                onClick={() => handleStartAnalysis('https://images.unsplash.com/photo-1598512752271-33f913a5af13?auto=format&fit=crop&w=600&q=80', selectedCrop)}
                className="px-2.5 py-1.5 bg-[#163D2B] hover:bg-[#1E4E37] text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <span>🌱 Test Plant Leaf (Passes)</span>
              </button>
            </div>
          </div>

          <ImageUploader
            selectedCrop={selectedCrop}
            onSelectCrop={(crop) => setSelectedCrop(crop)}
            onStartAnalysis={handleStartAnalysis}
            mode="disease"
          />
        </div>
      )}
    </div>
  );
};
