"use client";

import React from "react";
import { cn } from "@/lib/utils";

export const CATEGORIES = [
  "All",
  "Festivals",
  "Culture",
  "Jatra",
  "Dance",
  "History",
  "Story",
] as const;

export type Category = (typeof CATEGORIES)[number];


interface CategoryFilterProps {
  activeCategory: string;
  onSelectCategory: (category: string) => void;
  className?: string;
}

export const CategoryFilter: React.FC<CategoryFilterProps> = ({
  activeCategory,
  onSelectCategory,
  className,
}) => {
  return (
    <div
      className={cn(
        "flex items-center gap-2 overflow-x-auto py-2 no-scrollbar scroll-smooth",
        className
      )}
    >
      {CATEGORIES.map((category) => {
        const isActive = activeCategory === category;
        return (
          <button
            key={category}
            onClick={() => onSelectCategory(category)}
            className={cn(
              "px-4 py-1.5 text-sm font-medium transition-all duration-200 rounded-full cursor-pointer whitespace-nowrap",
              isActive
                ? "bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 border border-neutral-900 dark:border-white shadow-sm"
                : "text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-200/60 dark:hover:bg-neutral-900/50"
            )}
          >
            {category}
          </button>

        );
      })}
    </div>
  );
};
