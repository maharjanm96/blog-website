"use client";

import { HeroCard } from "@/components/hero/hero-card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import { MOCK_POSTS } from "@/lib/data/posts";
import React, { useEffect, useMemo, useState } from "react";

export const HeroSection: React.FC = () => {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  // Filter featured posts
  const featuredPosts = useMemo(() => {
    return MOCK_POSTS.filter((post) => post.featured === true);
  }, []);

  // Set up carousel API and slide state listeners
  useEffect(() => {
    if (!api) return;

    const updateState = () => {
      setCount(api.scrollSnapList().length);
      setCurrent(api.selectedScrollSnap());
    };

    // Defer initial sync to avoid synchronous setState calls inside the effect body
    queueMicrotask(updateState);

    api.on("select", updateState);
    api.on("reInit", updateState);

    return () => {
      api.off("select", updateState);
      api.off("reInit", updateState);
    };
  }, [api]);

  // Autoplay functionality: cycle every 5 seconds
  useEffect(() => {
    if (!api || featuredPosts.length <= 1) return;

    const timer = setInterval(() => {
      if (api.canScrollNext()) {
        api.scrollNext();
      } else {
        api.scrollTo(0);
      }
    }, 5000);

    return () => clearInterval(timer);
  }, [api, featuredPosts.length]);

  return (
    <section className="w-full">
      {/* Carousel Container */}
      <div className="relative w-full">
        {featuredPosts.length > 0 ? (
          <div className="space-y-4">
            <Carousel
              setApi={setApi}
              opts={{
                align: "start",
                loop: true,
              }}
              className="w-full"
            >
              <CarouselContent className="ml-0">
                {featuredPosts.map((post) => (
                  <CarouselItem key={post.id} className="pl-0 basis-full ">
                    <HeroCard post={post} />
                  </CarouselItem>
                ))}
              </CarouselContent>

              {/* Positioned Left/Right Controls on hover */}
              {/* {featuredPosts.length > 1 && (
                <>
                  <CarouselPrevious className="hidden sm:flex absolute left-4 top-1/2 -translate-y-1/2 z-20 border border-neutral-200 dark:border-neutral-800 bg-white/90 dark:bg-neutral-950/80 text-neutral-900 dark:text-white hover:bg-neutral-100 dark:hover:bg-neutral-900 hover:text-blue-600 dark:hover:text-white shadow-xl backdrop-blur-sm size-10 transition-colors" />
                  <CarouselNext className="hidden sm:flex absolute right-4 top-1/2 -translate-y-1/2 z-20 border border-neutral-200 dark:border-neutral-800 bg-white/90 dark:bg-neutral-950/80 text-neutral-900 dark:text-white hover:bg-neutral-100 dark:hover:bg-neutral-900 hover:text-blue-600 dark:hover:text-white shadow-xl backdrop-blur-sm size-10 transition-colors" />
                </>
              )} */}
            </Carousel>

            {/* Carousel Dot Indicators */}
            {count > 1 && (
              <div className="flex items-center justify-center gap-2 pt-2">
                {Array.from({ length: count }).map((_, index) => (
                  <button
                    key={index}
                    onClick={() => api?.scrollTo(index)}
                    className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                      current === index
                        ? "w-8 bg-neutral-900 dark:bg-white"
                        : "w-2 bg-neutral-300 dark:bg-neutral-700 hover:bg-neutral-400 dark:hover:bg-neutral-500"
                    }`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
            )}
          </div>
        ) : (
          <div className="text-center py-16 text-neutral-500 dark:text-neutral-400 bg-neutral-50 dark:bg-neutral-950 rounded-2xl border border-neutral-200 dark:border-neutral-900">
            No featured articles found.
          </div>
        )}
      </div>
    </section>
  );
};
