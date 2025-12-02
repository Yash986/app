import { format } from "date-fns";
import { Heart, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogDescription,
} from "@/components/ui/dialog";
import type { LoveLetter } from "./LoveLetterCard";

interface LetterViewerProps {
  letter: LoveLetter | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function LetterViewer({ letter, open, onOpenChange }: LetterViewerProps) {
  if (!letter) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent 
        className="sm:max-w-2xl max-h-[90vh] overflow-y-auto"
        data-testid="dialog-view-letter"
      >
        <DialogHeader className="sr-only">
          <span>{letter.title}</span>
          <DialogDescription>A love letter from {letter.from}</DialogDescription>
        </DialogHeader>
        
        <Button
          size="icon"
          variant="ghost"
          className="absolute right-4 top-4"
          onClick={() => onOpenChange(false)}
          data-testid="button-close-letter"
        >
          <X className="w-4 h-4" />
        </Button>

        <div className="py-6">
          <div className="flex items-center gap-2 text-primary mb-6">
            <Heart className="w-5 h-5 fill-current" />
            <span className="font-medium">From {letter.from}</span>
            <span className="text-muted-foreground">•</span>
            <span className="text-muted-foreground text-sm">
              {format(letter.date, "MMMM d, yyyy")}
            </span>
          </div>

          <h2 
            className="font-serif text-3xl font-bold text-foreground mb-8"
            data-testid="text-letter-full-title"
          >
            {letter.title}
          </h2>

          <div 
            className="prose prose-lg dark:prose-invert max-w-none"
            data-testid="text-letter-full-content"
          >
            {letter.content.split('\n').map((paragraph, index) => (
              <p key={index} className="text-foreground/90 leading-relaxed mb-4">
                {paragraph}
              </p>
            ))}
          </div>

          <div className="mt-12 pt-6 border-t border-border text-center">
            <Heart className="w-6 h-6 text-primary fill-primary/30 mx-auto mb-2" />
            <p className="text-sm text-muted-foreground italic">
              Written with all my love
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
