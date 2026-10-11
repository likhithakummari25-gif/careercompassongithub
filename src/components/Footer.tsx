import { Compass, Heart } from 'lucide-react';
import type { PageId } from '@/types';

interface FooterProps {
  onNavigate: (page: PageId) => void;
}

export function Footer({ onNavigate }: FooterProps) {
  return (
    <footer className="mt-20 border-t border-white/10 glass">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-cyan-400 to-purple-500 flex items-center justify-center">
                <Compass className="w-5 h-5 text-navy-950" />
              </div>
              <span className="font-display font-bold text-lg">
                Career<span className="text-cyan-300">Compass</span>
              </span>
            </div>
            <p className="text-white/60 text-sm leading-relaxed max-w-md">
              Your Future, Your Choice. Helping students and parents discover suitable career paths
              based on interests, skills, and aspirations.
            </p>
            <p className="text-white/40 text-xs mt-4">
              Career Compass provides exploratory guidance, not a guaranteed career outcome. Discuss
              important decisions with qualified counselors and trusted adults.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-sm text-white/80 mb-3">Explore</h4>
            <div className="space-y-2">
              {[
                { id: 'assessment' as PageId, label: 'Take Assessment' },
                { id: 'recommendations' as PageId, label: 'Career Options' },
                { id: 'compare' as PageId, label: 'Compare Careers' },
                { id: 'roadmap' as PageId, label: 'Career Roadmap' },
              ].map((link) => (
                <button
                  key={link.id}
                  onClick={() => onNavigate(link.id)}
                  className="block text-sm text-white/50 hover:text-cyan-300 transition-colors"
                >
                  {link.label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-sm text-white/80 mb-3">Resources</h4>
            <div className="space-y-2">
              {[
                { id: 'parent' as PageId, label: 'Parent Corner' },
                { id: 'courses' as PageId, label: 'Courses & Scholarships' },
                { id: 'dashboard' as PageId, label: 'My Dashboard' },
                { id: 'profile' as PageId, label: 'Student Profile' },
              ].map((link) => (
                <button
                  key={link.id}
                  onClick={() => onNavigate(link.id)}
                  className="block text-sm text-white/50 hover:text-cyan-300 transition-colors"
                >
                  {link.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/40">
            Built for a college hackathon. Statistics shown are sample data unless otherwise verified.
          </p>
          <p className="text-xs text-white/40 flex items-center gap-1.5">
            Made with <Heart className="w-3 h-3 text-purple-400" /> for students
          </p>
        </div>
      </div>
    </footer>
  );
}
