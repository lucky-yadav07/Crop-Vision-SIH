import React, { useState, useEffect, useRef } from 'react';
import {
  Camera,
  SwitchCamera,
  X,
  RefreshCw,
  Check,
  Zap,
  ZapOff,
  AlertTriangle,
  Grid,
  UploadCloud,
  Focus
} from 'lucide-react';
import { CropType } from '../types';

interface LiveCameraModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCapture: (file: File) => void;
  selectedCrop: CropType;
  onFallbackToFilePicker?: () => void;
}

export const LiveCameraModal: React.FC<LiveCameraModalProps> = ({
  isOpen,
  onClose,
  onCapture,
  selectedCrop,
  onFallbackToFilePicker,
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [stream, setStream] = useState<MediaStream | null>(null);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [facingMode, setFacingMode] = useState<'environment' | 'user'>('environment');
  const [capturedBlobUrl, setCapturedBlobUrl] = useState<string | null>(null);
  const [capturedFile, setCapturedFile] = useState<File | null>(null);
  const [isFlashing, setIsFlashing] = useState(false);
  const [showGrid, setShowGrid] = useState(true);
  const [hasTorch, setHasTorch] = useState(false);
  const [isTorchOn, setIsTorchOn] = useState(false);
  const [isStartingCamera, setIsStartingCamera] = useState(false);

  // Stop current active stream tracks
  const stopStream = () => {
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
      setStream(null);
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
  };

  // Start video stream with facing mode
  const startCamera = async (mode: 'environment' | 'user') => {
    stopStream();
    setCameraError(null);
    setIsStartingCamera(true);

    try {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        throw new Error('Camera streaming API is not supported in this browser environment.');
      }

      const constraints: MediaStreamConstraints = {
        video: {
          facingMode: { ideal: mode },
          width: { ideal: 1920 },
          height: { ideal: 1080 },
        },
        audio: false,
      };

      const newStream = await navigator.mediaDevices.getUserMedia(constraints);
      setStream(newStream);

      if (videoRef.current) {
        videoRef.current.srcObject = newStream;
        await videoRef.current.play().catch((e) => console.warn('Video play warning:', e));
      }

      // Check if torch/flashlight is supported
      const videoTrack = newStream.getVideoTracks()[0];
      if (videoTrack) {
        const capabilities = (videoTrack.getCapabilities ? videoTrack.getCapabilities() : {}) as any;
        setHasTorch(Boolean(capabilities.torch));
      }
      setIsStartingCamera(false);
    } catch (err: any) {
      console.error('Camera access error:', err);
      setIsStartingCamera(false);
      let message = 'Unable to access camera. Please verify camera permissions in your browser.';
      if (err.name === 'NotAllowedError' || err.name === 'PermissionDeniedError') {
        message = 'Camera permission denied. Please allow camera access in your browser address bar.';
      } else if (err.name === 'NotFoundError' || err.name === 'DevicesNotFoundError') {
        message = 'No video camera found on this device. You can upload an image file instead.';
      } else if (err.name === 'NotReadableError' || err.name === 'TrackStartError') {
        message = 'Camera is in use by another application. Please close other camera tabs and retry.';
      }
      setCameraError(message);
    }
  };

  // Toggle torch/flashlight
  const toggleTorch = async () => {
    if (!stream) return;
    const track = stream.getVideoTracks()[0];
    if (!track) return;

    try {
      const nextState = !isTorchOn;
      await (track as any).applyConstraints({
        advanced: [{ torch: nextState }],
      });
      setIsTorchOn(nextState);
    } catch (e) {
      console.warn('Torch toggle not supported:', e);
    }
  };

  // Toggle front/back camera
  const toggleFacingMode = () => {
    const nextMode = facingMode === 'environment' ? 'user' : 'environment';
    setFacingMode(nextMode);
    startCamera(nextMode);
  };

  // Capture frame from video feed
  const takePhoto = () => {
    if (!videoRef.current) return;
    const video = videoRef.current;

    const canvas = canvasRef.current || document.createElement('canvas');
    const width = video.videoWidth || 1280;
    const height = video.videoHeight || 720;
    canvas.width = width;
    canvas.height = height;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Trigger visual shutter flash
    setIsFlashing(true);
    setTimeout(() => setIsFlashing(false), 150);

    // If front camera, flip horizontally for natural mirror capture
    if (facingMode === 'user') {
      ctx.translate(width, 0);
      ctx.scale(-1, 1);
    }
    ctx.drawImage(video, 0, 0, width, height);

    canvas.toBlob(
      (blob) => {
        if (blob) {
          const file = new File([blob], `live_capture_${selectedCrop.toLowerCase()}_${Date.now()}.jpg`, {
            type: 'image/jpeg',
          });
          const url = URL.createObjectURL(blob);
          setCapturedBlobUrl(url);
          setCapturedFile(file);
          // Pause camera stream while reviewing
          stopStream();
        }
      },
      'image/jpeg',
      0.92
    );
  };

  // Retake photo
  const handleRetake = () => {
    if (capturedBlobUrl) {
      URL.revokeObjectURL(capturedBlobUrl);
    }
    setCapturedBlobUrl(null);
    setCapturedFile(null);
    startCamera(facingMode);
  };

  // Confirm photo and send to analysis
  const handleConfirm = () => {
    if (capturedFile) {
      onCapture(capturedFile);
      handleClose();
    }
  };

  const handleClose = () => {
    stopStream();
    if (capturedBlobUrl) {
      URL.revokeObjectURL(capturedBlobUrl);
    }
    setCapturedBlobUrl(null);
    setCapturedFile(null);
    setCameraError(null);
    onClose();
  };

  // Lifecycle when modal opens/closes
  useEffect(() => {
    if (isOpen && !capturedBlobUrl) {
      startCamera(facingMode);
    } else if (!isOpen) {
      stopStream();
    }
    return () => {
      stopStream();
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      id="live-camera-modal"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/85 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
    >
      <div className="relative w-full max-w-2xl bg-slate-950 rounded-3xl overflow-hidden border border-slate-800 shadow-2xl flex flex-col max-h-[95vh]">
        {/* Header Bar */}
        <div className="flex items-center justify-between px-5 py-3.5 bg-slate-900 border-b border-slate-800 text-white z-20">
          <div className="flex items-center gap-2.5">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
            <div>
              <h3 className="text-sm font-bold tracking-tight">Live Field Camera</h3>
              <p className="text-[11px] text-slate-400">
                Targeting: <strong className="text-emerald-400 font-semibold">{selectedCrop}</strong>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {!capturedBlobUrl && (
              <>
                {hasTorch && (
                  <button
                    type="button"
                    onClick={toggleTorch}
                    title="Toggle Flashlight"
                    className={`p-2 rounded-xl border text-xs cursor-pointer transition-colors ${
                      isTorchOn
                        ? 'bg-amber-400 text-slate-900 border-amber-300'
                        : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700'
                    }`}
                  >
                    {isTorchOn ? <Zap className="w-4 h-4 fill-current" /> : <ZapOff className="w-4 h-4" />}
                  </button>
                )}

                <button
                  type="button"
                  onClick={() => setShowGrid(!showGrid)}
                  title="Toggle Framing Grid"
                  className={`p-2 rounded-xl border text-xs cursor-pointer transition-colors ${
                    showGrid
                      ? 'bg-emerald-900/60 text-emerald-300 border-emerald-700'
                      : 'bg-slate-800 text-slate-400 border-slate-700 hover:bg-slate-700'
                  }`}
                >
                  <Grid className="w-4 h-4" />
                </button>

                <button
                  type="button"
                  onClick={toggleFacingMode}
                  title="Switch Camera (Front/Back)"
                  className="p-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl border border-slate-700 text-xs cursor-pointer transition-colors"
                >
                  <SwitchCamera className="w-4 h-4" />
                </button>
              </>
            )}

            <button
              type="button"
              id="btn-close-live-camera"
              onClick={handleClose}
              className="p-2 bg-slate-800 hover:bg-rose-900/40 text-slate-300 hover:text-rose-300 rounded-xl border border-slate-700 text-xs cursor-pointer transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Viewfinder Viewport */}
        <div className="relative flex-1 bg-black flex items-center justify-center min-h-[360px] sm:min-h-[460px] overflow-hidden">
          {/* Shutter flash animation overlay */}
          <div
            className={`absolute inset-0 bg-white pointer-events-none z-30 transition-opacity duration-150 ${
              isFlashing ? 'opacity-100' : 'opacity-0'
            }`}
          />

          {/* Camera Error Message */}
          {cameraError ? (
            <div className="p-6 text-center max-w-md text-white space-y-4 z-20">
              <div className="w-14 h-14 rounded-2xl bg-amber-500/10 text-amber-400 border border-amber-500/20 flex items-center justify-center mx-auto">
                <AlertTriangle className="w-7 h-7" />
              </div>
              <h4 className="text-base font-bold text-amber-300">Camera Unavailable</h4>
              <p className="text-xs text-slate-300 leading-relaxed">{cameraError}</p>

              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
                <button
                  type="button"
                  onClick={() => startCamera(facingMode)}
                  className="w-full sm:w-auto px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-xs font-semibold flex items-center justify-center gap-2 cursor-pointer border border-slate-700"
                >
                  <RefreshCw className="w-4 h-4" />
                  <span>Try Again</span>
                </button>

                {onFallbackToFilePicker && (
                  <button
                    type="button"
                    onClick={() => {
                      handleClose();
                      onFallbackToFilePicker();
                    }}
                    className="w-full sm:w-auto px-4 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-semibold flex items-center justify-center gap-2 cursor-pointer shadow-sm"
                  >
                    <UploadCloud className="w-4 h-4" />
                    <span>Upload Image File</span>
                  </button>
                )}
              </div>
            </div>
          ) : capturedBlobUrl ? (
            /* Snapshot Review Mode */
            <div className="relative w-full h-full flex items-center justify-center bg-slate-950">
              <img
                src={capturedBlobUrl}
                alt="Captured plant snapshot"
                className="max-h-[500px] w-full object-contain"
              />
              <div className="absolute top-4 left-4 bg-emerald-500/90 text-white text-[11px] font-bold px-3 py-1 rounded-full shadow-md backdrop-blur-xs flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5" />
                <span>Captured Snapshot</span>
              </div>
            </div>
          ) : (
            /* Live Camera Stream */
            <>
              {isStartingCamera && (
                <div className="absolute inset-0 z-20 bg-slate-950 flex flex-col items-center justify-center text-white gap-3">
                  <RefreshCw className="w-6 h-6 text-emerald-400 animate-spin" />
                  <p className="text-xs text-slate-400">Initializing camera sensor...</p>
                </div>
              )}

              <video
                ref={videoRef}
                playsInline
                autoPlay
                muted
                className={`w-full h-full object-cover sm:object-contain ${
                  facingMode === 'user' ? 'scale-x-[-1]' : ''
                }`}
              />

              {/* 3x3 Composition Grid */}
              {showGrid && (
                <div className="absolute inset-0 pointer-events-none grid grid-cols-3 grid-rows-3 z-10 opacity-30">
                  <div className="border-r border-b border-white/60" />
                  <div className="border-r border-b border-white/60" />
                  <div className="border-b border-white/60" />
                  <div className="border-r border-b border-white/60" />
                  <div className="border-r border-b border-white/60" />
                  <div className="border-b border-white/60" />
                  <div className="border-r border-white/60" />
                  <div className="border-r border-white/60" />
                  <div />
                </div>
              )}

              {/* High-Tech Agronomic Targeting Reticle Overlay */}
              <div className="absolute inset-8 sm:inset-12 pointer-events-none z-10 flex flex-col items-center justify-between border-2 border-dashed border-emerald-400/40 rounded-3xl p-4">
                {/* Top targeting corners */}
                <div className="w-full flex justify-between">
                  <div className="w-6 h-6 border-t-4 border-l-4 border-emerald-400 rounded-tl-lg" />
                  <div className="w-6 h-6 border-t-4 border-r-4 border-emerald-400 rounded-tr-lg" />
                </div>

                {/* Center focus indicator */}
                <div className="flex flex-col items-center gap-1.5 bg-black/40 px-3 py-1.5 rounded-full backdrop-blur-xs border border-white/10">
                  <Focus className="w-5 h-5 text-emerald-400 animate-pulse" />
                  <span className="text-[10px] font-medium text-emerald-300 tracking-wide">
                    Frame affected leaf in center
                  </span>
                </div>

                {/* Bottom targeting corners */}
                <div className="w-full flex justify-between">
                  <div className="w-6 h-6 border-b-4 border-l-4 border-emerald-400 rounded-bl-lg" />
                  <div className="w-6 h-6 border-b-4 border-r-4 border-emerald-400 rounded-br-lg" />
                </div>
              </div>
            </>
          )}

          {/* Hidden canvas for capturing bitmap */}
          <canvas ref={canvasRef} className="hidden" />
        </div>

        {/* Bottom Action Controls */}
        <div className="p-4 sm:p-5 bg-slate-900 border-t border-slate-800 z-20">
          {capturedBlobUrl ? (
            /* Review Controls */
            <div className="flex items-center justify-between gap-4">
              <button
                type="button"
                id="btn-retake-photo"
                onClick={handleRetake}
                className="flex-1 py-3 px-4 bg-slate-800 hover:bg-slate-700 active:bg-slate-900 text-white rounded-2xl text-xs font-bold transition-colors flex items-center justify-center gap-2 cursor-pointer border border-slate-700 min-h-[48px]"
              >
                <RefreshCw className="w-4 h-4" />
                <span>Retake Photo</span>
              </button>

              <button
                type="button"
                id="btn-confirm-live-photo"
                onClick={handleConfirm}
                className="flex-1 py-3 px-4 bg-emerald-600 hover:bg-emerald-500 active:bg-emerald-700 text-white rounded-2xl text-xs font-bold transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer min-h-[48px]"
              >
                <Check className="w-4 h-4" />
                <span>Confirm & Analyze</span>
              </button>
            </div>
          ) : !cameraError ? (
            /* Live Shutter Control */
            <div className="flex items-center justify-center">
              <button
                type="button"
                id="btn-trigger-shutter"
                onClick={takePhoto}
                disabled={isStartingCamera}
                className="group relative flex items-center justify-center w-18 h-18 rounded-full border-4 border-white/80 hover:border-emerald-400 p-1 cursor-pointer transition-all active:scale-95 disabled:opacity-50"
                title="Capture Photo"
              >
                <div className="w-full h-full rounded-full bg-white group-hover:bg-emerald-400 transition-colors flex items-center justify-center shadow-lg">
                  <Camera className="w-6 h-6 text-slate-900 group-hover:text-white transition-colors" />
                </div>
              </button>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};
