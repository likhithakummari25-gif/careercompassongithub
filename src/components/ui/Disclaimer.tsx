import { AlertTriangle, X } from 'lucide-react';
import { useState } from 'react';

export function Disclaimer() {
  const [dismissed, setDismissed] = useState(false);
  if (dismissed) return null;

  return (
    <div className="glass border-amber-400/20 rounded-xl px-4 py-3 flex items-start gap-3">
      <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
      <p className="text-sm text-white/70 leading-relaxed flex-1">
        Career Compass provides exploratory guidance, not a guaranteed career outcome. Discuss important
        decisions with qualified counselors and trusted adults.
      </p>
      <button
        onClick={() => setDismissed(true)}
        className="p-1 rounded hover:bg-white/10 transition-colors shrink-0"
      >
        <X className="w-4 h-4 text-white/50" />
      </button>
    </div>
  );
}
