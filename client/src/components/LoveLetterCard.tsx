import { format } from "date-fns";
import { Heart, Edit2, Trash2 } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export interface LoveLetter {
  id: string;
  title: string;
  content: string;
  date: Date;
  from: string;
}

interface LoveLetterCardProps {
  letter: LoveLetter;
  onEdit?: (letter: LoveLetter) => void;
  onDelete?: (id: string) => void;
  onClick?: (letter: LoveLetter) => void;
}

export default function LoveLetterCard({ 
  letter, 
  onEdit, 
  onDelete,
  onClick 
}: LoveLetterCardProps) {
  return (
    <Card 
      className="p-6 hover-elevate cursor-pointer group"
      onClick={() => onClick?.(letter)}
      data-testid={`card-letter-${letter.id}`}
    >
      <div className="flex items-start justify-between gap-4 mb-4">
        <div className="flex items-center gap-2 text-primary">
          <Heart className="w-4 h-4 fill-current" />
          <span className="text-sm font-medium">From {letter.from}</span>
        </div>
        <span className="text-xs text-muted-foreground">
          {format(letter.date, "MMM d, yyyy")}
        </span>
      </div>

      <h3 
        className="font-serif text-xl font-semibold text-foreground mb-3"
        data-testid={`text-letter-title-${letter.id}`}
      >
        {letter.title}
      </h3>

      <p 
        className="text-muted-foreground line-clamp-3 leading-relaxed"
        data-testid={`text-letter-preview-${letter.id}`}
      >
        {letter.content}
      </p>

      {(onEdit || onDelete) && (
        <div 
          className="flex gap-2 mt-4 pt-4 border-t border-border opacity-0 group-hover:opacity-100 transition-opacity"
          onClick={(e) => e.stopPropagation()}
        >
          {onEdit && (
            <Button 
              size="sm" 
              variant="ghost"
              onClick={() => onEdit(letter)}
              data-testid={`button-edit-letter-${letter.id}`}
            >
              <Edit2 className="w-4 h-4 mr-1" />
              Edit
            </Button>
          )}
          {onDelete && (
            <Button 
              size="sm" 
              variant="ghost"
              className="text-destructive hover:text-destructive"
              onClick={() => onDelete(letter.id)}
              data-testid={`button-delete-letter-${letter.id}`}
            >
              <Trash2 className="w-4 h-4 mr-1" />
              Delete
            </Button>
          )}
        </div>
      )}
    </Card>
  );
}
