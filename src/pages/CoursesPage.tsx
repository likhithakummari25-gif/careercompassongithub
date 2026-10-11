import { useState, useMemo } from 'react';
import {
  BookOpen,
  Search,
  ExternalLink,
  CheckCircle2,
  AlertTriangle,
  Filter,
  X,
} from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { courseResources, type CourseResource } from '@/data/courses';

type CategoryFilter = 'all' | 'course' | 'scholarship' | 'platform';

const categoryLabels: Record<string, string> = {
  course: 'Course',
  scholarship: 'Scholarship',
  platform: 'Platform',
};

const categoryVariants: Record<string, 'cyan' | 'green' | 'purple'> = {
  course: 'cyan',
  scholarship: 'green',
  platform: 'purple',
};

export function CoursesPage() {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState<CategoryFilter>('all');
  const [field, setField] = useState('all');

  const fields = useMemo(() => {
    const set = new Set(courseResources.map((r) => r.field));
    return ['all', ...Array.from(set).sort()];
  }, []);

  const filtered = useMemo(() => {
    return courseResources.filter((r) => {
      const matchesSearch =
        !search ||
        r.title.toLowerCase().includes(search.toLowerCase()) ||
        r.description.toLowerCase().includes(search.toLowerCase()) ||
        r.provider.toLowerCase().includes(search.toLowerCase());
      const matchesCategory = category === 'all' || r.category === category;
      const matchesField = field === 'all' || r.field === field;
      return matchesSearch && matchesCategory && matchesField;
    });
  }, [search, category, field]);

  const hasActiveFilters = search !== '' || category !== 'all' || field !== 'all';

  const clearFilters = () => {
    setSearch('');
    setCategory('all');
    setField('all');
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in">
      <div className="text-center mb-8">
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-400/20 to-purple-500/20 flex items-center justify-center mx-auto mb-4">
          <BookOpen className="w-8 h-8 text-cyan-300" />
        </div>
        <h1 className="text-3xl font-bold font-display mb-2">Courses & Scholarships</h1>
        <p className="text-white/50 max-w-2xl mx-auto">
          Search verified resources for learning and financial aid. We link to official portals where available.
        </p>
      </div>

      {/* Filters */}
      <Card className="p-5 mb-6">
        <div className="flex flex-col lg:flex-row gap-3">
          <div className="flex-1 relative">
            <Search className="w-5 h-5 text-white/30 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search courses, scholarships, platforms..."
              className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-cyan-400/50 transition-colors"
            />
          </div>
          <div className="flex gap-3">
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value as CategoryFilter)}
              className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-cyan-400/50 transition-colors"
            >
              <option value="all">All Types</option>
              <option value="course">Courses</option>
              <option value="scholarship">Scholarships</option>
              <option value="platform">Platforms</option>
            </select>
            <select
              value={field}
              onChange={(e) => setField(e.target.value)}
              className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-cyan-400/50 transition-colors"
            >
              {fields.map((f) => (
                <option key={f} value={f}>{f === 'all' ? 'All Fields' : f}</option>
              ))}
            </select>
          </div>
        </div>

        {hasActiveFilters && (
          <div className="flex items-center justify-between mt-3 pt-3 border-t border-white/10">
            <span className="text-xs text-white/40">{filtered.length} result{filtered.length !== 1 ? 's' : ''}</span>
            <button
              onClick={clearFilters}
              className="text-xs text-cyan-300 hover:text-cyan-200 flex items-center gap-1 transition-colors"
            >
              Clear filters <X className="w-3 h-3" />
            </button>
          </div>
        )}
      </Card>

      {/* Results */}
      {filtered.length === 0 ? (
        <Card className="p-12 text-center">
          <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center mx-auto mb-4">
            <Filter className="w-6 h-6 text-white/30" />
          </div>
          <h3 className="font-semibold mb-2">No results found</h3>
          <p className="text-sm text-white/40 mb-4">Try adjusting your search or filters.</p>
          <Button size="sm" variant="secondary" onClick={clearFilters}>
            Clear Filters
          </Button>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filtered.map((resource) => (
            <ResourceCard key={resource.id} resource={resource} />
          ))}
        </div>
      )}

      <Card className="p-4 mt-8 border-amber-400/20">
        <div className="flex items-start gap-2">
          <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
          <div className="text-sm text-white/50">
            <p className="mb-1">
              <strong className="text-white/70">Verified</strong> entries link to official portals. Always check
              the official website for current deadlines, eligibility, and fees.
            </p>
            <p>
              <strong className="text-white/70">Sample</strong> entries are placeholders \u2014 we never invent
              scholarship deadlines, eligibility criteria, or application links.
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}

function ResourceCard({ resource }: { resource: CourseResource }) {
  return (
    <Card hover className="p-5 flex flex-col">
      <div className="flex items-start justify-between gap-2 mb-3">
        <Badge variant={categoryVariants[resource.category]}>{categoryLabels[resource.category]}</Badge>
        {resource.verified ? (
          <Badge variant="green" icon={<CheckCircle2 className="w-3 h-3" />}>Verified</Badge>
        ) : (
          <Badge variant="amber" icon={<AlertTriangle className="w-3 h-3" />}>Sample</Badge>
        )}
      </div>
      <h3 className="font-semibold mb-1">{resource.title}</h3>
      <p className="text-xs text-white/40 mb-2">{resource.provider} \u00b7 {resource.field}</p>
      <p className="text-sm text-white/50 leading-relaxed mb-4 flex-1">{resource.description}</p>
      <div className="flex items-center justify-between gap-2">
        <div className="flex gap-2">
          <Badge>{resource.cost}</Badge>
          <Badge>{resource.level}</Badge>
        </div>
        {resource.link !== '#' && (
          <a
            href={resource.link}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-cyan-300 hover:text-cyan-200 flex items-center gap-1 transition-colors"
          >
            Visit <ExternalLink className="w-3.5 h-3.5" />
          </a>
        )}
      </div>
    </Card>
  );
}
