"use client";

import { Logo } from "@/components/navbar/logo";
import { NavMenu } from "@/components/navbar/nav-menu";
import { NavigationSheet } from "@/components/navbar/navigation-sheet";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { Mails } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const Navbar = () => {
  const [isVisible, setIsVisible] = useState(true);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Always keep navbar visible near the top of the page
      if (currentScrollY < 20) {
        setIsVisible(true);
        lastScrollY.current = currentScrollY;
        return;
      }

      // Hide on scroll down (> 10px delta), show on scroll up (< -10px delta)
      if (currentScrollY > lastScrollY.current + 10) {
        setIsVisible(false);
      } else if (currentScrollY < lastScrollY.current - 10) {
        setIsVisible(true);
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed inset-x-4 top-6 z-50 mx-auto flex h-16 max-w-7xl items-center justify-between rounded-full border border-neutral-200/80 dark:border-neutral-800/80 bg-white/85 dark:bg-neutral-950/80 px-6 backdrop-blur-md text-foreground dark:text-white shadow-lg transition-all duration-300 ease-in-out ${
        isVisible
          ? "translate-y-0 opacity-100"
          : "-translate-y-28 opacity-0 pointer-events-none"
      }`}
    >
      <Logo />

      {/* Desktop Menu */}
      <NavMenu className="hidden md:block" />

      <div className="flex items-center gap-3">
        <Button
          className="hidden gap-3 sm:inline-flex"
          size="lg"
          variant="secondary"
        >
          <Mails />
          <span className="hidden lg:inline">Subscribe to our newsletter</span>
          <span className="hidden md:inline lg:hidden">Subscribe</span>
        </Button>

        {/* Theme Toggle Button */}
        <ThemeToggle />

        {/* Mobile Menu */}
        <div className="md:hidden">
          <NavigationSheet />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

