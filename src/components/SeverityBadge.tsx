import React from 'react';
import { SeverityLevel } from '../types';
import { AlertCircle, AlertTriangle, CheckCircle, ShieldAlert } from 'lucide-react';

interface SeverityBadgeProps {
  severity: SeverityLevel;
  size?: 'sm' | 'md' | 'lg';
  showIcon?: boolean;
}

export const SeverityBadge: React.FC<SeverityBadgeProps> = ({
  severity,
  size = 'md',
  showIcon = true
}) => {
  const config = {
    Low: {
      bg: 'bg-emerald-50 text-emerald-700 border-emerald-200',
      dot: 'bg-emerald-500',
      icon: CheckCircle,
      label: 'Low Severity'
    },
    Moderate: {
      bg: 'bg-amber-50 text-amber-800 border-amber-200',
      dot: 'bg-amber-500',
      icon: AlertTriangle,
      label: 'Moderate Severity'
    },
    High: {
      bg: 'bg-orange-50 text-orange-800 border-orange-200',
      dot: 'bg-orange-500',
      icon: AlertCircle,
      label: 'High Severity'
    },
    Severe: {
      bg: 'bg-rose-50 text-rose-800 border-rose-200',
      dot: 'bg-rose-600',
      icon: ShieldAlert,
      label: 'Severe Threat'
    }
  }[severity] || {
    bg: 'bg-slate-50 text-slate-700 border-slate-200',
    dot: 'bg-slate-400',
    icon: AlertCircle,
    label: severity
  };

  const Icon = config.icon;

  const sizeClasses = {
    sm: 'text-xs px-2 py-0.5 gap-1.5',
    md: 'text-xs px-2.5 py-1 gap-1.5 font-medium',
    lg: 'text-sm px-3.5 py-1.5 gap-2 font-semibold'
  }[size];

  return (
    <span
      id={`severity-badge-${severity.toLowerCase()}`}
      className={`inline-flex items-center rounded-full border whitespace-nowrap ${config.bg} ${sizeClasses}`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${config.dot}`} />
      {showIcon && <Icon className="w-3.5 h-3.5 flex-shrink-0" />}
      <span>{config.label}</span>
    </span>
  );
};
