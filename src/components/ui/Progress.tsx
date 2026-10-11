interface ProgressProps {
  current: number;
  total: number;
  label?: string;
}

export function Progress({ current, total, label }: ProgressProps) {
  const percentage = total > 0 ? Math.round((current / total) * 100) : 0;

  return (
    <div className="w-full">
      {label && (
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-white/60">{label}</span>
          <span className="text-sm font-semibold text-cyan-300">{percentage}%</span>
        </div>
      )}
      <div className="h-2 bg-white/10 rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full transition-all duration-500 ease-out"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
