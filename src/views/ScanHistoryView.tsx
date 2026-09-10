import React, { useState, useEffect } from 'react';
import { ScanRecord, CropType, SeverityLevel } from '../types';
import { AgroApiService } from '../services/agroApi';
import { SeverityBadge } from '../components/SeverityBadge';
import {
  Calendar,
  Search,
  Filter,
  Download,
  FileText,
  Trash2,
  Sparkles,
  Printer,
  ChevronRight,
  Eye
} from 'lucide-react';
import { useToast } from '../components/Toast';
import { useAuth } from '../context/AuthContext';

export const ScanHistoryView: React.FC = () => {
  const { showToast } = useToast();
  const { currentUser, isAdmin } = useAuth();
  const [scans, setScans] = useState<ScanRecord[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCropFilter, setSelectedCropFilter] = useState<string>('All');
  const [selectedSeverityFilter, setSelectedSeverityFilter] = useState<string>('All');
  const [activeReport, setActiveReport] = useState<ScanRecord | null>(null);

  useEffect(() => {
    async function loadScans() {
      // Data Isolation: Admin sees all scans across farms; Farmers only see their own diagnostic records
      const targetUserId = isAdmin ? undefined : currentUser?.id;
      const data = await AgroApiService.getScanHistory(targetUserId);
      setScans(data);
    }
    loadScans();
  }, [currentUser, isAdmin]);

  const filteredScans = scans.filter((scan) => {
    const matchesSearch =
      scan.detectionName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      scan.crop.toLowerCase().includes(searchQuery.toLowerCase()) ||
      scan.recommendationSummary.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCrop = selectedCropFilter === 'All' || scan.crop === selectedCropFilter;
    const matchesSeverity = selectedSeverityFilter === 'All' || scan.severity === selectedSeverityFilter;
    return matchesSearch && matchesCrop && matchesSeverity;
  });

  const handleExportCsv = () => {
    const headers = ['Date,Crop,Type,Detection,Confidence,Severity,Recommendation\n'];
    const rows = filteredScans.map(
      (s) =>
        `"${s.date}","${s.crop}","${s.type}","${s.detectionName}",${s.confidence}%,"${s.severity}","${s.recommendationSummary.replace(/"/g, '""')}"\n`
    );
    const blob = new Blob([headers.concat(rows).join('')], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `agroguard_scan_history_${Date.now()}.csv`;
    a.click();
    showToast('Report Exported', 'CSV file downloaded successfully.', 'success');
  };

  return (
    <div id="scan-history-view" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E2E8DF] pb-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EAF0EB] text-[#163D2B] border border-[#163D2B]/15 text-xs font-semibold mb-2 shadow-xs">
            <Calendar className="w-3.5 h-3.5 text-[#163D2B]" />
            <span>Pathology Diagnostic Log</span>
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            Scan History & Diagnostics Log
          </h1>
          <p className="text-sm text-slate-600 mt-0.5">
            Audit trail of verified AI scans, confidence levels, and recommended treatments.
          </p>
        </div>

        <button
          onClick={handleExportCsv}
          className="px-5 py-2.5 bg-[#EAF0EB] hover:bg-[#E2E8DF] text-slate-800 border border-[#E2E8DF] rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-colors self-start sm:self-auto cursor-pointer"
        >
          <Download className="w-4 h-4 text-slate-600" />
          <span>Export History (CSV)</span>
        </button>
      </div>

      {/* Search & Filter Controls */}
      <div className="bg-white rounded-2xl p-4 sm:p-5 border border-[#E2E8DF] shadow-xs grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
          <input
            type="text"
            placeholder="Search symptoms, crop, disease..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-3 py-2 bg-[#F3F5F2] border border-[#E2E8DF] rounded-xl text-xs sm:text-sm focus:outline-none focus:border-[#163D2B] text-slate-900"
          />
        </div>

        <div>
          <select
            value={selectedCropFilter}
            onChange={(e) => setSelectedCropFilter(e.target.value)}
            className="w-full px-3 py-2 bg-[#F3F5F2] border border-[#E2E8DF] rounded-xl text-xs sm:text-sm focus:outline-none focus:border-[#163D2B] text-slate-700"
          >
            <option value="All">All Crops</option>
            <option value="Sugarcane">Sugarcane</option>
            <option value="Rice">Rice</option>
            <option value="Maize">Maize</option>
            <option value="Mustard">Mustard</option>
            <option value="Tomato">Tomato</option>
            <option value="Potato">Potato</option>
            <option value="Chili">Chili</option>
          </select>
        </div>

        <div>
          <select
            value={selectedSeverityFilter}
            onChange={(e) => setSelectedSeverityFilter(e.target.value)}
            className="w-full px-3 py-2 bg-[#F3F5F2] border border-[#E2E8DF] rounded-xl text-xs sm:text-sm focus:outline-none focus:border-[#163D2B] text-slate-700"
          >
            <option value="All">All Threat Levels</option>
            <option value="Low">Low Threat</option>
            <option value="Moderate">Moderate Threat</option>
            <option value="High">High Threat</option>
            <option value="Severe">Severe Threat</option>
          </select>
        </div>
      </div>

      {/* Main Table (Prompt requirement: Columns - Date, Crop, Image, Detection, Confidence, Severity, Recommendation) */}
      <div className="bg-white rounded-3xl border border-[#E2E8DF] shadow-xs overflow-hidden">
        {filteredScans.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs sm:text-sm">
              <thead>
                <tr className="border-b border-[#E2E8DF] bg-[#F3F5F2] text-slate-700 text-xs font-semibold uppercase tracking-wider">
                  <th className="py-3.5 px-4">Date</th>
                  <th className="py-3.5 px-4">Crop</th>
                  <th className="py-3.5 px-4">Image</th>
                  <th className="py-3.5 px-4">Detection</th>
                  <th className="py-3.5 px-4">Confidence</th>
                  <th className="py-3.5 px-4">Severity</th>
                  <th className="py-3.5 px-4">Recommendation</th>
                  <th className="py-3.5 px-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E2E8DF]/60">
                {filteredScans.map((scan) => (
                  <tr key={scan.id} className="hover:bg-[#F3F5F2]/60 transition-colors">
                    <td className="py-4 px-4 text-slate-500 whitespace-nowrap font-mono text-xs">
                      {scan.date}
                    </td>
                    <td className="py-4 px-4 font-bold text-slate-900">
                      {scan.crop}
                    </td>
                    <td className="py-4 px-4">
                      <img
                        src={scan.imageUrl}
                        alt={scan.crop}
                        className="w-12 h-12 rounded-xl object-cover border border-[#E2E8DF] shadow-xs"
                      />
                    </td>
                    <td className="py-4 px-4 font-semibold text-slate-800">
                      <div>{scan.detectionName}</div>
                      <span className="text-[10px] text-slate-400 uppercase font-mono">
                        {scan.type}
                      </span>
                    </td>
                    <td className="py-4 px-4 font-mono font-bold text-[#163D2B]">
                      {scan.confidence}%
                    </td>
                    <td className="py-4 px-4">
                      <SeverityBadge severity={scan.severity} size="sm" />
                    </td>
                    <td className="py-4 px-4 text-slate-600 max-w-xs line-clamp-2">
                      {scan.recommendationSummary}
                    </td>
                    <td className="py-4 px-4 text-right whitespace-nowrap">
                      <button
                        onClick={() => setActiveReport(scan)}
                        className="px-3 py-1.5 bg-[#EAF0EB] hover:bg-[#E2E8DF] text-[#163D2B] font-bold rounded-lg text-xs transition-colors inline-flex items-center gap-1 cursor-pointer"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>View Report</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          /* Empty State */
          <div className="text-center py-16 px-4 space-y-3">
            <div className="w-14 h-14 rounded-2xl bg-[#F3F5F2] text-slate-400 flex items-center justify-center mx-auto border border-[#E2E8DF]">
              <Calendar className="w-7 h-7" />
            </div>
            <h3 className="text-lg font-bold text-slate-800">No Scans Found</h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              No previous diagnostics match your active search or filter parameters.
            </p>
          </div>
        )}
      </div>

      {/* Modal: View Report Dialog */}
      {activeReport && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 space-y-6 border border-[#E2E8DF] shadow-2xl animate-in zoom-in-95 duration-200">
            <div className="flex items-start justify-between border-b border-[#E2E8DF] pb-4">
              <div>
                <span className="text-xs font-mono text-[#163D2B] uppercase font-bold">
                  Diagnostic Report #{activeReport.id.toUpperCase()}
                </span>
                <h3 className="text-xl font-bold text-slate-900">
                  {activeReport.detectionName}
                </h3>
              </div>
              <button
                onClick={() => setActiveReport(null)}
                className="text-slate-400 hover:text-slate-600 p-1 cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="flex gap-4 items-center">
              <img
                src={activeReport.imageUrl}
                alt={activeReport.crop}
                className="w-24 h-24 rounded-2xl object-cover border border-[#E2E8DF]"
              />
              <div className="space-y-1 text-xs">
                <p className="text-slate-500 font-medium">Crop: <strong className="text-slate-800">{activeReport.crop}</strong></p>
                <p className="text-slate-500 font-medium">Model Match: <strong className="text-[#163D2B] font-mono">{activeReport.confidence}%</strong></p>
                <div className="pt-1">
                  <SeverityBadge severity={activeReport.severity} size="sm" />
                </div>
              </div>
            </div>

            <div className="space-y-3 text-xs sm:text-sm text-slate-700">
              <div className="bg-[#F3F5F2] p-4 rounded-2xl border border-[#E2E8DF]">
                <p className="font-bold text-slate-900 mb-1">Prescribed Action Summary:</p>
                <p className="text-slate-600 leading-relaxed">
                  {activeReport.recommendationSummary}
                </p>
              </div>

              {activeReport.symptoms && (
                <div>
                  <p className="font-bold text-slate-900 mb-1">Identified Symptoms:</p>
                  <ul className="list-disc pl-5 space-y-0.5 text-xs text-slate-600">
                    {activeReport.symptoms.map((s, idx) => (
                      <li key={idx}>{s}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            <div className="pt-2 flex justify-end gap-3 border-t border-[#E2E8DF]">
              <button
                onClick={() => setActiveReport(null)}
                className="px-4 py-2 bg-[#EAF0EB] hover:bg-[#E2E8DF] text-slate-700 rounded-xl text-xs font-semibold cursor-pointer"
              >
                Close Report
              </button>
              <button
                onClick={() => {
                  window.print();
                  showToast('Print Prepared', 'Printing diagnostic record...', 'info');
                }}
                className="px-4 py-2 bg-[#163D2B] hover:bg-[#1E4E37] text-white rounded-xl text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-xs"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Print Record</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
