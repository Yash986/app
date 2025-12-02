import { useEffect, useRef, useState } from "react";
import MemoryCard, { type Memory } from "./MemoryCard";
import { Leaf } from "lucide-react";

interface TimelineProps {
  memories: Memory[];
  onEdit?: (memory: Memory) => void;
  onDelete?: (id: string) => void;
}

export default function Timeline({ memories, onEdit, onDelete }: TimelineProps) {
  const [visibleCards, setVisibleCards] = useState<Set<string>>(new Set());
  const observerRef = useRef<IntersectionObserver | null>(null);
  const cardRefs = useRef<Map<string, HTMLDivElement>>(new Map());

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.getAttribute("data-memory-id");
            if (id) {
              setVisibleCards((prev) => new Set(Array.from(prev).concat(id)));
            }
          }
        });
      },
      { threshold: 0.2 }
    );

    cardRefs.current.forEach((ref) => {
      observerRef.current?.observe(ref);
    });

    return () => observerRef.current?.disconnect();
  }, [memories]);

  const sortedMemories = [...memories].sort(
    (a, b) => b.date.getTime() - a.date.getTime()
  );

  if (memories.length === 0) {
    return (
      <section className="py-24 px-6" data-testid="timeline-empty">
        <div className="max-w-md mx-auto text-center">
          <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-primary/10 flex items-center justify-center">
            <Leaf className="w-12 h-12 text-primary" />
          </div>
          <h2 className="font-serif text-2xl font-semibold text-foreground mb-3">
            No memories yet
          </h2>
          <p className="text-muted-foreground">
            Start creating beautiful memories together. Click the button below to add your first one.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 md:py-24 px-6" data-testid="timeline-section">
      <div className="max-w-5xl mx-auto relative">
        <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary/30 via-primary/20 to-transparent -translate-x-1/2" />

        <div className="space-y-16 md:space-y-24">
          {sortedMemories.map((memory, index) => (
            <div
              key={memory.id}
              ref={(el) => {
                if (el) cardRefs.current.set(memory.id, el);
              }}
              data-memory-id={memory.id}
            >
              <MemoryCard
                memory={memory}
                index={index}
                onEdit={onEdit}
                onDelete={onDelete}
                isVisible={visibleCards.has(memory.id)}
              />
            </div>
          ))}
        </div>

        <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 bottom-0 w-8 h-8 rounded-full bg-primary/10 items-center justify-center">
          <div className="w-3 h-3 rounded-full bg-primary" />
        </div>
      </div>
    </section>
  );
}
