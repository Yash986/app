import { useState, useRef } from "react";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Timeline from "@/components/Timeline";
import Footer from "@/components/Footer";
import AddMemoryDialog from "@/components/AddMemoryDialog";
import Navigation from "@/components/Navigation";
import type { Memory } from "@/components/MemoryCard";
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

// todo: remove mock functionality - replace with real data from backend
const initialMemories: Memory[] = [
  {
    id: "1",
    title: "Our First Date",
    description:
      "The day we met at that cozy coffee shop downtown. You were wearing that green dress, and I couldn't stop smiling the entire time. We talked for hours and I knew right then that you were special.",
    date: new Date("2024-01-03"),
    imageUrl:
      "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=800&auto=format&fit=crop",
  },
  {
    id: "2",
    title: "Beach Sunset",
    description:
      "Walking along the shore as the sun painted the sky in shades of orange and pink. You held my hand and said this was your favorite place. I've never felt more at peace.",
    date: new Date("2024-08-20"),
    imageUrl:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&auto=format&fit=crop",
  },
  {
    id: "3",
    title: "Mountain Adventure",
    description:
      "We conquered that hiking trail together. The view from the top was breathtaking, but nothing compared to seeing your smile when we reached the summit.",
    date: new Date("2024-10-05"),
    imageUrl:
      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&auto=format&fit=crop",
  },
  {
    id: "4",
    title: "Our First Anniversary",
    description:
      "One whole year of adventures, laughter, and love. We celebrated with dinner at that little Italian restaurant where they played our song. Here's to many more years together.",
    date: new Date("2025-01-03"),
    imageUrl:
      "https://images.unsplash.com/photo-1529636798458-92182e662485?w=800&auto=format&fit=crop",
  },
];

// todo: remove mock functionality - this date should come from user settings
const relationshipStartDate = new Date("2024-01-03");

export default function Home() {
  const { toast } = useToast();
  const timelineRef = useRef<HTMLDivElement>(null);

  // todo: remove mock functionality - use react-query to fetch from backend
  const [memories, setMemories] = useState<Memory[]>(initialMemories);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editMemory, setEditMemory] = useState<Memory | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  const scrollToTimeline = () => {
    timelineRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleAddMemory = () => {
    setEditMemory(null);
    setDialogOpen(true);
  };

  const handleEditMemory = (memory: Memory) => {
    setEditMemory(memory);
    setDialogOpen(true);
  };

  const handleSaveMemory = (
    memoryData: Omit<Memory, "id"> & { id?: string },
  ) => {
    if (memoryData.id) {
      // todo: remove mock functionality - use mutation to update on backend
      setMemories((prev) =>
        prev.map((m) =>
          m.id === memoryData.id ? ({ ...memoryData, id: m.id } as Memory) : m,
        ),
      );
      toast({
        title: "Memory updated",
        description: "Your memory has been saved successfully.",
      });
    } else {
      // todo: remove mock functionality - use mutation to create on backend
      const newMemory: Memory = {
        ...memoryData,
        id: crypto.randomUUID(),
      };
      setMemories((prev) => [...prev, newMemory]);
      toast({
        title: "Memory added",
        description: "Your new memory has been added to the timeline.",
      });
    }
  };

  const handleDeleteMemory = (id: string) => {
    setDeleteConfirmId(id);
  };

  const confirmDelete = () => {
    if (deleteConfirmId) {
      // todo: remove mock functionality - use mutation to delete on backend
      setMemories((prev) => prev.filter((m) => m.id !== deleteConfirmId));
      toast({
        title: "Memory deleted",
        description: "The memory has been removed from your timeline.",
      });
      setDeleteConfirmId(null);
    }
  };

  return (
    <div className="min-h-screen bg-background pb-24">
      <Header onAddMemory={handleAddMemory} />

      <Hero
        title="Our Love Story"
        subtitle="Every moment with you is a memory I'll treasure forever"
        startDate={relationshipStartDate}
        onScrollClick={scrollToTimeline}
      />

      <div ref={timelineRef}>
        <Timeline
          memories={memories}
          onEdit={handleEditMemory}
          onDelete={handleDeleteMemory}
        />
      </div>

      <Footer
        startDate={relationshipStartDate}
        quote="In all the world, there is no heart for me like yours."
      />

      <Navigation />

      <AddMemoryDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        onSave={handleSaveMemory}
        editMemory={editMemory}
      />

      <AlertDialog
        open={!!deleteConfirmId}
        onOpenChange={() => setDeleteConfirmId(null)}
      >
        <AlertDialogContent data-testid="dialog-delete-confirm">
          <AlertDialogHeader>
            <AlertDialogTitle>Delete this memory?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This memory will be permanently
              removed from your timeline.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel data-testid="button-cancel-delete">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmDelete}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              data-testid="button-confirm-delete"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
