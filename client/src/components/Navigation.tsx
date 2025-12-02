import { Heart, Mail, Clock } from "lucide-react";
import { Link, useLocation } from "wouter";
import { cn } from "@/lib/utils";

const navItems = [
  { path: "/", label: "Timeline", icon: Clock },
  { path: "/letters", label: "Love Letters", icon: Mail },
];

export default function Navigation() {
  const [location] = useLocation();

  return (
    <nav 
      className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50"
      data-testid="navigation"
    >
      <div className="flex items-center gap-1 p-1.5 rounded-full bg-card/95 backdrop-blur-md border border-border shadow-lg">
        {navItems.map((item) => {
          const isActive = location === item.path;
          const Icon = item.icon;
          
          return (
            <Link key={item.path} href={item.path}>
              <a
                className={cn(
                  "flex items-center gap-2 px-4 py-2 rounded-full transition-all",
                  isActive 
                    ? "bg-primary text-primary-foreground" 
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                )}
                data-testid={`nav-${item.label.toLowerCase().replace(' ', '-')}`}
              >
                <Icon className="w-4 h-4" />
                <span className="text-sm font-medium">{item.label}</span>
              </a>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
