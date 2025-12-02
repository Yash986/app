import Hero from "../Hero";

export default function HeroExample() {
  return (
    <Hero 
      title="Our Love Story"
      subtitle="Every moment with you is a memory I'll treasure forever"
      startDate={new Date("2023-06-15")}
      onScrollClick={() => console.log("Scroll clicked")}
    />
  );
}
