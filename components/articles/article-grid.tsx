"use client";

import { ArticleCard } from "@/components/articles/article-card";
import { CategoryFilter } from "@/components/categories/category-filter";
import { GlobalSearch } from "@/components/search/global-search";
import { MOCK_POSTS } from "@/lib/data/posts";
import React, { useMemo, useState } from "react";

const INITIAL_VISIBLE_COUNT = 6;

export const ArticleGrid: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [visibleCount, setVisibleCount] = useState<number>(
    INITIAL_VISIBLE_COUNT,
  );

  const filteredPosts = useMemo(() => {
    return MOCK_POSTS.filter((post) => {
      // Category filter
      const matchesCategory =
        activeCategory === "All" ||
        post.category.toLowerCase() === activeCategory.toLowerCase() ||
        (post.tags &&
          post.tags.some(
            (t) => t.toLowerCase() === activeCategory.toLowerCase(),
          ));

      // Search query filter
      const query = searchQuery.trim().toLowerCase();
      const matchesSearch =
        !query ||
        post.title.toLowerCase().includes(query) ||
        post.description.toLowerCase().includes(query) ||
        post.category.toLowerCase().includes(query) ||
        (post.tags && post.tags.some((t) => t.toLowerCase().includes(query))) ||
        (post.authors &&
          post.authors.some((a) => a.name.toLowerCase().includes(query)));

      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  const visiblePosts = filteredPosts.slice(0, visibleCount);
  const hasMore = visibleCount < filteredPosts.length;

  const handleSelectCategory = (category: string) => {
    setActiveCategory(category);
    setVisibleCount(INITIAL_VISIBLE_COUNT);
  };

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
    setVisibleCount(INITIAL_VISIBLE_COUNT);
  };

  const handleLoadMore = () => {
    setVisibleCount((prev) => Math.min(prev + 3, filteredPosts.length));
  };

  return (
    <section className="w-full mt-14 space-y-8">
      {/* Section Header & Category Filter */}
      <div className="flex flex-col gap-4 border-b border-neutral-200 dark:border-neutral-900 pb-5">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-neutral-900 dark:text-white tracking-tight">
              Latest Articles
            </h2>
            <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-1">
              Explore our full collection of traditions, Jatras, and Nepalese
              cultural heritage.
            </p>
          </div>

          {/* Global Search Bar */}
          <div className="w-full md:w-72 lg:w-80 shrink-0">
            <GlobalSearch
              searchQuery={searchQuery}
              onSearchChange={handleSearchChange}
              placeholder="Search articles, tags..."
            />
          </div>
        </div>

        <CategoryFilter
          activeCategory={activeCategory}
          onSelectCategory={handleSelectCategory}
        />
      </div>

      {/* 3 Column Grid */}
      {visiblePosts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {visiblePosts.map((post) => (
            <ArticleCard key={post.id} post={post} />
          ))}
        </div>
      ) : (
        <div className="text-center py-40 text-neutral-600 dark:text-neutral-400 bg-neutral-100/60 dark:bg-neutral-950/60 rounded-2xl border border-neutral-200 dark:border-neutral-900">
          No articles found
          {searchQuery ? ` matching "${searchQuery}"` : ""}
          {activeCategory !== "All"
            ? ` under category "${activeCategory}"`
            : ""}
          .
        </div>
      )}

      {/* Load More Button */}
      {hasMore && (
        <div className="flex justify-center pt-6">
          <button
            onClick={handleLoadMore}
            className="px-6 py-2.5 text-xs font-semibold text-neutral-800 dark:text-neutral-200 bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-800 rounded-xl shadow-md transition-colors cursor-pointer"
          >
            Load more articles
          </button>
        </div>
      )}
    </section>
  );
};
