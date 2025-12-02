import MemoryCard from "../MemoryCard";

export default function MemoryCardExample() {
  const mockMemory = {
    id: "1",
    title: "Our First Date",
    description: "The day we met at that cozy coffee shop downtown. You were wearing that green dress, and I couldn't stop smiling the entire time.",
    date: new Date("2023-06-15"),
    imageUrl: "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=800&auto=format&fit=crop"
  };

  return (
    <div className="p-8 max-w-5xl mx-auto">
      <MemoryCard 
        memory={mockMemory}
        index={0}
        onEdit={(m) => console.log("Edit:", m)}
        onDelete={(id) => console.log("Delete:", id)}
        isVisible={true}
      />
    </div>
  );
}
