import React from "react";
import BaseLayout from "@/components/layout/BaseLayout";

export const ProductNotFound = () => {
  return (
    <BaseLayout>
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-serif mb-4">Product Not Found</h2>
          <p className="text-muted-foreground">
            The product you&apos;re looking for doesn&apos;t exist or has been
            removed.
          </p>
        </div>
      </div>
    </BaseLayout>
  );
};
