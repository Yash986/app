import LoveLetterCard from "../LoveLetterCard";

export default function LoveLetterCardExample() {
  const mockLetter = {
    id: "1",
    title: "To My Everything",
    content: "Every day with you feels like a beautiful dream I never want to wake up from. Your smile lights up my world, and your laughter is my favorite sound. I am so grateful that fate brought us together.",
    date: new Date("2024-02-14"),
    from: "Me"
  };

  return (
    <div className="p-8 max-w-md mx-auto">
      <LoveLetterCard 
        letter={mockLetter}
        onEdit={(l) => console.log("Edit:", l)}
        onDelete={(id) => console.log("Delete:", id)}
        onClick={(l) => console.log("Clicked:", l)}
      />
    </div>
  );
}
