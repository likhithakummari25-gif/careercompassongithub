import { useCallback } from 'react';
import { useLocalStorage } from './useLocalStorage';
import type { AssessmentResult, DashboardData, StudentProfile } from '@/types';

const emptyDashboard: DashboardData = {
  savedCareers: [],
  lastAssessment: null,
  comparisons: [],
  roadmapProgress: {},
  recentlyExplored: [],
};

export function useAppData() {
  const [dashboard, setDashboard] = useLocalStorage<DashboardData>('cc_dashboard', emptyDashboard);
  const [assessment, setAssessment] = useLocalStorage<AssessmentResult | null>('cc_assessment', null);
  const [profile, setProfile] = useLocalStorage<StudentProfile | null>('cc_profile', null);

  const saveCareer = useCallback(
    (careerId: string) => {
      setDashboard((prev) => {
        if (prev.savedCareers.some((c) => c.careerId === careerId)) return prev;
        return {
          ...prev,
          savedCareers: [...prev.savedCareers, { careerId, savedAt: new Date().toISOString() }],
        };
      });
    },
    [setDashboard]
  );

  const unsaveCareer = useCallback(
    (careerId: string) => {
      setDashboard((prev) => ({
        ...prev,
        savedCareers: prev.savedCareers.filter((c) => c.careerId !== careerId),
      }));
    },
    [setDashboard]
  );

  const isCareerSaved = useCallback(
    (careerId: string) => dashboard.savedCareers.some((c) => c.careerId === careerId),
    [dashboard.savedCareers]
  );

  const addComparison = useCallback(
    (careerIds: string[]) => {
      setDashboard((prev) => {
        const key = [...careerIds].sort().join(',');
        if (prev.comparisons.some((c) => [...c].sort().join(',') === key)) return prev;
        return { ...prev, comparisons: [...prev.comparisons, careerIds] };
      });
    },
    [setDashboard]
  );

  const addRecentlyExplored = useCallback(
    (careerId: string) => {
      setDashboard((prev) => ({
        ...prev,
        recentlyExplored: [careerId, ...prev.recentlyExplored.filter((id) => id !== careerId)].slice(0, 8),
      }));
    },
    [setDashboard]
  );

  const toggleRoadmapStep = useCallback(
    (careerId: string, stepId: string) => {
      setDashboard((prev) => {
        const current = prev.roadmapProgress[careerId] || [];
        const updated = current.includes(stepId)
          ? current.filter((id) => id !== stepId)
          : [...current, stepId];
        return {
          ...prev,
          roadmapProgress: { ...prev.roadmapProgress, [careerId]: updated },
        };
      });
    },
    [setDashboard]
  );

  const clearAll = useCallback(() => {
    setDashboard(emptyDashboard);
    setAssessment(null);
    setProfile(null);
  }, [setDashboard, setAssessment, setProfile]);

  return {
    dashboard,
    assessment,
    profile,
    setAssessment,
    setProfile,
    saveCareer,
    unsaveCareer,
    isCareerSaved,
    addComparison,
    addRecentlyExplored,
    toggleRoadmapStep,
    clearAll,
  };
}
