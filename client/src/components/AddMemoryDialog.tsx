import { useState, useEffect } from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon, ImagePlus, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import type { Memory } from "./MemoryCard";

interface AddMemoryDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (memory: Omit<Memory, "id"> & { id?: string }) => void;
  editMemory?: Memory | null;
}

export default function AddMemoryDialog({
  open,
  onOpenChange,
  onSave,
  editMemory,
}: AddMemoryDialogProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState<Date>(new Date());
  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    if (editMemory) {
      setTitle(editMemory.title);
      setDescription(editMemory.description);
      setDate(editMemory.date);
      setImageUrl(editMemory.imageUrl || "");
    } else {
      setTitle("");
      setDescription("");
      setDate(new Date());
      setImageUrl("");
    }
  }, [editMemory, open]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      id: editMemory?.id,
      title,
      description,
      date,
      imageUrl: imageUrl || undefined,
    });
    onOpenChange(false);
  };

  const isEditing = !!editMemory;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg" data-testid="dialog-add-memory">
        <DialogHeader>
          <DialogTitle className="font-serif text-2xl">
            {isEditing ? "Edit Memory" : "Add New Memory"}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6 py-4">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              placeholder="What would you call this moment?"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="text-lg"
              required
              data-testid="input-memory-title"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="date">Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !date && "text-muted-foreground"
                  )}
                  data-testid="button-date-picker"
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? format(date, "MMMM d, yyyy") : "Pick a date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={(d) => d && setDate(d)}
                  initialFocus
                  data-testid="calendar-memory-date"
                />
              </PopoverContent>
            </Popover>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="Describe this beautiful memory..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
              required
              data-testid="input-memory-description"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="imageUrl">Image URL (optional)</Label>
            <div className="flex gap-2">
              <Input
                id="imageUrl"
                placeholder="https://..."
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                data-testid="input-memory-image"
              />
              {imageUrl && (
                <Button
                  type="button"
                  size="icon"
                  variant="ghost"
                  onClick={() => setImageUrl("")}
                  data-testid="button-clear-image"
                >
                  <X className="w-4 h-4" />
                </Button>
              )}
            </div>
            {imageUrl && (
              <div className="mt-3 relative aspect-video rounded-lg overflow-hidden bg-muted">
                <img
                  src={imageUrl}
                  alt="Preview"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
                  }}
                />
              </div>
            )}
            {!imageUrl && (
              <div className="mt-3 aspect-video rounded-lg border-2 border-dashed border-muted-foreground/25 flex items-center justify-center">
                <div className="text-center text-muted-foreground">
                  <ImagePlus className="w-8 h-8 mx-auto mb-2 opacity-50" />
                  <p className="text-sm">Paste an image URL above</p>
                </div>
              </div>
            )}
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              data-testid="button-cancel"
            >
              Cancel
            </Button>
            <Button type="submit" data-testid="button-save-memory">
              {isEditing ? "Save Changes" : "Add Memory"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
