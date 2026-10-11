import { useState } from 'react';
import { Compass, Menu, X, LayoutDashboard, BookOpen, Home, User, ClipboardList, Lightbulb, GraduationCap, Scale, Map } from 'lucide-react';
import type { PageId } from '@/types';

interface NavbarProps {
  currentPage: PageId;
  onNavigate: (page: PageId) => void;
}

const navItems: { id: PageId; label: string; icon: typeof Home }[] = [
  { id: 'home', label: 'Home', icon: Home },
  { id: 'profile', label: 'Profile', icon: User },
  { id: 'assessment', label: 'Assessment', icon: ClipboardList },
  { id: 'recommendations', label: 'Careers', icon: Lightbulb },
  { id: 'compare', label: 'Compare', icon: Scale },
  { id: 'parent', label: 'Parent Corner', icon: GraduationCap },
  { id: 'courses', label: 'Resources', icon: BookOpen },
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
];

export function Navbar({ currentPage, onNavigate }: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleNav = (page: PageId) => {
    onNavigate(page);
    setMobileOpen(false);
  };

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-40 glass border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <button
              onClick={() => handleNav('home')}
              className="flex items-center gap-2 group"
            >
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-cyan-400 to-purple-500 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Compass className="w-5 h-5 text-navy-950" />
              </div>
              <span className="font-display font-bold text-lg tracking-tight">
                Career<span className="text-cyan-300">Compass</span>
              </span>
            </button>

            <div className="hidden lg:flex items-center gap-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const active = currentPage === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleNav(item.id)}
                    className={`px-3 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-1.5 ${
                      active
                        ? 'bg-white/10 text-cyan-300'
                        : 'text-white/60 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    {item.label}
                  </button>
                );
              })}
            </div>

            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden p-2 rounded-lg hover:bg-white/10 transition-colors"
            >
              {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {mobileOpen && (
          <div className="lg:hidden border-t border-white/10 glass animate-fade-in">
            <div className="px-4 py-3 space-y-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const active = currentPage === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleNav(item.id)}
                    className={`w-full px-4 py-3 rounded-lg text-sm font-medium transition-all flex items-center gap-3 ${
                      active
                        ? 'bg-white/10 text-cyan-300'
                        : 'text-white/60 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    {item.label}
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </nav>
      <div className="h-16" />
    </>
  );
}
