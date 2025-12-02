import { Heart, Plus, Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

interface HeaderProps {
  onAddMemory?: () => void;
  showAddButton?: boolean;
}

export default function Header({ onAddMemory, showAddButton = true }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const isDarkMode = document.documentElement.classList.contains("dark");
    setIsDark(isDarkMode);
  }, []);

  const toggleTheme = () => {
    const newIsDark = !isDark;
    setIsDark(newIsDark);
    document.documentElement.classList.toggle("dark", newIsDark);
    localStorage.setItem("theme", newIsDark ? "dark" : "light");
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-background/80 backdrop-blur-md border-b border-border"
          : "bg-transparent"
      }`}
      data-testid="header"
    >
      <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between gap-4">
        <a 
          href="/" 
          className="flex items-center gap-2 text-foreground hover:text-primary transition-colors"
          data-testid="link-home"
        >
          <Heart className="w-5 h-5 text-primary fill-primary/30" />
          <span className="font-serif text-lg font-semibold">Our Story</span>
        </a>

        <div className="flex items-center gap-2">
          <Button
            size="icon"
            variant="ghost"
            onClick={toggleTheme}
            data-testid="button-theme-toggle"
          >
            {isDark ? (
              <Sun className="w-5 h-5" />
            ) : (
              <Moon className="w-5 h-5" />
            )}
          </Button>

          {showAddButton && (
            <Button onClick={onAddMemory} data-testid="button-add-memory">
              <Plus className="w-4 h-4 mr-2" />
              Add Memory
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}
