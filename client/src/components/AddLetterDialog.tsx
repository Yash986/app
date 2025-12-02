import { useState, useEffect } from "react";
import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { LoveLetter } from "./LoveLetterCard";

interface AddLetterDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (letter: Omit<LoveLetter, "id" | "date"> & { id?: string }) => void;
  editLetter?: LoveLetter | null;
}

export default function AddLetterDialog({
  open,
  onOpenChange,
  onSave,
  editLetter,
}: AddLetterDialogProps) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [from, setFrom] = useState("Me");

  useEffect(() => {
    if (editLetter) {
      setTitle(editLetter.title);
      setContent(editLetter.content);
      setFrom(editLetter.from);
    } else {
      setTitle("");
      setContent("");
      setFrom("Me");
    }
  }, [editLetter, open]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      id: editLetter?.id,
      title,
      content,
      from,
    });
    onOpenChange(false);
  };

  const isEditing = !!editLetter;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg" data-testid="dialog-add-letter">
        <DialogHeader>
          <DialogTitle className="font-serif text-2xl flex items-center gap-2">
            <Heart className="w-5 h-5 text-primary" />
            {isEditing ? "Edit Letter" : "Write a Love Letter"}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6 py-4">
          <div className="space-y-2">
            <Label htmlFor="from">From</Label>
            <Select value={from} onValueChange={setFrom}>
              <SelectTrigger data-testid="select-letter-from">
                <SelectValue placeholder="Who is writing?" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Me">Me</SelectItem>
                <SelectItem value="You">You</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              placeholder="Give your letter a title..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="text-lg"
              required
              data-testid="input-letter-title"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="content">Your Letter</Label>
            <Textarea
              id="content"
              placeholder="Pour your heart out..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={8}
              className="resize-none leading-relaxed"
              required
              data-testid="input-letter-content"
            />
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              data-testid="button-cancel-letter"
            >
              Cancel
            </Button>
            <Button type="submit" data-testid="button-save-letter">
              {isEditing ? "Save Changes" : "Send with Love"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
