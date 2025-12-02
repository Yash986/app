import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";
import AddLetterDialog from "../AddLetterDialog";

export default function AddLetterDialogExample() {
  const [open, setOpen] = useState(false);

  return (
    <div className="p-8 flex flex-col items-center gap-4">
      <Button onClick={() => setOpen(true)}>
        <Heart className="w-4 h-4 mr-2" />
        Write a Letter
      </Button>
      
      <AddLetterDialog
        open={open}
        onOpenChange={setOpen}
        onSave={(letter) => {
          console.log("Letter saved:", letter);
        }}
      />
    </div>
  );
}
