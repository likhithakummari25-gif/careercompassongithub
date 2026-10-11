import { useState, useCallback } from 'react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { HomePage } from '@/pages/HomePage';
import { ProfilePage } from '@/pages/ProfilePage';
import { AssessmentPage } from '@/pages/AssessmentPage';
import { RecommendationsPage } from '@/pages/RecommendationsPage';
import { CareerDetailPage } from '@/pages/CareerDetailPage';
import { ComparePage } from '@/pages/ComparePage';
import { RoadmapPage } from '@/pages/RoadmapPage';
import { ParentPage } from '@/pages/ParentPage';
import { CoursesPage } from '@/pages/CoursesPage';
import { DashboardPage } from '@/pages/DashboardPage';
import { useAppData } from '@/hooks/useAppData';
import { getCareerById, careers } from '@/data/careers';
import { matchCareers } from '@/engine/matching';
import type { PageId, StudentProfile, AssessmentResult } from '@/types';

export function App() {
  const [currentPage, setCurrentPage] = useState<PageId>('home');
  const [selectedCareerId, setSelectedCareerId] = useState<string | null>(null);
  const [compareList, setCompareList] = useState<string[]>([]);
  const [roadmapCareerId, setRoadmapCareerId] = useState<string | null>(null);

  const {
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
  } = useAppData();

  const handleNavigate = useCallback(
    (page: PageId) => {
      setCurrentPage(page);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    },
    []
  );

  const handleSelectCareer = useCallback(
    (careerId: string) => {
      setSelectedCareerId(careerId);
      addRecentlyExplored(careerId);
      setCurrentPage('career-detail');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    },
    [addRecentlyExplored]
  );

  const handleSaveProfile = useCallback(
    (p: StudentProfile) => {
      setProfile(p);
    },
    [setProfile]
  );

  const handleCompleteAssessment = useCallback(
    (result: AssessmentResult) => {
      setAssessment(result);
    },
    [setAssessment]
  );

  const handleToggleCompare = useCallback((careerId: string) => {
    setCompareList((prev) => {
      if (prev.includes(careerId)) {
        return prev.filter((id) => id !== careerId);
      }
      if (prev.length >= 3) return prev;
      return [...prev, careerId];
    });
  }, []);

  const handleAddToCompare = useCallback((careerId: string) => {
    setCompareList((prev) => {
      if (prev.includes(careerId)) return prev;
      if (prev.length >= 3) return prev;
      return [...prev, careerId];
    });
  }, []);

  const handleClearCompare = useCallback(() => {
    setCompareList([]);
  }, []);

  const handleNavigateToRoadmap = useCallback(
    (page: PageId) => {
      if (page === 'roadmap' && selectedCareerId) {
        setRoadmapCareerId(selectedCareerId);
      }
      handleNavigate(page);
    },
    [selectedCareerId, handleNavigate]
  );

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage onNavigate={handleNavigate} />;
      case 'profile':
        return (
          <ProfilePage
            profile={profile}
            onSave={handleSaveProfile}
            onNavigate={handleNavigate}
          />
        );
      case 'assessment':
        return (
          <AssessmentPage
            profile={profile}
            onComplete={handleCompleteAssessment}
            onNavigate={handleNavigate}
            existingResult={assessment}
          />
        );
      case 'recommendations':
        return (
          <RecommendationsPage
            assessment={assessment}
            onNavigate={handleNavigate}
            onSelectCareer={handleSelectCareer}
            onSaveCareer={saveCareer}
            onUnsaveCareer={unsaveCareer}
            isCareerSaved={isCareerSaved}
            onAddToCompare={handleAddToCompare}
            compareList={compareList}
          />
        );
      case 'career-detail': {
        const career = selectedCareerId ? getCareerById(selectedCareerId) : null;
        if (!career) {
          return (
            <RecommendationsPage
              assessment={assessment}
              onNavigate={handleNavigate}
              onSelectCareer={handleSelectCareer}
              onSaveCareer={saveCareer}
              onUnsaveCareer={unsaveCareer}
              isCareerSaved={isCareerSaved}
              onAddToCompare={handleAddToCompare}
              compareList={compareList}
            />
          );
        }
        const matchScore = assessment
          ? matchCareers(assessment.scores, assessment.profile).find((m) => m.career.id === career.id)?.score
          : undefined;
        return (
          <CareerDetailPage
            career={career}
            matchScore={matchScore}
            onNavigate={handleNavigateToRoadmap}
            onBack={() => handleNavigate('recommendations')}
            onSaveCareer={saveCareer}
            onUnsaveCareer={unsaveCareer}
            isCareerSaved={isCareerSaved}
            onAddToCompare={handleAddToCompare}
            compareList={compareList}
          />
        );
      }
      case 'compare':
        return (
          <ComparePage
            compareList={compareList}
            onToggleCompare={handleToggleCompare}
            onClearCompare={handleClearCompare}
            onSelectCareer={handleSelectCareer}
            onNavigate={handleNavigate}
            onAddComparison={addComparison}
          />
        );
      case 'roadmap':
        return (
          <RoadmapPage
            careerId={roadmapCareerId}
            educationLevel={profile?.educationLevel || 'intermediate'}
            onNavigate={handleNavigate}
            onSelectCareer={(id) => {
              setRoadmapCareerId(id);
              addRecentlyExplored(id);
            }}
            roadmapProgress={dashboard.roadmapProgress}
            onToggleStep={toggleRoadmapStep}
          />
        );
      case 'parent':
        return <ParentPage onNavigate={handleNavigate} />;
      case 'courses':
        return <CoursesPage />;
      case 'dashboard':
        return (
          <DashboardPage
            dashboard={dashboard}
            assessment={assessment}
            onNavigate={handleNavigate}
            onSelectCareer={handleSelectCareer}
            onUnsaveCareer={unsaveCareer}
            onClearAll={clearAll}
          />
        );
      default:
        return <HomePage onNavigate={handleNavigate} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar currentPage={currentPage} onNavigate={handleNavigate} />
      <main className="flex-1">{renderPage()}</main>
      <Footer onNavigate={handleNavigate} />
    </div>
  );
}

export default App;
