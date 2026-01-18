import { ArrowLeft, TrendingUp, Award, Target, CheckCircle2, Circle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

// Mock data based on the matrix - tracks student progress across 4 phases
const mockProgressData = {
  studentName: "Milan Dijkstra",
  totalLessons: 12,
  currentPhase: 2,
  phases: [
    {
      phase: 1,
      name: "Fase 1: Basistechniek en controlehandelingen",
      color: "from-green-400 to-green-600",
      bgColor: "bg-green-50",
      borderColor: "border-green-200",
      progress: 100,
      competencies: [
        { id: 1, name: "Voorbereiding- en controlehandelingen", lessons: [1, 2], mastered: true, score: 5 },
        { id: 2, name: "Stuuroefeingen/Kijktechniek", lessons: [1, 2, 3], mastered: true, score: 5 },
        { id: 3, name: "Gasdosering/snelheidsregeling", lessons: [2, 3, 4], mastered: true, score: 4 },
        { id: 4, name: "Remmen (afremmen en tot stilstand brengen)", lessons: [3, 4], mastered: true, score: 5 },
        { id: 5, name: "Opkoppelen/koppelen/wegnemen", lessons: [3, 4, 5], mastered: true, score: 4 },
        { id: 6, name: "Schakelen", lessons: [4, 5, 6], mastered: true, score: 5 },
        { id: 7, name: "Instrumente/wiser/claxon/licht/blower/waarschuwingslichten", lessons: [1, 2], mastered: true, score: 5 },
        { id: 8, name: "Afwerking stuurtechniek en remtechniek/stopreactie", lessons: [5, 6], mastered: true, score: 4 },
      ]
    },
    {
      phase: 2,
      name: "Fase 2: Beheersheid en kijktechniek",
      color: "from-yellow-400 to-yellow-600",
      bgColor: "bg-yellow-50",
      borderColor: "border-yellow-200",
      progress: 65,
      competencies: [
        { id: 9, name: "Plaats op de rijbaan/rijstrooktechniek", lessons: [7, 8, 9], mastered: true, score: 4 },
        { id: 10, name: "Kijktechniek en informatieverzwerking", lessons: [7, 8, 9, 10], mastered: true, score: 4 },
        { id: 11, name: "Helling/gereed (met en zonder handrem)", lessons: [8, 9], mastered: true, score: 3 },
        { id: 12, name: "Naderen en oversteken van kruispunten", lessons: [9, 10, 11], mastered: false, score: 3 },
        { id: 13, name: "Achteruit rijden (recht)", lessons: [10, 11], mastered: false, score: 3 },
        { id: 14, name: "Naar rechts van richting veranderen", lessons: [10, 11, 12], mastered: false, score: 2 },
        { id: 15, name: "Achteruit rijden (bocht en garage)", lessons: [11, 12], mastered: false, score: 2 },
        { id: 16, name: "Naar links van richting veranderen", lessons: [12], mastered: false, score: 2 },
        { id: 17, name: "Parkeren", lessons: [12], mastered: false, score: 1 },
      ]
    },
    {
      phase: 3,
      name: "Fase 3: Informatieverzwerking en verkeersinzicht",
      color: "from-orange-400 to-orange-600",
      bgColor: "bg-orange-50",
      borderColor: "border-orange-200",
      progress: 0,
      competencies: [
        { id: 18, name: "Tegenkomen/voorbiggaan/inhalen", lessons: [], mastered: false, score: 0 },
        { id: 19, name: "Parkeren op plaats/parkervak (voor-/achteruit/schuin/haaks/links)", lessons: [], mastered: false, score: 0 },
        { id: 20, name: "In- en uitvoegen van autosnelwegen", lessons: [], mastered: false, score: 0 },
        { id: 21, name: "Berijden van (mini-) rotondes", lessons: [], mastered: false, score: 0 },
      ]
    },
    {
      phase: 4,
      name: "Fase 4: Excitoets/examen",
      color: "from-red-400 to-red-600",
      bgColor: "bg-red-50",
      borderColor: "border-red-200",
      progress: 0,
      competencies: [
        { id: 22, name: "Milieubewust rijgedrag (brandstofverbruik)", lessons: [], mastered: false, score: 0 },
        { id: 23, name: "Situatiebeva/tzing (gevaarherkenning)", lessons: [], mastered: false, score: 0 },
        { id: 24, name: "Zelfstandig route rijden", lessons: [], mastered: false, score: 0 },
        { id: 25, name: "Bijzondere situaties", lessons: [], mastered: false, score: 0 },
        { id: 26, name: "Bijzondere manouvers", lessons: [], mastered: false, score: 0 },
      ]
    }
  ]
};

interface ProgressReportProps {
  onBack: () => void;
}

export const ProgressReport = ({ onBack }: ProgressReportProps) => {
  const totalCompetencies = mockProgressData.phases.reduce((acc, phase) => acc + phase.competencies.length, 0);
  const masteredCompetencies = mockProgressData.phases.reduce(
    (acc, phase) => acc + phase.competencies.filter(c => c.mastered).length, 
    0
  );
  const overallProgress = (masteredCompetencies / totalCompetencies) * 100;

  const getScoreColor = (score: number) => {
    if (score >= 4) return "text-green-600 bg-green-100";
    if (score >= 3) return "text-yellow-600 bg-yellow-100";
    if (score >= 2) return "text-orange-600 bg-orange-100";
    return "text-red-600 bg-red-100";
  };

  const getScoreLabel = (score: number) => {
    if (score === 0) return "Niet gestart";
    if (score <= 2) return "In ontwikkeling";
    if (score === 3) return "Voldoende";
    if (score === 4) return "Goed";
    return "Uitstekend";
  };

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" onClick={onBack} className="text-muted-foreground hover:text-foreground">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Terug naar Dashboard
        </Button>
        <div className="h-6 w-px bg-border"></div>
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            Voortgangsrapport
          </h1>
          <p className="text-muted-foreground">
            {mockProgressData.studentName} • {mockProgressData.totalLessons} lessen voltooid
          </p>
        </div>
      </div>

      {/* Overall Progress */}
      <Card className="border-2 shadow-lg bg-gradient-to-br from-primary/5 to-primary/10">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-primary" />
            Algemene Voortgang
          </CardTitle>
          <CardDescription>
            Je hebt {masteredCompetencies} van {totalCompetencies} competenties onder de knie
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="font-medium">Totale voortgang</span>
              <span className="text-primary font-bold">{Math.round(overallProgress)}%</span>
            </div>
            <Progress value={overallProgress} className="h-3" />
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
            {mockProgressData.phases.map((phase) => (
              <div key={phase.phase} className="text-center">
                <div className={`text-2xl font-bold bg-gradient-to-r ${phase.color} bg-clip-text text-transparent`}>
                  {Math.round(phase.progress)}%
                </div>
                <div className="text-xs text-muted-foreground mt-1">Fase {phase.phase}</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Phases */}
      <div className="space-y-6">
        {mockProgressData.phases.map((phase) => (
          <Card 
            key={phase.phase} 
            className={`border-l-4 ${phase.borderColor} shadow-md hover:shadow-lg transition-shadow`}
          >
            <CardHeader className={phase.bgColor}>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <div className={`w-10 h-10 rounded-full bg-gradient-to-r ${phase.color} flex items-center justify-center text-white font-bold`}>
                      {phase.phase}
                    </div>
                    {phase.name}
                  </CardTitle>
                  <CardDescription className="mt-2">
                    {phase.competencies.filter(c => c.mastered).length} / {phase.competencies.length} competenties beheerst
                  </CardDescription>
                </div>
                <div className="text-right">
                  <div className={`text-3xl font-bold bg-gradient-to-r ${phase.color} bg-clip-text text-transparent`}>
                    {Math.round(phase.progress)}%
                  </div>
                  {phase.phase === mockProgressData.currentPhase && (
                    <Badge className="mt-2 bg-gradient-to-r from-blue-500 to-blue-600">
                      Huidige Fase
                    </Badge>
                  )}
                </div>
              </div>
              <Progress value={phase.progress} className="h-2 mt-4" />
            </CardHeader>
            <CardContent className="pt-6">
              <div className="space-y-3">
                {phase.competencies.map((competency) => (
                  <div 
                    key={competency.id} 
                    className="flex items-center justify-between p-3 rounded-lg bg-card hover:bg-accent/50 transition-colors border"
                  >
                    <div className="flex items-center gap-3 flex-1">
                      <div className="flex-shrink-0">
                        {competency.mastered ? (
                          <CheckCircle2 className="h-5 w-5 text-green-600" />
                        ) : (
                          <Circle className="h-5 w-5 text-muted-foreground" />
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="font-medium text-sm">{competency.name}</div>
                        {competency.lessons.length > 0 && (
                          <div className="text-xs text-muted-foreground mt-1">
                            Geoefend in les: {competency.lessons.join(", ")}
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Badge 
                        variant="outline" 
                        className={`font-semibold ${getScoreColor(competency.score)}`}
                      >
                        {getScoreLabel(competency.score)}
                      </Badge>
                      <div className="text-right min-w-[60px]">
                        <div className="text-lg font-bold">{competency.score}/5</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Legend */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Leeswijzer</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded bg-red-100"></div>
              <span className="text-sm">0-1: Niet gestart</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded bg-orange-100"></div>
              <span className="text-sm">2: In ontwikkeling</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded bg-yellow-100"></div>
              <span className="text-sm">3: Voldoende</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded bg-green-100"></div>
              <span className="text-sm">4: Goed</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded bg-green-200"></div>
              <span className="text-sm">5: Uitstekend</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Next Steps */}
      <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-2 border-blue-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5 text-blue-600" />
            Volgende Stappen
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <p className="text-sm font-medium">Focus voor de komende lessen:</p>
            <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
              <li>Naar rechts van richting veranderen - meer oefening nodig</li>
              <li>Parkeren - basistechniek verbeteren</li>
              <li>Achteruit rijden in bochten - nog niet voldoende beheerst</li>
            </ul>
            <Button className="mt-4 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600">
              <Award className="h-4 w-4 mr-2" />
              Plan Volgende Les
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
