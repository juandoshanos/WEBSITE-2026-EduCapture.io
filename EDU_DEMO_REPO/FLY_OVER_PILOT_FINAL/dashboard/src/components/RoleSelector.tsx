import { Eye, GraduationCap, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useTranslation } from "@/hooks/useTranslation";
import { Language } from "@/lib/translations";

interface RoleSelectorProps {
  onRoleSelect: (role: 'student' | 'instructor') => void;
  language: Language;
}

export const RoleSelector = ({ onRoleSelect, language }: RoleSelectorProps) => {
  const { t } = useTranslation(language);
  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-accent/20 flex items-center justify-center p-4">
      <div className="max-w-4xl w-full">
        <div className="text-center mb-12 animate-fade-in">
          <div className="flex items-center justify-center gap-3 mb-6">
            <Eye className="h-10 w-10 text-primary" />
            <h1 className="text-4xl font-bold text-primary font-heading italic tracking-tighter">
              Fly-Over
            </h1>
          </div>
          <p className="text-xl text-muted-foreground font-sans">
            VOOR AL UW RIJBEWIJSOPLEIDINGEN
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 animate-slide-up">
          <Card className="group hover:shadow-elegant transition-all duration-300 hover:scale-105 cursor-pointer border-2 hover:border-primary/50">
            <CardHeader className="text-center pb-4">
              <div className="mx-auto w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <GraduationCap className="h-8 w-8 text-primary-foreground" />
              </div>
              <CardTitle className="text-2xl">{t('Student Dashboard')}</CardTitle>
              <CardDescription className="text-base">
                {t('studentPortalDesc')}
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-2">
              <Button
                onClick={() => onRoleSelect('student')}
                className="w-full h-12 text-lg font-semibold bg-gradient-primary hover:shadow-lg transition-all duration-300"
                size="lg"
              >
                {t('enterAsStudent')}
              </Button>
              <div className="mt-4 space-y-2 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-success rounded-full"></div>
                  {t('viewLessonHighlights')}
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-success rounded-full"></div>
                  {t('trackDrivingProgress')}
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-success rounded-full"></div>
                  {t('scheduleLessons')}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="group hover:shadow-elegant transition-all duration-300 hover:scale-105 cursor-pointer border-2 hover:border-primary/50">
            <CardHeader className="text-center pb-4">
              <div className="mx-auto w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Users className="h-8 w-8 text-primary-foreground" />
              </div>
              <CardTitle className="text-2xl">{t('Instructor Dashboard')}</CardTitle>
              <CardDescription className="text-base">
                {t('instructorPortalDesc')}
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-2">
              <Button
                onClick={() => onRoleSelect('instructor')}
                className="w-full h-12 text-lg font-semibold bg-gradient-primary hover:shadow-lg transition-all duration-300"
                size="lg"
              >
                {t('enterAsInstructor')}
              </Button>
              <div className="mt-4 space-y-2 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  {t('manageStudentPortfolios')}
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  {t('createShareHighlights')}
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  {t('trackProgressAllStudents')}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};