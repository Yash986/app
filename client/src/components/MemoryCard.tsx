import { format } from "date-fns";
import { Calendar, Edit2, Trash2, ImageIcon } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export interface Memory {
  id: string;
  title: string;
  description: string;
  date: Date;
  imageUrl?: string;
}

interface MemoryCardProps {
  memory: Memory;
  index: number;
  onEdit?: (memory: Memory) => void;
  onDelete?: (id: string) => void;
  isVisible?: boolean;
}

export default function MemoryCard({ 
  memory, 
  index, 
  onEdit, 
  onDelete,
  isVisible = true 
}: MemoryCardProps) {
  const isEven = index % 2 === 0;

  return (
    <div 
      className={cn(
        "relative flex items-center gap-8 md:gap-12",
        isEven ? "md:flex-row" : "md:flex-row-reverse",
        "flex-col",
        isVisible ? "opacity-100" : "opacity-0",
        isVisible && (isEven ? "animate-fade-in-left" : "animate-fade-in-right")
      )}
      style={{ animationDelay: `${index * 150}ms` }}
      data-testid={`card-memory-${memory.id}`}
    >
      <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-primary border-4 border-background z-10" />

      <div className={cn(
        "w-full md:w-[calc(50%-2rem)]",
        isEven ? "md:pr-8" : "md:pl-8"
      )}>
        {memory.imageUrl ? (
          <div className="relative aspect-[4/3] rounded-2xl overflow-hidden group">
            <img 
              src={memory.imageUrl} 
              alt={memory.title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              data-testid={`img-memory-${memory.id}`}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
        ) : (
          <div className="aspect-[4/3] rounded-2xl bg-muted flex items-center justify-center">
            <ImageIcon className="w-12 h-12 text-muted-foreground/50" />
          </div>
        )}
      </div>

      <div className={cn(
        "w-full md:w-[calc(50%-2rem)] space-y-4",
        isEven ? "md:pl-8 md:text-left" : "md:pr-8 md:text-right",
        "text-center md:text-left"
      )}>
        <div className={cn(
          "inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-sm",
          isEven ? "" : "md:ml-auto"
        )}>
          <Calendar className="w-3.5 h-3.5" />
          <span className="uppercase tracking-wide font-medium" data-testid={`text-date-${memory.id}`}>
            {format(memory.date, "MMMM d, yyyy")}
          </span>
        </div>

        <Card className="p-6 hover-elevate">
          <h3 
            className="font-serif text-2xl md:text-3xl font-semibold text-foreground mb-3"
            data-testid={`text-title-${memory.id}`}
          >
            {memory.title}
          </h3>
          
          <p 
            className="text-muted-foreground leading-relaxed"
            data-testid={`text-description-${memory.id}`}
          >
            {memory.description}
          </p>

          {(onEdit || onDelete) && (
            <div className={cn(
              "flex gap-2 mt-4 pt-4 border-t border-border",
              isEven ? "justify-start" : "md:justify-end justify-start"
            )}>
              {onEdit && (
                <Button 
                  size="sm" 
                  variant="ghost"
                  onClick={() => onEdit(memory)}
                  data-testid={`button-edit-${memory.id}`}
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
                  onClick={() => onDelete(memory.id)}
                  data-testid={`button-delete-${memory.id}`}
                >
                  <Trash2 className="w-4 h-4 mr-1" />
                  Delete
                </Button>
              )}
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}
