import React, { useState, useRef } from 'react';
import { CropType } from '../types';
import { SUPPORTED_CROPS, SAMPLE_SCAN_PRESETS } from '../data/mockData';
import {
  UploadCloud,
  Camera,
  Trash2,
  Sparkles,
  Check,
  HelpCircle,
  Sun,
  Focus,
  Maximize2
} from 'lucide-react';
import { useToast } from './Toast';
import { LiveCameraModal } from './LiveCameraModal';

interface ImageUploaderProps {
  selectedCrop: CropType;
  onSelectCrop: (crop: CropType) => void;
  onStartAnalysis: (image: File | string, crop: CropType) => void;
  mode?: 'disease' | 'pest';
}

export const ImageUploader: React.FC<ImageUploaderProps> = ({
  selectedCrop,
  onSelectCrop,
  onStartAnalysis,
  mode = 'disease'
}) => {
  const { showToast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);

  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const [imageError, setImageError] = useState<string | null>(null);
  const [isLiveCameraOpen, setIsLiveCameraOpen] = useState(false);

  const handleFiles = (files: FileList | null) => {
    if (!files || files.length === 0) return;
    const file = files[0];

    // Validate file type
    if (!file.type.startsWith('image/')) {
      setImageError('Please select a valid image file (JPEG, PNG, WEBP).');
      showToast('Invalid File Format', 'Only image files are accepted.', 'error');
      return;
    }

    // Validate file size (max 15MB)
    if (file.size > 15 * 1024 * 1024) {
      setImageError('Image file is too large. Max allowed size is 15MB.');
      showToast('File Too Large', 'Please upload an image smaller than 15MB.', 'error');
      return;
    }

    setImageError(null);
    setSelectedFile(file);
    const objectUrl = URL.createObjectURL(file);
    setPreviewUrl(objectUrl);
    showToast('Image Loaded', 'Ready for AI diagnostic scan.', 'success');
  };

  const handleLiveCapture = (file: File) => {
    setImageError(null);
    setSelectedFile(file);
    const objectUrl = URL.createObjectURL(file);
    setPreviewUrl(objectUrl);
    showToast('Live Photo Captured', `Captured ${selectedCrop} photo. Ready to analyze.`, 'success');
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const handleSelectPreset = (preset: typeof SAMPLE_SCAN_PRESETS[0]) => {
    onSelectCrop(preset.crop);
    setPreviewUrl(preset.thumbnail);
    setSelectedFile(null);
    setImageError(null);
    showToast('Sample Loaded', `Selected ${preset.crop} sample: ${preset.result.name}`, 'info');
  };

  const handleClearImage = () => {
    setPreviewUrl(null);
    setSelectedFile(null);
    setImageError(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
    if (cameraInputRef.current) cameraInputRef.current.value = '';
  };

  const handleSubmit = () => {
    if (!previewUrl && !selectedFile) {
      setImageError('Please upload an image or choose one of the sample leaves below.');
      return;
    }
    const targetImage = selectedFile || previewUrl!;
    onStartAnalysis(targetImage, selectedCrop);
  };

  // Filter presets based on mode (disease or pest)
  const filteredPresets = SAMPLE_SCAN_PRESETS.filter((p) => p.type === mode);

  return (
    <div id="crop-scanner-interface" className="space-y-8 max-w-4xl mx-auto">
      {/* Crop Selection Bar */}
      <div className="bg-white rounded-2xl p-5 border border-[#E2E8DF] shadow-xs">
        <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">
          Step 1: Select Target Crop
        </label>
        <div className="grid grid-cols-3 sm:grid-cols-5 md:grid-cols-9 gap-2">
          {SUPPORTED_CROPS.map((crop) => {
            const isSelected = selectedCrop === crop.name;
            return (
              <button
                key={crop.name}
                id={`crop-select-${crop.name.toLowerCase()}`}
                onClick={() => onSelectCrop(crop.name)}
                className={`flex flex-col items-center justify-center p-2.5 rounded-xl border text-center transition-all cursor-pointer ${
                  isSelected
                    ? 'border-[#163D2B] bg-[#EAF0EB] text-[#163D2B] shadow-xs font-semibold ring-2 ring-[#163D2B]/20'
                    : 'border-[#E2E8DF] hover:border-slate-300 hover:bg-[#F3F5F2] text-slate-700'
                }`}
              >
                <span className="text-xl mb-1">{crop.icon}</span>
                <span className="text-xs truncate w-full">{crop.name}</span>
                {isSelected && <Check className="w-3 h-3 text-[#163D2B] mt-0.5" />}
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Upload / Drag-Drop Zone */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E2E8DF] shadow-xs space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold text-slate-900 tracking-tight">
              Step 2: Upload or Capture Affected Leaf / Stem
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Target crop: <strong className="text-[#163D2B] font-semibold">{selectedCrop}</strong>
            </p>
          </div>
          {previewUrl && (
            <button
              onClick={handleClearImage}
              className="text-xs text-rose-600 hover:text-rose-700 font-semibold flex items-center gap-1 px-3 py-1.5 rounded-lg hover:bg-rose-50 transition-colors cursor-pointer"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Remove / Change</span>
            </button>
          )}
        </div>

        {/* Upload Container */}
        {!previewUrl ? (
          <div
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
            className={`border-2 border-dashed rounded-2xl p-8 text-center transition-all cursor-pointer flex flex-col items-center justify-center min-h-[260px] ${
              dragActive
                ? 'border-[#163D2B] bg-[#EAF0EB]/50 scale-[1.005]'
                : 'border-[#E2E8DF] hover:border-[#163D2B] bg-[#F3F5F2]/60 hover:bg-[#EAF0EB]/40'
            }`}
            onClick={() => fileInputRef.current?.click()}
          >
            <div className="w-16 h-16 rounded-2xl bg-[#EAF0EB] text-[#163D2B] flex items-center justify-center mb-4 shadow-xs border border-[#E2E8DF]">
              <UploadCloud className="w-8 h-8 text-[#163D2B]" />
            </div>

            <p className="text-base font-semibold text-slate-800">
              Drag and drop high-resolution crop photo here
            </p>
            <p className="text-xs text-slate-500 mt-1">
              Supports JPEG, PNG, WEBP (Max 15MB)
            </p>

            {/* Mobile & Desktop Action Buttons */}
            <div className="flex flex-wrap items-center justify-center gap-3 mt-5" onClick={(e) => e.stopPropagation()}>
              <button
                type="button"
                id="btn-open-live-camera"
                onClick={() => setIsLiveCameraOpen(true)}
                className="px-5 py-2.5 bg-[#163D2B] hover:bg-[#1E4E37] active:bg-[#0F2A1E] text-white rounded-xl text-xs font-semibold shadow-xs flex items-center gap-2 transition-all hover:shadow-md min-h-[44px] cursor-pointer border border-[#23583E]"
              >
                <Camera className="w-4 h-4 text-[#34D399]" />
                <span>Capture Live Image</span>
              </button>

              <button
                type="button"
                id="btn-browse-device"
                onClick={() => fileInputRef.current?.click()}
                className="px-4 py-2.5 bg-slate-800 hover:bg-slate-900 active:bg-black text-white rounded-xl text-xs font-semibold shadow-xs flex items-center gap-2 transition-colors min-h-[44px] cursor-pointer"
              >
                <UploadCloud className="w-4 h-4 text-slate-300" />
                <span>Upload From Device</span>
              </button>
            </div>

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => handleFiles(e.target.files)}
            />
            <input
              ref={cameraInputRef}
              type="file"
              accept="image/*"
              capture="environment"
              className="hidden"
              onChange={(e) => handleFiles(e.target.files)}
            />
          </div>
        ) : (
          /* Preview Mode */
          <div className="relative rounded-2xl overflow-hidden border border-slate-200 bg-slate-900 flex flex-col items-center">
            <img
              src={previewUrl}
              alt="Crop preview"
              className="max-h-96 w-full object-contain"
            />
            <div className="w-full bg-slate-900/90 backdrop-blur-xs p-4 flex items-center justify-between text-white text-xs">
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-[#34D399]" />
                <span>Image loaded successfully for <strong className="text-[#34D399]">{selectedCrop}</strong></span>
              </div>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setIsLiveCameraOpen(true)}
                  className="text-[#34D399] hover:underline text-xs flex items-center gap-1 cursor-pointer font-medium"
                >
                  <Camera className="w-3.5 h-3.5" />
                  <span>Retake Live</span>
                </button>
                <button
                  onClick={handleClearImage}
                  className="text-slate-300 hover:text-white underline text-xs cursor-pointer"
                >
                  Replace Image
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Error message */}
        {imageError && (
          <div className="p-3 bg-rose-50 border border-rose-200 text-rose-800 rounded-xl text-xs flex items-center gap-2">
            <span>⚠️</span>
            <span>{imageError}</span>
          </div>
        )}

        {/* Sample presets for 1-click test */}
        <div className="pt-2">
          <div className="flex items-center justify-between mb-2.5">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Or Try a Pre-Loaded Field Sample:
            </span>
            <span className="text-[11px] text-[#163D2B] font-medium">Click to test instant diagnostic</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {filteredPresets.map((preset) => (
              <button
                key={preset.label}
                type="button"
                onClick={() => handleSelectPreset(preset)}
                className="flex items-center gap-3 p-2.5 rounded-xl border border-[#E2E8DF] hover:border-[#163D2B]/40 bg-[#F3F5F2]/70 hover:bg-[#EAF0EB] text-left transition-all group cursor-pointer"
              >
                <img
                  src={preset.thumbnail}
                  alt={preset.label}
                  className="w-12 h-12 rounded-lg object-cover flex-shrink-0 group-hover:scale-105 transition-transform"
                />
                <div className="min-w-0">
                  <p className="text-xs font-semibold text-slate-800 group-hover:text-[#163D2B] truncate">
                    {preset.crop}: {preset.result.name}
                  </p>
                  <p className="text-[10px] text-slate-500 truncate">
                    {preset.result.severity} Threat
                  </p>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Submit Analyze Button */}
        <div className="pt-4 border-t border-[#E2E8DF] flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-xs text-slate-500 flex items-center gap-1.5">
            <HelpCircle className="w-3.5 h-3.5 text-slate-400" />
            <span>AI model runs inference against verified agronomy symptom taxonomies</span>
          </div>

          <button
            id="btn-analyze-crop"
            type="button"
            disabled={!previewUrl && !selectedFile}
            onClick={handleSubmit}
            className={`w-full sm:w-auto px-8 py-3.5 rounded-2xl font-bold text-sm flex items-center justify-center gap-2 shadow-md transition-all min-h-[48px] cursor-pointer ${
              previewUrl || selectedFile
                ? 'bg-[#163D2B] hover:bg-[#1E4E37] active:bg-[#0F2A1E] text-white shadow-[#163D2B]/20 hover:scale-[1.01]'
                : 'bg-slate-200 text-slate-400 cursor-not-allowed shadow-none'
            }`}
          >
            <Sparkles className="w-4 h-4 text-[#34D399]" />
            <span>Analyze {selectedCrop} {mode === 'pest' ? 'for Pests' : 'for Diseases'}</span>
          </button>
        </div>
      </div>

      {/* Field Photography Tips Card */}
      <div className="bg-[#EAF0EB] rounded-2xl p-5 border border-[#E2E8DF]">
        <h4 className="text-xs font-bold text-[#163D2B] uppercase tracking-wider mb-3 flex items-center gap-2">
          <Focus className="w-4 h-4 text-[#163D2B]" />
          <span>Field Photography Guidelines for Accurate Diagnostics</span>
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 text-xs text-slate-700">
          <div className="flex items-start gap-2.5">
            <div className="p-1.5 bg-white rounded-lg text-[#163D2B] border border-[#E2E8DF] mt-0.5">
              <Sun className="w-3.5 h-3.5" />
            </div>
            <div>
              <p className="font-semibold text-slate-800">Use Good Natural Light</p>
              <p className="text-[11px] text-slate-500">Capture in daylight without direct camera flash flare.</p>
            </div>
          </div>

          <div className="flex items-start gap-2.5">
            <div className="p-1.5 bg-white rounded-lg text-[#163D2B] border border-[#E2E8DF] mt-0.5">
              <Maximize2 className="w-3.5 h-3.5" />
            </div>
            <div>
              <p className="font-semibold text-slate-800">Close-Up of Symptoms</p>
              <p className="text-[11px] text-slate-500">Focus directly on spots, rings, frass, or pustules.</p>
            </div>
          </div>

          <div className="flex items-start gap-2.5">
            <div className="p-1.5 bg-white rounded-lg text-[#163D2B] border border-[#E2E8DF] mt-0.5">
              <Focus className="w-3.5 h-3.5" />
            </div>
            <div>
              <p className="font-semibold text-slate-800">Avoid Blurry Photos</p>
              <p className="text-[11px] text-slate-500">Hold steady; let camera autofocus on leaf veins.</p>
            </div>
          </div>

          <div className="flex items-start gap-2.5">
            <div className="p-1.5 bg-white rounded-lg text-[#163D2B] border border-[#E2E8DF] mt-0.5">
              <Check className="w-3.5 h-3.5" />
            </div>
            <div>
              <p className="font-semibold text-slate-800">Show Leaf & Stem Context</p>
              <p className="text-[11px] text-slate-500">Include margin between healthy & damaged tissue.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Live Camera Viewfinder Modal */}
      <LiveCameraModal
        isOpen={isLiveCameraOpen}
        onClose={() => setIsLiveCameraOpen(false)}
        onCapture={handleLiveCapture}
        selectedCrop={selectedCrop}
        onFallbackToFilePicker={() => fileInputRef.current?.click()}
      />
    </div>
  );
};
