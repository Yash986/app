import { Heart, Leaf } from "lucide-react";

interface FooterProps {
  startDate?: Date;
  quote?: string;
}

export default function Footer({ 
  startDate,
  quote = "In all the world, there is no heart for me like yours."
}: FooterProps) {
  const daysTogether = startDate 
    ? Math.floor((new Date().getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24))
    : null;

  return (
    <footer 
      className="relative py-16 px-6 bg-gradient-to-t from-primary/5 to-background overflow-hidden"
      data-testid="footer-section"
    >
      <div className="absolute inset-0 pointer-events-none">
        <Leaf className="absolute bottom-10 left-[5%] w-8 h-8 text-primary/10 rotate-45" />
        <Leaf className="absolute bottom-20 right-[10%] w-6 h-6 text-primary/15 -rotate-12" />
      </div>

      <div className="relative max-w-2xl mx-auto text-center space-y-6">
        <div className="flex justify-center">
          <div className="flex items-center gap-1">
            <Leaf className="w-5 h-5 text-primary/40 rotate-45" />
            <Heart className="w-6 h-6 text-primary fill-primary/30" />
            <Leaf className="w-5 h-5 text-primary/40 -rotate-45 scale-x-[-1]" />
          </div>
        </div>

        <blockquote 
          className="font-serif text-xl md:text-2xl text-foreground/80 italic"
          data-testid="text-footer-quote"
        >
          "{quote}"
        </blockquote>

        {daysTogether !== null && (
          <div className="pt-4">
            <p className="text-sm text-muted-foreground uppercase tracking-widest mb-1">
              Together for
            </p>
            <p 
              className="text-3xl font-serif font-bold text-primary"
              data-testid="text-days-count"
            >
              {daysTogether.toLocaleString()} days
            </p>
          </div>
        )}

        <p className="text-sm text-muted-foreground pt-6">
          Made with <Heart className="w-3 h-3 inline-block text-primary fill-primary" /> for you
        </p>
      </div>
    </footer>
  );
}
