import { useState } from "react";
import { Calendar, Clock, Plus, Star, TrendingUp, User, Users, Video } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CreateStudentDialog } from "@/components/CreateStudentDialog";
import { useTranslation } from "@/hooks/useTranslation";
import { Language } from "@/lib/translations";

const mockStudents = [
  {
    id: 1,
    name: "Milan Dijkstra",
    avatar: "/placeholder.svg",
    totalHours: 18,
    requiredHours: 40,
    nextLesson: "2024-01-20",
    status: "active",
    rating: 4.2,
    recentLessons: [
      { id: 1, titleKey: "parallelParking", date: "2024-01-15", highlights: 2 },
      { id: 2, titleKey: "highwayDriving", date: "2024-01-12", highlights: 3 }
    ]
  },
  {
    id: 2, 
    name: "Emma Haak",
    avatar: "/placeholder.svg",
    totalHours: 32,
    requiredHours: 40,
    nextLesson: "2024-01-18",
    status: "active",
    rating: 4.8,
    recentLessons: [
      { id: 3, titleKey: "cityNavigation", date: "2024-01-14", highlights: 4 },
      { id: 4, titleKey: "nightDriving", date: "2024-01-10", highlights: 2 }
    ]
  },
  {
    id: 3,
    name: "Jorik Kroon",
    avatar: "/placeholder.svg", 
    totalHours: 8,
    requiredHours: 40,
    nextLesson: "2024-01-22",
    status: "new",
    rating: 4.0,
    recentLessons: [
      { id: 5, titleKey: "basicControls", date: "2024-01-13", highlights: 1 }
    ]
  },
  {
    id: 4,
    name: "Josan de Vries",
    avatar: "/placeholder.svg", 
    totalHours: 25,
    requiredHours: 40,
    nextLesson: "2024-01-21",
    status: "active",
    rating: 4.5,
    recentLessons: [
      { id: 6, titleKey: "parallelParking", date: "2024-01-16", highlights: 3 }
    ]
  },
  {
    id: 5,
    name: "Paul de Bruin",
    avatar: "/placeholder.svg", 
    totalHours: 12,
    requiredHours: 40,
    nextLesson: "2024-01-19",
    status: "active",
    rating: 4.3,
    recentLessons: [
      { id: 7, titleKey: "cityNavigation", date: "2024-01-14", highlights: 2 }
    ]
  }
];


interface InstructorDashboardProps {
  onViewHighlights: (studentId: number) => void;
  language: Language;
}

export const InstructorDashboard = ({ onViewHighlights, language }: InstructorDashboardProps) => {
  const { t } = useTranslation(language);
  const [selectedStudent, setSelectedStudent] = useState<string>("");
  
  const totalStudents = mockStudents.length;
  const activeStudents = mockStudents.filter(s => s.status === 'active').length;
  const avgRating = (mockStudents.reduce((sum, s) => sum + s.rating, 0) / totalStudents).toFixed(1);
  const totalHighlights = mockStudents.reduce((sum, student) => 
    sum + student.recentLessons.reduce((lessonSum, lesson) => lessonSum + lesson.highlights, 0), 0
  );

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-8 animate-fade-in">
      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-gradient-card border-0 shadow-card">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">{t('totalStudents')}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">{totalStudents}</div>
            <p className="text-xs text-muted-foreground">{activeStudents} {t('active')}</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-card border-0 shadow-card">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">{t('avgRating')}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <div className="text-2xl font-bold text-warning">{avgRating}</div>
              <Star className="h-5 w-5 fill-warning text-warning" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-card border-0 shadow-card">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">{t('highlightsCreated')}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-success">{totalHighlights}</div>
            <p className="text-xs text-muted-foreground">{t('thisMonth')}</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-card border-0 shadow-card">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">{t('activeLesson')}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">
              {selectedStudent ? t('inProgress') : t('none')}
            </div>
            <p className="text-xs text-muted-foreground">
              {selectedStudent || t('noStudentSelected')}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Student Selection & Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-medium text-muted-foreground">{t('selectStudentForLesson')}</label>
          <Select value={selectedStudent} onValueChange={setSelectedStudent}>
            <SelectTrigger className="h-16">
              <SelectValue placeholder={t('chooseStudent')} />
            </SelectTrigger>
            <SelectContent>
              {mockStudents.map((student) => (
                <SelectItem key={student.id} value={student.name}>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-primary" />
                    {student.name}
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <CreateStudentDialog 
          language={language}
          onStudentCreated={(student) => {
            console.log("New student created:", student);
          }} 
        />
        
        <Button 
          variant="outline" 
          className="h-16 border-2 hover:border-primary/50"
          disabled={!selectedStudent}
        >
          <Video className="mr-2 h-5 w-5" />
          {t('startLesson')}
        </Button>
        
        <Button 
          variant="destructive" 
          className="h-16 border-2"
          disabled={!selectedStudent}
        >
          <Video className="mr-2 h-5 w-5" />
          {t('stopLesson')}
        </Button>
      </div>

      {/* Student Management */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">{t('yourStudents')}</h2>
          <Button variant="outline">{t('viewAllProgress')}</Button>
        </div>

        <div className="grid gap-6">
          {mockStudents.map((student, index) => (
            <Card 
              key={student.id} 
              className="group hover:shadow-elegant transition-all duration-300 border-l-4 border-l-primary/20 hover:border-l-primary animate-slide-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <Avatar className="w-12 h-12">
                    <AvatarImage src={student.avatar} />
                    <AvatarFallback className="bg-gradient-primary text-primary-foreground">
                      {student.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>

                  <div className="flex-1 space-y-3">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-semibold text-lg group-hover:text-primary transition-colors">
                          {student.name}
                        </h3>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
                          <span>{student.totalHours}/{student.requiredHours} {t('hours')}</span>
                          <div className="flex items-center gap-1">
                            <Star className="h-4 w-4 fill-warning text-warning" />
                            {student.rating}
                          </div>
                          <span>{t('next')}: {new Date(student.nextLesson).toLocaleDateString(language === 'NL' ? 'nl-NL' : undefined)}</span>
                        </div>
                      </div>
                      
                      <Badge 
                        variant={student.status === 'active' ? 'default' : 'secondary'}
                        className={student.status === 'active' ? 'bg-success text-success-foreground' : ''}
                      >
                        {student.status === 'active' ? t('Active') : t('newStudent')}
                      </Badge>
                    </div>

                    <div className="bg-muted rounded-lg p-3">
                      <div className="text-sm font-medium mb-2">{t('recentLessons')}</div>
                      <div className="space-y-2">
                        {student.recentLessons.map((lesson) => (
                            <div key={lesson.id} className="flex items-center justify-between text-sm">
                             <span className="text-muted-foreground">
                               {t(lesson.titleKey as any)}
                             </span>
                            <div className="flex items-center gap-2">
                              <span className="text-xs text-muted-foreground">
                                {new Date(lesson.date).toLocaleDateString(language === 'NL' ? 'nl-NL' : undefined)}
                              </span>
                              {lesson.highlights > 0 && (
                                <Badge variant="outline" className="text-xs">
                                  {lesson.highlights} {t('highlights')}
                                </Badge>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => setSelectedStudent(student.name)}
                      >
                        <User className="h-4 w-4 mr-2" />
                        {t('selectStudent')}
                      </Button>
                      <Button 
                        size="sm" 
                        onClick={() => onViewHighlights(student.id)}
                        className="bg-gradient-primary hover:shadow-lg transition-all duration-300"
                      >
                        <Video className="h-4 w-4 mr-2" />
                        {t('allLessons')}
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};