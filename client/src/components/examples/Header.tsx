import Header from "../Header";

export default function HeaderExample() {
  return (
    <div className="h-32 bg-gradient-to-b from-primary/10 to-background">
      <Header onAddMemory={() => console.log("Add memory clicked")} />
    </div>
  );
}
