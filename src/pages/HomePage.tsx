import {
  Compass,
  Rocket,
  ClipboardList,
  Lightbulb,
  Scale,
  Map,
  Users,
  ArrowRight,
  Sparkles,
  TrendingUp,
  Target,
  BookOpen,
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Disclaimer } from '@/components/ui/Disclaimer';
import type { PageId } from '@/types';

interface HomePageProps {
  onNavigate: (page: PageId) => void;
}

const stats = [
  { value: '12+', label: 'Career Paths', icon: Compass },
  { value: '7', label: 'Assessment Areas', icon: Target },
  { value: '100%', label: 'Free to Use', icon: Sparkles },
  { value: 'Sample', label: 'Data shown', icon: TrendingUp },
];

const howItWorks = [
  {
    icon: Users,
    title: '1. Build Your Profile',
    description: 'Tell us about your education, favorite subjects, interests, and goals. Skip what you don\u2019t want to share.',
    page: 'profile' as PageId,
  },
  {
    icon: ClipboardList,
    title: '2. Take the Assessment',
    description: 'Answer questions about problem-solving, creativity, science, technology, and more. Multi-select where relevant.',
    page: 'assessment' as PageId,
  },
  {
    icon: Lightbulb,
    title: '3. Get Recommendations',
    description: 'Our matching engine suggests 3\u20135 careers with transparent match scores and detailed reasoning.',
    page: 'recommendations' as PageId,
  },
  {
    icon: Map,
    title: '4. Explore & Plan',
    description: 'Compare careers, view roadmaps, explore courses, and track your progress \u2014 all in one place.',
    page: 'compare' as PageId,
  },
];

const features = [
  { icon: Scale, title: 'Compare Careers', description: 'Side-by-side comparison of qualifications, costs, and work activities' },
  { icon: Map, title: 'Career Roadmaps', description: 'Step-by-step plans adapted to your education level' },
  { icon: Users, title: 'Parent Corner', description: 'Guidance for families to discuss careers together' },
  { icon: BookOpen, title: 'Courses & Scholarships', description: 'Verified resources with clear links to official portals' },
];

export function HomePage({ onNavigate }: HomePageProps) {
  return (
    <div className="animate-fade-in">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-hero-glow" />
        <div className="absolute top-20 left-10 w-72 h-72 bg-cyan-500/10 rounded-full blur-3xl animate-pulse-glow" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse-glow" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-24">
          <div className="text-center max-w-4xl mx-auto">
            <Badge variant="cyan" icon={<Sparkles className="w-3 h-3" />} className="mb-6 animate-fade-in-up">
              Your Future, Your Choice
            </Badge>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-display tracking-tight text-balance mb-6 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
              Discover Your Strengths.
              <br />
              <span className="gradient-text">Explore Your Future.</span>
            </h1>
            <p className="text-lg sm:text-xl text-white/60 mb-4 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              Your journey to the right career starts here.
            </p>
            <p className="text-base text-white/40 max-w-2xl mx-auto mb-10 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
              Career Compass helps students and parents discover suitable career paths based on
              interests, skills, favorite subjects, and goals \u2014 together.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
              <Button
                size="lg"
                icon={Rocket}
                onClick={() => onNavigate('assessment')}
              >
                Get Started
              </Button>
              <Button
                size="lg"
                variant="secondary"
                icon={Compass}
                onClick={() => onNavigate('recommendations')}
              >
                Explore Careers
              </Button>
            </div>
          </div>

          {/* Floating compass illustration */}
          <div className="relative mt-16 flex justify-center">
            <div className="relative w-48 h-48 sm:w-64 sm:h-64 animate-float">
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-cyan-400/20 to-purple-500/20 blur-2xl" />
              <div className="absolute inset-0 rounded-full border-2 border-white/10 animate-spin-slow" />
              <div className="absolute inset-4 rounded-full border border-white/5" />
              <div className="absolute inset-0 flex items-center justify-center">
                <Compass className="w-20 h-20 sm:w-28 sm:h-28 text-cyan-300" />
              </div>
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2 h-2 bg-cyan-400 rounded-full" />
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-2 h-2 bg-purple-400 rounded-full" />
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <Card key={i} className="p-6 text-center animate-fade-in-up" >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-400/20 to-purple-500/20 flex items-center justify-center mx-auto mb-3">
                  <Icon className="w-6 h-6 text-cyan-300" />
                </div>
                <div className="text-2xl font-bold font-display gradient-text">{stat.value}</div>
                <div className="text-sm text-white/50 mt-1">{stat.label}</div>
              </Card>
            );
          })}
        </div>
        <p className="text-center text-xs text-white/30 mt-4">
          Statistics shown are sample data for demonstration purposes and not verified research figures.
        </p>
      </section>

      {/* How It Works */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold font-display mb-4">How Career Compass Works</h2>
          <p className="text-white/50 max-w-2xl mx-auto">
            Four simple steps from self-discovery to a personalized career roadmap.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {howItWorks.map((step, i) => {
            const Icon = step.icon;
            return (
              <Card
                key={i}
                hover
                className="p-6 animate-fade-in-up"
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-400/20 to-purple-500/20 flex items-center justify-center mb-4">
                  <Icon className="w-6 h-6 text-cyan-300" />
                </div>
                <h3 className="font-semibold text-lg mb-2">{step.title}</h3>
                <p className="text-sm text-white/50 leading-relaxed mb-4">{step.description}</p>
                <button
                  onClick={() => onNavigate(step.page)}
                  className="text-sm text-cyan-300 hover:text-cyan-200 flex items-center gap-1 transition-colors"
                >
                  Get started <ArrowRight className="w-4 h-4" />
                </button>
              </Card>
            );
          })}
        </div>
      </section>

      {/* Features Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold font-display mb-4">Everything You Need in One Place</h2>
          <p className="text-white/50 max-w-2xl mx-auto">
            From assessment to roadmap \u2014 tools for students and parents to make informed decisions together.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {features.map((feature, i) => {
            const Icon = feature.icon;
            return (
              <Card key={i} className="p-6 flex items-start gap-4 animate-fade-in-up" >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-400/20 to-purple-500/20 flex items-center justify-center shrink-0">
                  <Icon className="w-6 h-6 text-cyan-300" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-1">{feature.title}</h3>
                  <p className="text-sm text-white/50 leading-relaxed">{feature.description}</p>
                </div>
              </Card>
            );
          })}
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <Card glow className="p-8 sm:p-12 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-card-glow" />
          <div className="relative">
            <h2 className="text-2xl sm:text-3xl font-bold font-display mb-4">
              Ready to find your path?
            </h2>
            <p className="text-white/50 mb-8 max-w-xl mx-auto">
              Take the assessment and get personalized career recommendations in minutes. No sign-up required.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" icon={Rocket} onClick={() => onNavigate('assessment')}>
                Start Assessment
              </Button>
              <Button size="lg" variant="outline" icon={Users} onClick={() => onNavigate('parent')}>
                Parent Corner
              </Button>
            </div>
          </div>
        </Card>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Disclaimer />
      </div>
    </div>
  );
}
