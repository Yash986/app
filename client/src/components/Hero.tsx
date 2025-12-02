import { Heart, ChevronDown, Leaf } from "lucide-react";

interface HeroProps {
  title?: string;
  subtitle?: string;
  startDate?: Date;
  onScrollClick?: () => void;
}

export default function Hero({ 
  title = "Our Love Story", 
  subtitle = "Every moment with you is a memory I'll treasure forever",
  startDate,
  onScrollClick 
}: HeroProps) {
  const daysTogether = startDate 
    ? Math.floor((new Date().getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24))
    : null;

  return (
    <section 
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-primary/5 via-background to-background"
      data-testid="hero-section"
    >
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <Leaf 
          className="absolute top-20 left-[10%] w-12 h-12 text-primary/20 animate-float" 
        />
        <Leaf 
          className="absolute top-40 right-[15%] w-8 h-8 text-primary/15 animate-float-delayed rotate-45" 
        />
        <Leaf 
          className="absolute bottom-40 left-[20%] w-10 h-10 text-primary/10 animate-float rotate-90" 
        />
        <Leaf 
          className="absolute top-60 left-[70%] w-6 h-6 text-primary/20 animate-float-delayed -rotate-45" 
        />
        <Heart 
          className="absolute bottom-60 right-[10%] w-8 h-8 text-primary/15 animate-float" 
        />
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/5 via-transparent to-transparent" />
      </div>

      <div className="relative z-10 text-center px-6 max-w-3xl mx-auto">
        <div className="mb-6 flex justify-center">
          <Heart className="w-12 h-12 text-primary fill-primary/20" data-testid="icon-heart" />
        </div>
        
        <h1 
          className="font-serif text-5xl md:text-7xl font-bold text-foreground mb-6 tracking-tight"
          data-testid="text-hero-title"
        >
          {title}
        </h1>
        
        <p 
          className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-8 max-w-xl mx-auto"
          data-testid="text-hero-subtitle"
        >
          {subtitle}
        </p>

        {daysTogether !== null && (
          <div 
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary mb-12"
            data-testid="text-days-together"
          >
            <Heart className="w-4 h-4 fill-current" />
            <span className="text-sm font-medium">{daysTogether} days together</span>
          </div>
        )}

        <button
          onClick={onScrollClick}
          className="group flex flex-col items-center gap-2 mx-auto text-muted-foreground hover:text-primary transition-colors"
          data-testid="button-scroll-down"
        >
          <span className="text-sm uppercase tracking-widest">Begin Our Journey</span>
          <ChevronDown className="w-6 h-6 animate-bounce" />
        </button>
      </div>
    </section>
  );
}
