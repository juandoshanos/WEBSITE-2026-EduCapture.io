import { ArrowLeft, Download, Heart, Play, Pause, Share2, Star, Volume2, Video } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { useState } from "react";

const mockHighlights = [
  {
    "id": 1,
    "title": "Krappe Doorgang met Tegenligger",
    "duration": "0:20",
    "timestamp": "00:00",
    "description": "Navigeren door een smalle straat in een woonwijk met geparkeerde auto's en een tegemoetkomend voertuig.",
    "category": "Gevarenperceptie",
    "rating": 3,
    "thumbnail": "/placeholder.svg",
    "video_url": "/videos/video1.mp4"
  },
  {
    "id": 2,
    "title": "Uitrijden naar Druk Plein",
    "duration": "0:22",
    "timestamp": "00:00",
    "description": "Navigeren door een smalle steeg met voetgangers en het benaderen van een onoverzichtelijk kruispunt met dwarsverkeer.",
    "category": "Kruispunten",
    "rating": 5,
    "thumbnail": "/placeholder.svg",
    "video_url": "/videos/video2.mp4"
  },
  {
    "id": 3,
    "title": "Passeren en Zebrapad",
    "duration": "0:25",
    "timestamp": "00:00",
    "description": "Vlotte passage van een geparkeerd voertuig met tegenligger, gevolgd door het naderen van een voorrangssituatie.",
    "category": "Gevarenperceptie",
    "rating": 4,
    "thumbnail": "/placeholder.svg",
    "video_url": "/videos/video3.mp4"
  }
];

interface HighlightsViewerProps {
  lessonId?: number;
  studentId?: number;
  onBack: () => void;
  role: 'student' | 'instructor';
}

export const HighlightsViewer = ({ lessonId, studentId, onBack, role }: HighlightsViewerProps) => {
  const [selectedHighlight, setSelectedHighlight] = useState<number | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState([75]);
  const [progress, setProgress] = useState([0]);



  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const getTitle = () => {
    if (role === 'student') {
      return lessonId ? "Les Hoogtepunten" : "Al Jouw Hoogtepunten";
    }
    return studentId ? "Student Hoogtepunten" : "Alle Hoogtepunten";
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
          <h1 className="text-2xl font-bold">{getTitle()}</h1>
          <p className="text-muted-foreground">
            {role === 'instructor' ? 'Bekijk en beheer les hoogtepunten' : 'Bekijk jouw beste rijmomenten'}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Video Player */}
        <div className="lg:col-span-2 space-y-4">
          <Card className="overflow-hidden shadow-elegant">
            <CardContent className="p-0">
              <div className="relative bg-black aspect-video">
                {selectedHighlight ? (
                  <div className="w-full h-full">
                    <video
                      controls
                      autoPlay
                      muted
                      playsInline
                      preload="metadata"
                      className="w-full h-full object-contain"
                      src={mockHighlights.find(h => h.id === selectedHighlight)?.video_url}
                      key={selectedHighlight}
                      onError={(e) => {
                        const video = e.currentTarget;
                        console.error('Video error:', {
                          error: video.error,
                          code: video.error?.code,
                          message: video.error?.message,
                          src: video.src
                        });
                      }}
                      onLoadedData={() => {
                        console.log('Video loaded successfully!', {
                          src: mockHighlights.find(h => h.id === selectedHighlight)?.video_url,
                          duration: (document.querySelector('video') as HTMLVideoElement)?.duration
                        });
                      }}
                      onLoadStart={() => console.log('Video load started')}
                    >
                      Your browser does not support video playback.
                    </video>
                  </div>
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-muted">
                    <div className="text-center text-muted-foreground">
                      <Play className="h-16 w-16 mx-auto mb-4" />
                      <p className="text-lg font-medium">Selecteer een hoogtepunt om te bekijken</p>
                      <p className="text-sm">Kies uit de hoogtepuntenlijst om te beginnen</p>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Selected Highlight Details */}
          {selectedHighlight && (
            <Card className="animate-scale-in">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      {mockHighlights.find(h => h.id === selectedHighlight)?.title}
                      <Badge variant="outline">
                        {mockHighlights.find(h => h.id === selectedHighlight)?.category}
                      </Badge>
                    </CardTitle>
                    <CardDescription className="mt-2">
                      {mockHighlights.find(h => h.id === selectedHighlight)?.description}
                    </CardDescription>
                  </div>
                  <div className="flex items-center gap-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${i < (mockHighlights.find(h => h.id === selectedHighlight)?.rating || 0)
                          ? 'fill-warning text-warning'
                          : 'text-muted-foreground'
                          }`}
                      />
                    ))}
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline">
                    <Heart className="h-4 w-4 mr-2" />
                    Bewaar Favoriet
                  </Button>
                  <Button size="sm" variant="outline">
                    <Download className="h-4 w-4 mr-2" />
                    Download
                  </Button>
                  <Button size="sm" variant="outline">
                    <Share2 className="h-4 w-4 mr-2" />
                    Delen
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Highlights List */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold">Les Hoogtepunten</h2>
          <div className="space-y-3">
            {mockHighlights.map((highlight, index) => (
              <Card
                key={highlight.id}
                className={`cursor-pointer transition-all duration-300 hover:shadow-card animate-slide-up ${selectedHighlight === highlight.id
                  ? 'ring-2 ring-primary bg-primary/5'
                  : 'hover:bg-accent/50'
                  }`}
                style={{ animationDelay: `${index * 100}ms` }}
                onClick={() => setSelectedHighlight(highlight.id)}
              >
                <CardContent className="p-4">
                  <div className="flex gap-3">
                    <div className="w-16 h-12 bg-gradient-primary rounded-md flex items-center justify-center flex-shrink-0">
                      <Play className="h-5 w-5 text-primary-foreground" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-sm leading-tight mb-1">
                        {highlight.title}
                      </h3>
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <span>{highlight.duration}</span>
                        <span>at {highlight.timestamp}</span>
                      </div>
                      <div className="flex items-center justify-between mt-2">
                        <Badge variant="outline" className="text-xs">
                          {highlight.category}
                        </Badge>
                        <div className="flex items-center gap-1">
                          {Array.from({ length: highlight.rating }).map((_, i) => (
                            <Star key={i} className="h-3 w-3 fill-warning text-warning" />
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};