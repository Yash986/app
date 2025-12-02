import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import AddMemoryDialog from "../AddMemoryDialog";

export default function AddMemoryDialogExample() {
  const [open, setOpen] = useState(false);

  return (
    <div className="p-8 flex flex-col items-center gap-4">
      <Button onClick={() => setOpen(true)}>
        <Plus className="w-4 h-4 mr-2" />
        Add Memory
      </Button>
      
      <AddMemoryDialog
        open={open}
        onOpenChange={setOpen}
        onSave={(memory) => {
          console.log("Memory saved:", memory);
        }}
      />
    </div>
  );
}
