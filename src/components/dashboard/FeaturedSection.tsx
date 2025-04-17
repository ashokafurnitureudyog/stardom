"use client";

export const FeaturedSection = () => {
  return (
    <div>
      <div className="mb-8">
        <h2 className="text-3xl font-light mb-2">Featured Products</h2>
        <p className="text-muted-foreground">Drag to reorder featured items</p>
      </div>

      <div className="space-y-4">
        {[1, 2, 3].map((item) => (
          <div
            key={item}
            className="h-24 bg-secondary/30 rounded-lg animate-pulse"
          />
        ))}
      </div>
    </div>
  );
};
