import { useState, useEffect } from "react";
import { Calendar, Clock, Play, Star, TrendingUp, User, Video, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { StudentProfile } from "@/components/StudentProfile";
import { NDADialog } from "@/components/NDADialog";
import { useTranslation } from "@/hooks/useTranslation";
import { Language } from "@/lib/translations";

const mockLessons = [
  {
    id: 1,
    titleKey: "File Parkeren",
    instructor: "Fabian van Beek",
    date: "2024-01-15",
    duration: "45 min",
    status: "completed",
    rating: 4.5,
    highlights: 3,
    thumbnail: "/placeholder.svg"
  },
  {
    id: 2,
    titleKey: "Invoegen & Rijstrookwissel",
    instructor: "Fabian van Beek",
    date: "2024-01-12",
    duration: "60 min",
    status: "completed",
    rating: 4.8,
    highlights: 5,
    thumbnail: "/placeholder.svg"
  }
];

const mockProgress = {
  totalHours: 24,
  requiredHours: 40,
  completedLessons: 12,
  upcomingLessons: 2
};

interface StudentDashboardProps {
  onViewHighlights: (lessonId: number) => void;

  onViewProgressReport?: () => void;
  language: Language;
}

export const StudentDashboard = ({ onViewHighlights, onViewProgressReport, language }: StudentDashboardProps) => {
  const { t } = useTranslation(language);
  const [showProfile, setShowProfile] = useState(false);
  const [showNDADialog, setShowNDADialog] = useState(false);
  const [hasAcceptedNDA, setHasAcceptedNDA] = useState(false);

  const progressPercentage = (mockProgress.totalHours / mockProgress.requiredHours) * 100;

  // Check if first time login (in real app, this would come from user data)
  useEffect(() => {
    const hasSeenNDA = localStorage.getItem('hasAcceptedNDA');
    if (!hasSeenNDA) {
      setShowNDADialog(true);
    } else {
      setHasAcceptedNDA(true);
    }
  }, []);

  const handleNDAAccept = () => {
    localStorage.setItem('hasAcceptedNDA', 'true');
    setHasAcceptedNDA(true);
    setShowNDADialog(false);
  };

  if (showProfile) {
    return <StudentProfile onBack={() => setShowProfile(false)} language={language} />;
  }

  return (
    <>
      <NDADialog isOpen={showNDADialog} onAccept={handleNDAAccept} language={language} />

      <div className="max-w-7xl mx-auto p-6 space-y-8 animate-fade-in">
        {/* Header with Profile Button */}
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-primary">{t('studentDashboard')}</h1>
          <Button
            variant="outline"
            onClick={() => setShowProfile(true)}
            className="gap-2"
          >
            <Settings className="h-4 w-4" />
            {t('profileSettings')}
          </Button>
        </div>
        {/* Progress Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="bg-gradient-card border-0 shadow-card">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">{t('totalHours')}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">{mockProgress.totalHours}</div>
              <p className="text-xs text-muted-foreground">{t('of')} {mockProgress.requiredHours} {t('required')}</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-card border-0 shadow-card">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">{t('progress')}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="text-2xl font-bold text-primary">{Math.round(progressPercentage)}%</div>
                <Progress value={progressPercentage} className="h-2" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-card border-0 shadow-card">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">{t('completed')}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-success">{mockProgress.completedLessons}</div>
              <p className="text-xs text-muted-foreground">{t('lessonsCompleted')}</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-card border-0 shadow-card">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">{t('upcoming')}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-warning">{mockProgress.upcomingLessons}</div>
              <p className="text-xs text-muted-foreground">{t('lessonsScheduled')}</p>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Button className="h-16 bg-gradient-primary hover:shadow-lg transition-all duration-300">
            <Calendar className="mr-2 h-5 w-5" />
            {t('scheduleNewLesson')}
          </Button>
          <Button variant="outline" className="h-16 border-2 hover:border-primary/50">
            <Video className="mr-2 h-5 w-5" />
            {t('watchAllHighlights')}
          </Button>

          <Button
            variant="outline"
            className="h-16 border-2 hover:border-primary/50"
            onClick={onViewProgressReport}
          >
            <TrendingUp className="mr-2 h-5 w-5" />
            {t('viewProgressReport')}
          </Button>
        </div>

        {/* Lessons */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold">{t('yourLessons')}</h2>
            <Button variant="outline">{t('viewAll')}</Button>
          </div>

          <div className="grid gap-6">
            {mockLessons.map((lesson, index) => (
              <Card
                key={lesson.id}
                className="group hover:shadow-elegant transition-all duration-300 border-l-4 border-l-primary/20 hover:border-l-primary animate-slide-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="relative">
                      <div className="w-16 h-16 bg-gradient-primary rounded-lg flex items-center justify-center">
                        <Video className="h-8 w-8 text-primary-foreground" />
                      </div>
                      {lesson.status === 'completed' && lesson.highlights > 0 && (
                        <Badge className="absolute -top-2 -right-2 bg-success text-success-foreground text-xs px-1.5">
                          {lesson.highlights}
                        </Badge>
                      )}
                    </div>

                    <div className="flex-1 space-y-2">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="font-semibold text-lg group-hover:text-primary transition-colors">
                            {lesson.titleKey}
                          </h3>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
                            <div className="flex items-center gap-1">
                              <User className="h-4 w-4" />
                              {lesson.instructor}
                            </div>
                            <div className="flex items-center gap-1">
                              <Calendar className="h-4 w-4" />
                              {new Date(lesson.date).toLocaleDateString(language === 'NL' ? 'nl-NL' : undefined)}
                            </div>
                            <div className="flex items-center gap-1">
                              <Clock className="h-4 w-4" />
                              {lesson.duration}
                            </div>
                          </div>
                        </div>

                        <Badge
                          variant={lesson.status === 'completed' ? 'default' : 'secondary'}
                          className={lesson.status === 'completed' ? 'bg-success text-success-foreground' : ''}
                        >
                          {lesson.status === 'completed' ? t('Completed') : t('upcoming')}
                        </Badge>
                      </div>

                      {lesson.status === 'completed' && (
                        <div className="flex items-center gap-4 pt-2">
                          <div className="flex items-center gap-1">
                            <Star className="h-4 w-4 fill-warning text-warning" />
                            <span className="text-sm font-medium">{lesson.rating}</span>
                          </div>

                          {lesson.highlights > 0 && (
                            <Button
                              size="sm"
                              onClick={() => onViewHighlights(lesson.id)}
                              className="gap-2 bg-gradient-primary hover:shadow-lg transition-all duration-300"
                            >
                              <Play className="h-4 w-4" />
                              {t('watchHighlights')} ({lesson.highlights})
                            </Button>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};