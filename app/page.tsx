import { HeroSection } from "@/components/hero/hero-section";
import { ArticleGrid } from "@/components/articles/article-grid";

const Page = () => {
  return (
    <main className="flex-1 w-full max-w-7xl mx-auto px-4 md:px-8 pt-28 pb-16 space-y-12">
      <HeroSection />
      <ArticleGrid />
    </main>
  );
};

export default Page;


