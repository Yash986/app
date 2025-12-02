import Timeline from "../Timeline";

const mockMemories = [
  {
    id: "1",
    title: "Our First Date",
    description: "The day we met at that cozy coffee shop downtown. You were wearing that green dress, and I couldn't stop smiling the entire time.",
    date: new Date("2023-06-15"),
    imageUrl: "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=800&auto=format&fit=crop"
  },
  {
    id: "2", 
    title: "Beach Sunset",
    description: "Walking along the shore as the sun painted the sky in shades of orange and pink. You held my hand and said this was your favorite place.",
    date: new Date("2023-08-20"),
    imageUrl: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&auto=format&fit=crop"
  },
  {
    id: "3",
    title: "Mountain Adventure", 
    description: "We conquered that hiking trail together. The view from the top was breathtaking, but nothing compared to seeing your smile.",
    date: new Date("2023-10-05"),
    imageUrl: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&auto=format&fit=crop"
  }
];

export default function TimelineExample() {
  return (
    <div className="bg-background min-h-screen">
      <Timeline 
        memories={mockMemories}
        onEdit={(m) => console.log("Edit:", m)}
        onDelete={(id) => console.log("Delete:", id)}
      />
    </div>
  );
}
