"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { BlogPost } from "@/lib/data/posts";
import { ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface HeroCardProps {
  post: BlogPost;
}

export const HeroCard: React.FC<HeroCardProps> = ({ post }) => {
  return (
    <div className="group relative w-full bg-white dark:bg-[#121316] text-neutral-900 dark:text-white rounded-2xl sm:rounded-3xl border border-neutral-200 dark:border-neutral-800/80 p-4 sm:p-6 lg:p-8 transition-all duration-300 hover:shadow-2xl">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 lg:gap-10 items-center">
        {/* Left Column: Image / Gradient Cover */}
        <div className="md:col-span-6 lg:col-span-5 relative w-full aspect-4/3 rounded-xl sm:rounded-2xl overflow-hidden bg-neutral-100 dark:bg-neutral-900 shadow-inner shrink-0">
          {post.coverImage ? (
            <Image
              src={post.coverImage}
              alt={post.title}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
          ) : (
            <div
              className={`w-full h-full ${post.gradient || "bg-gradient-to-tr from-pink-500 via-red-500 to-purple-600"} transition-transform duration-700 group-hover:scale-105`}
            />
          )}

          {post.featured && (
            <div className="absolute top-3 left-3 z-10 px-3 py-1 text-xs font-semibold text-neutral-900 dark:text-white bg-white/90 dark:bg-neutral-950/80 backdrop-blur-md border border-neutral-200/90 dark:border-neutral-800/80 rounded-full shadow-md">
              Featured Story
            </div>
          )}
        </div>

        {/* Right Column: Article Details */}
        <div className="md:col-span-6 lg:col-span-7 flex flex-col justify-between h-full space-y-4">
          <div className="space-y-3">
            {/* Category & Date */}
            <div className="flex flex-wrap items-center gap-2">
              {post.category && (
                <Badge
                  variant="secondary"
                  className="bg-blue-100 dark:bg-blue-950/80 text-blue-800 dark:text-blue-300 border border-blue-200 dark:border-blue-800/80 px-2.5 py-0.5 text-xs font-semibold rounded-full"
                >
                  {post.category}
                </Badge>
              )}
              <span className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 font-medium tracking-wide">
                {post.category ? `• ${post.date}` : post.date}
              </span>
            </div>

            {/* Title */}
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-neutral-900 dark:text-white leading-snug tracking-tight group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2">
              <Link
                href={`/blog/${post.slug}`}
                className="hover:underline underline-offset-4"
              >
                {post.title}
              </Link>
            </h2>

            {/* Description */}
            <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-300 leading-relaxed line-clamp-3">
              {post.description}
            </p>

            {/* Tags Pills */}
            {post.tags && post.tags.length > 0 && (
              <div className="pt-1 flex flex-wrap items-center gap-1.5">
                {post.tags.map((tag, idx) => (
                  <Badge
                    key={idx}
                    variant="outline"
                    className="text-xs px-2.5 py-0.5 border-neutral-200 dark:border-neutral-800 bg-neutral-100/80 dark:bg-neutral-800/80 text-neutral-700 dark:text-neutral-300 font-normal rounded-full hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors"
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
            )}
          </div>

          {/* Footer: Authors list & Read > */}
          <div className="flex items-end justify-between pt-4 mt-auto border-t border-neutral-200 dark:border-neutral-800/80">
            {/* Authors */}
            <div className="flex flex-col gap-2 min-w-0 pr-4">
              {post.authors.map((author, index) => (
                <div key={index} className="flex items-center gap-2.5">
                  <Avatar className="size-6 border border-neutral-200 dark:border-neutral-700 shrink-0">
                    <AvatarImage src={author.avatar} alt={author.name} />
                    <AvatarFallback className="bg-neutral-100 dark:bg-neutral-800 text-[10px] font-bold text-neutral-800 dark:text-white">
                      {author.name.slice(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <span className="text-xs sm:text-sm font-medium text-neutral-700 dark:text-neutral-300 truncate">
                    {author.name}
                  </span>
                </div>
              ))}
            </div>

            {/* Read > Button */}
            <Link
              href={`/blog/${post.slug}`}
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-neutral-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors shrink-0 group/link"
            >
              <span>Read</span>
              <ChevronRight className="w-4 h-4 transition-transform duration-200 group-hover/link:translate-x-1" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
