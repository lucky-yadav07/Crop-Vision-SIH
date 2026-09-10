import React from 'react';

interface ConfidenceScoreProps {
  score: number;
  size?: number;
  strokeWidth?: number;
  label?: string;
}

export const ConfidenceScore: React.FC<ConfidenceScoreProps> = ({
  score,
  size = 96,
  strokeWidth = 8,
  label = 'AI Confidence'
}) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  const getColor = (s: number) => {
    if (s >= 90) return 'text-emerald-500 stroke-emerald-500';
    if (s >= 75) return 'text-teal-500 stroke-teal-500';
    if (s >= 60) return 'text-amber-500 stroke-amber-500';
    return 'text-rose-500 stroke-rose-500';
  };

  return (
    <div id="confidence-score-container" className="flex flex-col items-center justify-center">
      <div className="relative inline-flex items-center justify-center">
        <svg
          width={size}
          height={size}
          className="transform -rotate-90"
        >
          {/* Background circle */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            strokeWidth={strokeWidth}
            className="stroke-slate-100 fill-none"
          />
          {/* Progress circle */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            className={`fill-none transition-all duration-1000 ease-out ${getColor(score)}`}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
          <span className="text-xl font-bold text-slate-800 tracking-tight">
            {score}%
          </span>
        </div>
      </div>
      {label && (
        <span className="mt-1.5 text-xs font-medium text-slate-500 uppercase tracking-wider">
          {label}
        </span>
      )}
    </div>
  );
};
