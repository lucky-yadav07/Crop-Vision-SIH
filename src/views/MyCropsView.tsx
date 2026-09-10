import React, { useState, useEffect } from 'react';
import { CropItem, CropType } from '../types';
import { AgroApiService } from '../services/agroApi';
import { SUPPORTED_CROPS } from '../data/mockData';
import { useToast } from '../components/Toast';
import {
  Sprout,
  Plus,
  Calendar,
  AlertTriangle,
  CheckCircle,
  ScanLine,
  ArrowRight,
  TrendingUp,
  Layers
} from 'lucide-react';

interface MyCropsViewProps {
  onScanCrop: (crop: CropType) => void;
}

export const MyCropsView: React.FC<MyCropsViewProps> = ({ onScanCrop }) => {
  const { showToast } = useToast();
  const [crops, setCrops] = useState<CropItem[]>([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedCropDetails, setSelectedCropDetails] = useState<CropItem | null>(null);

  // Add form fields
  const [newName, setNewName] = useState<CropType>('Sugarcane');
  const [newVariety, setNewVariety] = useState('Co 0238');
  const [newAcres, setNewAcres] = useState(3.0);
  const [newStage, setNewStage] = useState<CropItem['stage']>('Vegetative');

  useEffect(() => {
    async function loadCrops() {
      const data = await AgroApiService.getMyCrops();
      setCrops(data);
    }
    loadCrops();
  }, []);

  const handleAddCrop = async (e: React.FormEvent) => {
    e.preventDefault();
    const cropInfo = SUPPORTED_CROPS.find((c) => c.name === newName);
    const newCrop = await AgroApiService.addCrop({
      name: newName,
      variety: newVariety,
      acres: Number(newAcres),
      sowingDate: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      healthStatus: 'Healthy',
      currentRisk: 'Clean baseline scan recommended',
      lastScanDate: 'Today',
      imageUrl: cropInfo?.image || 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=600&q=80',
      stage: newStage
    });

    setCrops([newCrop, ...crops]);
    setShowAddModal(false);
    showToast('Crop Added', `${newName} plot added to farm monitoring.`, 'success');
  };

  return (
    <div id="my-crops-view" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E2E8DF] pb-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EAF0EB] text-[#163D2B] border border-[#163D2B]/15 text-xs font-semibold mb-2 shadow-xs">
            <Sprout className="w-3.5 h-3.5 text-[#163D2B]" />
            <span>Farm Acreage Management</span>
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            My Monitored Crops
          </h1>
          <p className="text-sm text-slate-600 mt-0.5">
            Real-time status tracking for Sugarcane, Maize, Mustard, Rice, and horticulture plots.
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="px-5 py-3 bg-[#163D2B] hover:bg-[#1E4E37] active:bg-[#0F2A1E] text-white rounded-xl text-sm font-bold flex items-center gap-2 shadow-xs transition-colors self-start sm:self-auto cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Crop Plot</span>
        </button>
      </div>

      {/* Crop Cards Grid (Prompt requirement: PAGE 9) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {crops.map((crop) => (
          <div
            key={crop.id}
            className="bg-white rounded-3xl border border-[#E2E8DF] overflow-hidden shadow-xs hover:shadow-sm transition-all flex flex-col justify-between group"
          >
            <div>
              {/* Crop Image */}
              <div className="h-44 relative overflow-hidden bg-slate-900">
                <img
                  src={crop.imageUrl}
                  alt={crop.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <span className="absolute top-3 left-3 px-3 py-1 bg-slate-900/80 backdrop-blur-xs text-white text-xs font-bold rounded-lg">
                  {crop.acres} Acres
                </span>
                <span className="absolute top-3 right-3 px-3 py-1 bg-white/90 backdrop-blur-xs text-slate-800 text-xs font-semibold rounded-lg">
                  {crop.stage} Stage
                </span>
              </div>

              {/* Details Content */}
              <div className="p-6 space-y-3">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-xl font-bold text-slate-900">
                      {crop.name}
                    </h3>
                    <p className="text-xs text-slate-500 font-medium">
                      Variety: {crop.variety}
                    </p>
                  </div>
                  <span
                    className={`text-xs px-2.5 py-1 rounded-full font-bold border ${
                      crop.healthStatus === 'Healthy'
                        ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                        : crop.healthStatus === 'Moderate Risk'
                        ? 'bg-amber-50 text-amber-800 border-amber-200'
                        : 'bg-rose-50 text-rose-800 border-rose-200'
                    }`}
                  >
                    Health: {crop.healthStatus}
                  </span>
                </div>

                {/* Risk & Last Scan Data */}
                <div className="bg-[#F3F5F2] p-3.5 rounded-2xl border border-[#E2E8DF] space-y-2 text-xs">
                  <div className="flex items-center justify-between text-slate-600">
                    <span className="font-semibold text-slate-700">Last Scanned:</span>
                    <span className="font-mono">{crop.lastScanDate}</span>
                  </div>
                  <div className="text-slate-700">
                    <span className="font-semibold block mb-0.5">Current Risk:</span>
                    <p className="text-slate-600 leading-snug">{crop.currentRisk}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="p-6 pt-0 flex gap-2.5">
              <button
                onClick={() => setSelectedCropDetails(crop)}
                className="flex-1 py-2.5 px-3 bg-[#EAF0EB] hover:bg-[#E2E8DF] text-slate-700 rounded-xl text-xs font-bold border border-[#E2E8DF] transition-colors cursor-pointer"
              >
                View Details
              </button>
              <button
                onClick={() => onScanCrop(crop.name)}
                className="flex-1 py-2.5 px-3 bg-[#163D2B] hover:bg-[#1E4E37] text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 shadow-xs transition-colors cursor-pointer"
              >
                <ScanLine className="w-3.5 h-3.5" />
                <span>Scan {crop.name}</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal: View Crop Details */}
      {selectedCropDetails && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 space-y-6 border border-[#E2E8DF] shadow-2xl animate-in zoom-in-95 duration-200">
            <div className="flex items-start justify-between border-b border-[#E2E8DF] pb-4">
              <div>
                <span className="text-xs font-bold text-[#163D2B] uppercase tracking-wider">
                  Plot Registry Details
                </span>
                <h3 className="text-2xl font-bold text-slate-900">
                  {selectedCropDetails.name} ({selectedCropDetails.variety})
                </h3>
              </div>
              <button
                onClick={() => setSelectedCropDetails(null)}
                className="text-slate-400 hover:text-slate-600 p-1 cursor-pointer"
              >
                ✕
              </button>
            </div>

            <img
              src={selectedCropDetails.imageUrl}
              alt={selectedCropDetails.name}
              className="w-full h-44 object-cover rounded-2xl border border-[#E2E8DF]"
            />

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-3 bg-[#F3F5F2] rounded-xl border border-[#E2E8DF]">
                <span className="text-slate-500 block">Cultivated Land</span>
                <span className="text-base font-bold text-slate-900">{selectedCropDetails.acres} Acres</span>
              </div>
              <div className="p-3 bg-[#F3F5F2] rounded-xl border border-[#E2E8DF]">
                <span className="text-slate-500 block">Phenological Stage</span>
                <span className="text-base font-bold text-slate-900">{selectedCropDetails.stage}</span>
              </div>
              <div className="p-3 bg-[#F3F5F2] rounded-xl border border-[#E2E8DF]">
                <span className="text-slate-500 block">Sowing / Planting Date</span>
                <span className="text-base font-bold text-slate-900">{selectedCropDetails.sowingDate}</span>
              </div>
              <div className="p-3 bg-[#F3F5F2] rounded-xl border border-[#E2E8DF]">
                <span className="text-slate-500 block">Health Rating</span>
                <span className="text-base font-bold text-[#163D2B]">{selectedCropDetails.healthStatus}</span>
              </div>
            </div>

            <div className="p-4 bg-amber-50 rounded-2xl border border-amber-200 text-xs text-amber-900 space-y-1">
              <p className="font-bold">Active Agronomic Monitoring:</p>
              <p>{selectedCropDetails.currentRisk}</p>
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <button
                onClick={() => setSelectedCropDetails(null)}
                className="px-4 py-2 bg-[#EAF0EB] hover:bg-[#E2E8DF] text-slate-700 rounded-xl text-xs font-semibold cursor-pointer"
              >
                Close
              </button>
              <button
                onClick={() => {
                  setSelectedCropDetails(null);
                  onScanCrop(selectedCropDetails.name);
                }}
                className="px-5 py-2 bg-[#163D2B] hover:bg-[#1E4E37] text-white rounded-xl text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-xs"
              >
                <ScanLine className="w-3.5 h-3.5" />
                <span>Run Diagnostic Now</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal: Add New Crop */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 space-y-5 border border-[#E2E8DF] shadow-2xl animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between border-b border-[#E2E8DF] pb-3">
              <h3 className="text-xl font-bold text-slate-900">Add Crop Plot</h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-slate-400 hover:text-slate-600 p-1 cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleAddCrop} className="space-y-4 text-xs sm:text-sm">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Crop Type</label>
                <select
                  value={newName}
                  onChange={(e) => setNewName(e.target.value as CropType)}
                  className="w-full px-3 py-2 bg-[#F3F5F2] border border-[#E2E8DF] rounded-xl text-slate-900 focus:outline-none focus:border-[#163D2B]"
                >
                  {SUPPORTED_CROPS.map((c) => (
                    <option key={c.name} value={c.name}>
                      {c.name} ({c.scientific})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Variety / Cultivar Name</label>
                <input
                  type="text"
                  required
                  value={newVariety}
                  onChange={(e) => setNewVariety(e.target.value)}
                  placeholder="e.g. Co 0238, PR 126, Pusa Bold"
                  className="w-full px-3 py-2 bg-[#F3F5F2] border border-[#E2E8DF] rounded-xl text-slate-900 focus:outline-none focus:border-[#163D2B]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Acreage (Acres)</label>
                  <input
                    type="number"
                    step="0.1"
                    min="0.5"
                    required
                    value={newAcres}
                    onChange={(e) => setNewAcres(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-[#F3F5F2] border border-[#E2E8DF] rounded-xl text-slate-900 focus:outline-none focus:border-[#163D2B]"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Growth Stage</label>
                  <select
                    value={newStage}
                    onChange={(e) => setNewStage(e.target.value as CropItem['stage'])}
                    className="w-full px-3 py-2 bg-[#F3F5F2] border border-[#E2E8DF] rounded-xl text-slate-900 focus:outline-none focus:border-[#163D2B]"
                  >
                    <option value="Germination">Germination</option>
                    <option value="Vegetative">Vegetative</option>
                    <option value="Flowering">Flowering</option>
                    <option value="Maturity">Maturity</option>
                    <option value="Harvesting">Harvesting</option>
                  </select>
                </div>
              </div>

              <div className="pt-3 flex justify-end gap-2 border-t border-[#E2E8DF]">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 bg-[#EAF0EB] text-slate-700 rounded-xl text-xs font-semibold hover:bg-[#E2E8DF] cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#163D2B] hover:bg-[#1E4E37] text-white rounded-xl text-xs font-bold cursor-pointer shadow-xs"
                >
                  Save Plot
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
