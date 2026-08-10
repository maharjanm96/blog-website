"use client";

import { BlogPost } from "@/lib/data/posts";
import { ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Badge } from "../ui/badge";

interface ArticleCardProps {
  post: BlogPost;
}

export const ArticleCard: React.FC<ArticleCardProps> = ({ post }) => {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group flex flex-col h-full bg-white dark:bg-[#121316] hover:bg-neutral-50/80 dark:hover:bg-[#16181d] border border-neutral-200 dark:border-neutral-800/80 hover:border-neutral-300 dark:hover:border-neutral-700/80 rounded-2xl p-4 transition-all duration-300 shadow-md hover:shadow-xl hover:-translate-y-0.5"
    >
      {/* Cover Image */}
      <div className="relative w-full aspect-[16/10] rounded-xl overflow-hidden mb-4 bg-neutral-100 dark:bg-neutral-900 shrink-0">
        {post.category && (
          <Badge
            variant="secondary"
            className="absolute top-2.5 left-2.5 z-10 bg-white/90 dark:bg-neutral-950/80 backdrop-blur-md text-neutral-900 dark:text-neutral-200 border border-neutral-200 dark:border-neutral-800/80 px-2.5 py-0.5 text-xs font-medium shadow-sm"
          >
            {post.category}
          </Badge>
        )}
        {post.coverImage ? (
          <Image
            src={post.coverImage}
            alt={post.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div
            className={`w-full h-full ${post.gradient || "bg-neutral-200 dark:bg-neutral-800"}`}
          />
        )}
      </div>

      {/* Main Content Area */}
      <div className="flex flex-col flex-grow justify-between">
        <div>
          {/* Date & Tags */}
          <div className="flex flex-wrap items-center gap-2 mb-2">
            <span className="text-xs text-neutral-500 dark:text-neutral-400 font-normal">
              {post.date}
            </span>
          </div>
          {post.tags && post.tags.length > 0 && (
            <div className="mb-2">
              <div className="flex flex-wrap items-center justify-start gap-1.5">
                {post.tags.map((tag, idx) => (
                  <Badge
                    key={idx}
                    variant="outline"
                    className="text-[11px] px-2 py-0 h-4.5 border-neutral-200 dark:border-neutral-800 bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-200 font-normal rounded-full"
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {/* Title */}
          <h3 className="text-base font-bold text-neutral-900 dark:text-white leading-snug group-hover:text-blue-600 dark:group-hover:text-neutral-100 transition-colors line-clamp-2 mb-2">
            {post.title}
          </h3>

          {/* Description */}
          {post.description && (
            <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed line-clamp-2 mb-6">
              {post.description}
            </p>
          )}
        </div>

        {/* Footer: Author & Read > */}
        <div className="flex items-center justify-between mt-5 pt-3 border-t border-neutral-200/80 dark:border-neutral-900/40">
          <div className="flex flex-col gap-1">
            {post.authors.map((author, index) => (
              <div key={index} className="flex items-center gap-2">
                <Avatar className="h-6 w-6 border border-neutral-200 dark:border-neutral-700">
                  <AvatarImage src={author.avatar} alt={author.name} />
                  <AvatarFallback className="bg-neutral-200 dark:bg-neutral-800 text-xs text-neutral-800 dark:text-white">
                    {author.name.slice(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <span className="text-xs font-medium text-neutral-700 dark:text-neutral-300">
                  {author.name}
                </span>
              </div>
            ))}
          </div>

          <span className="text-blue-600 dark:text-blue-500 hover:text-blue-700 dark:hover:text-blue-400 font-medium text-sm inline-flex items-center gap-0.5 transition-colors self-end">
            Read <ChevronRight className="h-4 w-4" />
          </span>
        </div>
      </div>
    </Link>
  );
};

