import { useState } from "react";
import { Heart, Plus, Moon, Sun, Feather } from "lucide-react";
import { Button } from "@/components/ui/button";
import LoveLetterCard, { type LoveLetter } from "@/components/LoveLetterCard";
import AddLetterDialog from "@/components/AddLetterDialog";
import LetterViewer from "@/components/LetterViewer";
import Navigation from "@/components/Navigation";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useToast } from "@/hooks/use-toast";
import { useEffect } from "react";

// todo: remove mock functionality - replace with real data from backend
const initialLetters: LoveLetter[] = [
  {
    id: "1",
    title: "To My Everything",
    content: `Every day with you feels like a beautiful dream I never want to wake up from. Your smile lights up my world, and your laughter is my favorite sound.

I am so grateful that fate brought us together. You make me want to be a better person, and I fall in love with you more and more each day.

Thank you for being you. Thank you for loving me. Thank you for every moment we share.

Forever yours.`,
    date: new Date("2024-02-14"),
    from: "Me"
  },
  {
    id: "2",
    title: "My Promise to You",
    content: `I promise to always be there for you, through the storms and the sunshine. I promise to hold your hand when you're scared and celebrate with you when you succeed.

I promise to make you laugh, even when you want to be serious. I promise to listen when you need to talk and give you space when you need to think.

Most of all, I promise to love you unconditionally, today, tomorrow, and always.`,
    date: new Date("2024-01-03"),
    from: "Me"
  }
];

export default function LoveLetters() {
  const { toast } = useToast();
  const [isDark, setIsDark] = useState(false);
  
  // todo: remove mock functionality - use react-query to fetch from backend
  const [letters, setLetters] = useState<LoveLetter[]>(initialLetters);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editLetter, setEditLetter] = useState<LoveLetter | null>(null);
  const [viewLetter, setViewLetter] = useState<LoveLetter | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  useEffect(() => {
    setIsDark(document.documentElement.classList.contains("dark"));
  }, []);

  const toggleTheme = () => {
    const newIsDark = !isDark;
    setIsDark(newIsDark);
    document.documentElement.classList.toggle("dark", newIsDark);
    localStorage.setItem("theme", newIsDark ? "dark" : "light");
  };

  const handleAddLetter = () => {
    setEditLetter(null);
    setDialogOpen(true);
  };

  const handleEditLetter = (letter: LoveLetter) => {
    setEditLetter(letter);
    setDialogOpen(true);
  };

  const handleViewLetter = (letter: LoveLetter) => {
    setViewLetter(letter);
  };

  const handleSaveLetter = (letterData: Omit<LoveLetter, "id" | "date"> & { id?: string }) => {
    if (letterData.id) {
      // todo: remove mock functionality - use mutation to update on backend
      setLetters((prev) =>
        prev.map((l) =>
          l.id === letterData.id 
            ? { ...letterData, id: l.id, date: l.date } as LoveLetter 
            : l
        )
      );
      toast({
        title: "Letter updated",
        description: "Your letter has been saved.",
      });
    } else {
      // todo: remove mock functionality - use mutation to create on backend
      const newLetter: LoveLetter = {
        ...letterData,
        id: crypto.randomUUID(),
        date: new Date(),
      };
      setLetters((prev) => [newLetter, ...prev]);
      toast({
        title: "Letter sent",
        description: "Your love letter has been added.",
      });
    }
  };

  const handleDeleteLetter = (id: string) => {
    setDeleteConfirmId(id);
  };

  const confirmDelete = () => {
    if (deleteConfirmId) {
      // todo: remove mock functionality - use mutation to delete on backend
      setLetters((prev) => prev.filter((l) => l.id !== deleteConfirmId));
      toast({
        title: "Letter deleted",
        description: "The letter has been removed.",
      });
      setDeleteConfirmId(null);
    }
  };

  return (
    <div className="min-h-screen bg-background pb-24">
      <header className="sticky top-0 z-40 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Feather className="w-5 h-5 text-primary" />
            <span className="font-serif text-lg font-semibold">Love Letters</span>
          </div>

          <div className="flex items-center gap-2">
            <Button
              size="icon"
              variant="ghost"
              onClick={toggleTheme}
              data-testid="button-theme-toggle"
            >
              {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </Button>

            <Button onClick={handleAddLetter} data-testid="button-write-letter">
              <Plus className="w-4 h-4 mr-2" />
              Write Letter
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-12">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
            <Heart className="w-8 h-8 text-primary fill-primary/30" />
          </div>
          <h1 className="font-serif text-4xl font-bold text-foreground mb-3">
            Our Love Letters
          </h1>
          <p className="text-muted-foreground max-w-md mx-auto">
            Words from the heart, written with love. A collection of our most precious thoughts and feelings.
          </p>
        </div>

        {letters.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-muted flex items-center justify-center">
              <Feather className="w-10 h-10 text-muted-foreground/50" />
            </div>
            <h2 className="font-serif text-xl font-semibold text-foreground mb-2">
              No letters yet
            </h2>
            <p className="text-muted-foreground mb-6">
              Write your first love letter to start this beautiful collection.
            </p>
            <Button onClick={handleAddLetter}>
              <Plus className="w-4 h-4 mr-2" />
              Write Your First Letter
            </Button>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2">
            {letters.map((letter) => (
              <LoveLetterCard
                key={letter.id}
                letter={letter}
                onEdit={handleEditLetter}
                onDelete={handleDeleteLetter}
                onClick={handleViewLetter}
              />
            ))}
          </div>
        )}
      </main>

      <Navigation />

      <AddLetterDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        onSave={handleSaveLetter}
        editLetter={editLetter}
      />

      <LetterViewer
        letter={viewLetter}
        open={!!viewLetter}
        onOpenChange={(open) => !open && setViewLetter(null)}
      />

      <AlertDialog open={!!deleteConfirmId} onOpenChange={() => setDeleteConfirmId(null)}>
        <AlertDialogContent data-testid="dialog-delete-letter-confirm">
          <AlertDialogHeader>
            <AlertDialogTitle>Delete this letter?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This love letter will be permanently removed.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel data-testid="button-cancel-delete-letter">Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmDelete}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              data-testid="button-confirm-delete-letter"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
