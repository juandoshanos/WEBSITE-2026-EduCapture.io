import { ArrowLeft, Bell, Settings, User, Languages } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useTranslation } from "@/hooks/useTranslation";
import { Language } from "@/lib/translations";

interface NavigationProps {
  role: 'student' | 'instructor';
  onBack: () => void;
  userName?: string;
  userAvatar?: string;
  language?: Language;
  onLanguageChange?: (lang: string) => void;
}

export const Navigation = ({ role, onBack, userName = "User", userAvatar, language = "EN", onLanguageChange }: NavigationProps) => {
  const { t } = useTranslation(language);
  const getRoleDisplay = () => role === 'student' ? t('studentDashboard') : t('instructorDashboard');
  
  return (
    <nav className="bg-card border-b border-border shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center gap-4">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={onBack}
              className="text-muted-foreground hover:text-foreground"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              {t('backToHome')}
            </Button>
            <div className="h-6 w-px bg-border"></div>
            <div>
              <h1 className="text-lg font-semibold text-foreground">{t('driveLearnAcademy')}</h1>
              <p className="text-sm text-muted-foreground">{getRoleDisplay()}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => onLanguageChange?.(language === "EN" ? "NL" : "EN")}
              className="text-muted-foreground hover:text-foreground font-medium"
            >
              <Languages className="h-4 w-4 mr-1" />
              {language}
            </Button>
            <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
              <Bell className="h-4 w-4" />
            </Button>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 rounded-full p-0">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={userAvatar} />
                    <AvatarFallback className="bg-gradient-primary text-primary-foreground text-xs">
                      {userName.split(' ').map(n => n[0]).join('').toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <div className="flex items-center justify-start gap-2 p-2">
                  <div className="flex flex-col space-y-1 leading-none">
                    <p className="font-medium">{userName}</p>
                    <p className="w-[200px] truncate text-sm text-muted-foreground">
                      {getRoleDisplay()}
                    </p>
                  </div>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <User className="mr-2 h-4 w-4" />
                  {t('profile')}
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Settings className="mr-2 h-4 w-4" />
                  {t('settings')}
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={onBack}>
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  {t('switchRole')}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </nav>
  );
};