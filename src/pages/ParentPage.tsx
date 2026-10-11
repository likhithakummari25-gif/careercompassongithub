import {
  GraduationCap,
  HelpCircle,
  Lightbulb,
  Wallet,
  Scale,
  HeartHandshake,
  ClipboardCheck,
  ArrowRight,
} from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Disclaimer } from '@/components/ui/Disclaimer';
import * as LucideIcons from 'lucide-react';
import { parentSections } from '@/data/parentContent';
import type { PageId } from '@/types';

interface ParentPageProps {
  onNavigate: (page: PageId) => void;
}

const iconMap: Record<string, typeof HelpCircle> = {
  HelpCircle,
  Lightbulb,
  Wallet,
  Scale,
  HeartHandshake,
  ClipboardCheck,
};

export function ParentPage({ onNavigate }: ParentPageProps) {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in">
      <div className="text-center mb-10">
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-400/20 to-purple-500/20 flex items-center justify-center mx-auto mb-4">
          <GraduationCap className="w-8 h-8 text-cyan-300" />
        </div>
        <h1 className="text-3xl font-bold font-display mb-3">Parent Corner</h1>
        <p className="text-white/50 max-w-2xl mx-auto">
          Guidance for parents and families to support students in making informed career decisions \u2014
          together, without pressure.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {parentSections.map((section, idx) => {
          const Icon = iconMap[section.icon] || HelpCircle;
          return (
            <Card key={section.id} className="p-6 animate-fade-in-up" >
              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-400/20 to-purple-500/20 flex items-center justify-center shrink-0">
                  <Icon className="w-6 h-6 text-cyan-300" />
                </div>
                <div>
                  <h2 className="font-semibold text-lg mb-1">{section.title}</h2>
                  <p className="text-sm text-white/50">{section.description}</p>
                </div>
              </div>
              <ul className="space-y-2.5">
                {section.items.map((item, i) => (
                  <li key={i} className="text-sm text-white/60 flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400/50 shrink-0 mt-1.5" />
                    <span className="whitespace-pre-line">{item}</span>
                  </li>
                ))}
              </ul>
            </Card>
          );
        })}
      </div>

      {/* CTA */}
      <Card glow className="p-8 mt-8 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-card-glow" />
        <div className="relative">
          <h2 className="text-xl font-bold font-display mb-2">Explore Together</h2>
          <p className="text-white/50 text-sm mb-6 max-w-lg mx-auto">
            Use Career Compass tools with your child to make the career conversation productive and fun.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={() => onNavigate('assessment')}
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-400 to-purple-500 text-navy-950 font-semibold text-sm hover:scale-[1.02] transition-all flex items-center justify-center gap-2"
            >
              Start Assessment <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => onNavigate('compare')}
              className="px-6 py-3 rounded-xl bg-white/10 border border-white/20 text-white font-medium text-sm hover:bg-white/15 transition-all flex items-center justify-center gap-2"
            >
              Compare Careers <Scale className="w-4 h-4" />
            </button>
            <button
              onClick={() => onNavigate('courses')}
              className="px-6 py-3 rounded-xl bg-white/10 border border-white/20 text-white font-medium text-sm hover:bg-white/15 transition-all flex items-center justify-center gap-2"
            >
              Courses & Scholarships <Wallet className="w-4 h-4" />
            </button>
          </div>
        </div>
      </Card>

      <div className="mt-8">
        <Disclaimer />
      </div>
    </div>
  );
}
