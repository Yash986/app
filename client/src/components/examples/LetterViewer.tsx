import { useState } from "react";
import { Button } from "@/components/ui/button";
import LetterViewer from "../LetterViewer";

export default function LetterViewerExample() {
  const [open, setOpen] = useState(false);

  const mockLetter = {
    id: "1",
    title: "To My Everything",
    content: `Every day with you feels like a beautiful dream I never want to wake up from. Your smile lights up my world, and your laughter is my favorite sound.

I am so grateful that fate brought us together. You make me want to be a better person, and I fall in love with you more and more each day.

Thank you for being you. Thank you for loving me. Thank you for every moment we share.

Forever yours.`,
    date: new Date("2024-02-14"),
    from: "Me"
  };

  return (
    <div className="p-8 flex flex-col items-center gap-4">
      <Button onClick={() => setOpen(true)}>
        View Letter
      </Button>
      
      <LetterViewer
        letter={mockLetter}
        open={open}
        onOpenChange={setOpen}
      />
    </div>
  );
}
