import { useState } from "react";
import { RoleSelector } from "@/components/RoleSelector";
import { Navigation } from "@/components/Navigation";
import { StudentDashboard } from "@/components/StudentDashboard";
import { InstructorDashboard } from "@/components/InstructorDashboard";
import { HighlightsViewer } from "@/components/HighlightsViewer";

import { ProgressReport } from "@/components/ProgressReport";
import { Language } from "@/lib/translations";

type View = 'role-select' | 'student-dashboard' | 'instructor-dashboard' | 'highlights' | 'progress-report';
type Role = 'student' | 'instructor' | null;

const Index = () => {
  const [currentView, setCurrentView] = useState<View>('role-select');
  const [userRole, setUserRole] = useState<Role>(null);
  const [language, setLanguage] = useState<Language>('NL');
  const [highlightsContext, setHighlightsContext] = useState<{
    lessonId?: number;
    studentId?: number;
  }>({});

  const handleRoleSelect = (role: 'student' | 'instructor') => {
    setUserRole(role);
    setCurrentView(role === 'student' ? 'student-dashboard' : 'instructor-dashboard');
  };

  const handleViewHighlights = (lessonId?: number, studentId?: number) => {
    setHighlightsContext({ lessonId, studentId });
    setCurrentView('highlights');
  };

  const handleBackToRoleSelect = () => {
    setCurrentView('role-select');
    setUserRole(null);
    setHighlightsContext({});
  };

  const handleBackToDashboard = () => {
    if (userRole === 'student') {
      setCurrentView('student-dashboard');
    } else if (userRole === 'instructor') {
      setCurrentView('instructor-dashboard');
    }
    setHighlightsContext({});
  };



  const handleViewProgressReport = () => {
    setCurrentView('progress-report');
  };

  const handleLanguageChange = (lang: string) => {
    setLanguage(lang as Language);
  };

  const renderContent = () => {
    switch (currentView) {
      case 'role-select':
        return <RoleSelector onRoleSelect={handleRoleSelect} language={language} />;

      case 'student-dashboard':
        return <StudentDashboard onViewHighlights={(lessonId) => handleViewHighlights(lessonId)} onViewProgressReport={handleViewProgressReport} language={language} />;

      case 'instructor-dashboard':
        return <InstructorDashboard onViewHighlights={(studentId) => handleViewHighlights(undefined, studentId)} language={language} />;

      case 'highlights':
        return (
          <HighlightsViewer
            lessonId={highlightsContext.lessonId}
            studentId={highlightsContext.studentId}
            onBack={handleBackToDashboard}
            role={userRole as 'student' | 'instructor'}
          />
        );



      case 'progress-report':
        return <ProgressReport onBack={handleBackToDashboard} />;

      default:
        return <RoleSelector onRoleSelect={handleRoleSelect} language={language} />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {currentView !== 'role-select' && userRole && (
        <Navigation
          role={userRole}
          onBack={handleBackToRoleSelect}
          userName={userRole === 'student' ? 'Milan Dijkstra' : 'Fabian van Beek'}
          language={language}
          onLanguageChange={handleLanguageChange}
        />
      )}
      {renderContent()}
    </div>
  );
};

export default Index;
