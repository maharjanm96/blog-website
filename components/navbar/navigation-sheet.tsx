import { Logo } from "@/components/navbar/logo";
import { NavMenu } from "@/components/navbar/nav-menu";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu } from "lucide-react";

export const NavigationSheet = () => {
  return (
    <Sheet>
      <SheetTrigger
        render={
          <Button
            data-slot="sheet-trigger"
            className="rounded-full border-neutral-200 dark:border-neutral-800 bg-neutral-100 dark:bg-neutral-900 text-foreground dark:text-white hover:bg-neutral-200 dark:hover:bg-neutral-800"
            size="icon"
            variant="outline"
          >
            <Menu className="h-5 w-5" />
          </Button>
        }
      />

      <SheetContent className="px-6 py-6 bg-background text-foreground border-border">
        <SheetHeader className="sr-only">
          <SheetTitle>Navigation Menu</SheetTitle>
        </SheetHeader>
        <div className="flex items-center justify-between">
          <Logo />
          <ThemeToggle />
        </div>
        <NavMenu className="mt-6 [&>div]:h-full" orientation="vertical" />
      </SheetContent>
    </Sheet>
  );
};



