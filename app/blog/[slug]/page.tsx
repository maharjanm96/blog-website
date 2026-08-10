import { ArticleCard } from "@/components/articles/article-card";
import { ArticleShareButtons } from "@/components/articles/article-share";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { getPostBySlug, getRelatedPosts } from "@/lib/data/posts";
import { ArrowLeft, BadgeCheck, Calendar, Clock, Tag } from "lucide-react";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return {
      title: "Article Not Found | Cultures of Nepal",
      description: "The requested article could not be found.",
    };
  }

  return {
    title: `${post.title} | Cultures of Nepal`,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      images: post.coverImage ? [post.coverImage] : [],
    },
  };
}

export default async function ArticleDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const relatedPosts = getRelatedPosts(post.slug, post.category, 3);
  const readingTime =
    Math.max(3, Math.ceil(post.description.length / 50)) + " min read";

  return (
    <main className="flex-1 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-20 space-y-12 mt-10">
      {/* Top Navigation & Breadcrumbs */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-neutral-200 dark:border-neutral-900 pb-4">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs font-medium text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors cursor-pointer group w-fit"
        >
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          <span>Back to Articles</span>
        </Link>

        <div className="flex items-center gap-2 text-xs text-neutral-500">
          <Link
            href="/"
            className="hover:text-neutral-800 dark:hover:text-neutral-300"
          >
            Home
          </Link>
          <span>/</span>
          <span className="text-neutral-700 dark:text-neutral-400 font-medium">
            {post.category}
          </span>
        </div>
      </div>

      {/* Article Header */}
      <header className="space-y-6">
        {/* Category & Tags Badges */}
        <div className="flex flex-wrap items-center gap-2">
          <Badge
            variant="secondary"
            className="bg-blue-100 dark:bg-blue-950/60 text-blue-800 dark:text-blue-300 border border-blue-200 dark:border-blue-800/40 px-3 py-1 text-xs font-semibold rounded-full"
          >
            {post.category}
          </Badge>

          {post.tags &&
            post.tags.map((tag, idx) => (
              <Badge
                key={idx}
                variant="outline"
                className="text-xs px-2.5 py-0.5 border-neutral-200 dark:border-neutral-800 bg-neutral-100 dark:bg-neutral-900/80 text-neutral-700 dark:text-neutral-300 rounded-full"
              >
                {tag}
              </Badge>
            ))}
        </div>

        {/* Title */}
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-neutral-900 dark:text-white tracking-tight leading-tight">
          {post.title}
        </h1>

        {/* Lead Subtitle / Description */}
        <p className="text-base sm:text-xl text-neutral-600 dark:text-neutral-300 leading-relaxed font-normal">
          {post.description}
        </p>

        {/* Author Bar & Actions */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 py-4 border-y border-neutral-200 dark:border-neutral-900">
          {/* Authors */}
          <div className="flex items-center gap-3">
            <div className="flex -space-x-2 overflow-hidden">
              {post.authors.map((author, index) => (
                <Avatar
                  key={index}
                  className="inline-block size-9 ring-2 ring-background border border-neutral-200 dark:border-neutral-800"
                >
                  <AvatarImage src={author.avatar} alt={author.name} />
                  <AvatarFallback className="bg-neutral-200 dark:bg-neutral-800 text-xs font-bold text-neutral-900 dark:text-white">
                    {author.name.slice(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
              ))}
            </div>

            <div className="flex flex-col">
              <span className="text-xs font-semibold text-neutral-900 dark:text-white">
                {post.authors.map((a) => a.name).join(", ")}
              </span>
              <div className="flex items-center gap-2 text-[11px] text-neutral-500 dark:text-neutral-400">
                <span className="flex items-center gap-1">
                  <Calendar className="w-3 h-3 text-neutral-500" />
                  {post.date}
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3 text-neutral-500" />
                  {readingTime}
                </span>
              </div>
            </div>
          </div>

          {/* Share Actions */}
          <ArticleShareButtons />
        </div>
      </header>

      {/* Featured Cover Image */}
      <div className="relative w-full aspect-[16/9] rounded-2xl overflow-hidden bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800/80 shadow-xl">
        {post.coverImage ? (
          <Image
            src={post.coverImage}
            alt={post.title}
            fill
            priority
            sizes="(max-width: 1200px) 100vw, 900px"
            className="object-cover"
          />
        ) : (
          <div
            className={`w-full h-full ${post.gradient || "bg-gradient-to-tr from-neutral-200 via-neutral-100 to-neutral-200 dark:from-neutral-900 dark:via-neutral-800 dark:to-neutral-900"}`}
          />
        )}
      </div>

      {/* Article Content Body */}
      <article className="prose dark:prose-invert max-w-none space-y-8 text-neutral-700 dark:text-neutral-300 leading-relaxed text-base sm:text-lg">
        {/* Section 1: Overview */}
        <section className="space-y-4">
          <h2 className="text-2xl sm:text-3xl font-bold text-neutral-900 dark:text-white tracking-tight flex items-center gap-2.5">
            Historical Context & Origins
          </h2>
          <p>
            Nepal’s rich tapestry of cultural heritage is deeply anchored in
            traditions passed down through generations. {post.description} The
            Kathmandu Valley and surrounding historic settlements like Patan,
            Bhaktapur, and Panauti offer unmatched living history, where sacred
            rituals seamlessly merge with everyday communal life.
          </p>
          <p>
            Dating back centuries, festivities and Jatras serve not only as
            religious observances but also as societal anchors. They unite
            communities, bring ancient lore to life through sacred masked
            dances, and honour the divine protectors of ancient cities.
          </p>
        </section>

        {/* Highlight Callout Box */}
        <div className="my-8 p-6 bg-amber-500/10 dark:bg-neutral-900/90 border-l-4 border-amber-500 rounded-r-2xl space-y-2 shadow-md">
          <h3 className="text-lg font-semibold text-amber-700 dark:text-amber-300 flex items-center gap-2">
            <Tag className="w-4 h-4" /> Cultural Key Takeaway
          </h3>
          <p className="text-sm sm:text-base text-neutral-800 dark:text-neutral-200 italic">
            &quot;Heritage is not merely preserved in stone temples or sacred
            manuscripts—it lives vibrantly through the collective spirit of
            those who dance, chant, and celebrate every year.&quot;
          </p>
        </div>

        {/* Section 2: Rituals & Celebrations */}
        <section className="space-y-4">
          <h2 className="text-2xl sm:text-3xl font-bold text-neutral-900 dark:text-white tracking-tight">
            Sacred Rituals & Community Traditions
          </h2>
          <p>
            During this event, priests and locals perform elaborate rites
            starting early in the morning. Traditional musical ensembles playing{" "}
            <em>dhime</em> drums, <em>bhushya</em> cymbals, and flutes echo
            across chowks and narrow alleyways, signaling the start of sacred
            processions.
          </p>

          <ul className="list-disc list-inside space-y-2 text-neutral-700 dark:text-neutral-300 pl-2">
            <li>
              <strong className="text-neutral-900 dark:text-white">
                Consecrated Offerings:
              </strong>{" "}
              Devotees present rice, flowers, vermilion powder, and sacred lamps
              to local deities.
            </li>
            <li>
              <strong className="text-neutral-900 dark:text-white">
                Processions & Chariots:
              </strong>{" "}
              Magnificent palanquins and chariots are carried through historic
              quarters.
            </li>
            <li>
              <strong className="text-neutral-900 dark:text-white">
                Masked Sacred Dances:
              </strong>{" "}
              Performers embody divine spirits through centuries-old
              choreographies.
            </li>
          </ul>
        </section>

        {/* Section 3: Preservation & Modern Significance */}
        <section className="space-y-4">
          <h2 className="text-2xl sm:text-3xl font-bold text-neutral-900 dark:text-white tracking-tight">
            Preserving Heritage for Future Generations
          </h2>
          <p>
            In an era of rapid modernization, young Nepalese activists, cultural
            scholars, and local guthi associations are playing a vital role in
            documenting and preserving these sacred customs. By telling these
            stories digitally, we bridge ancient tradition with global
            appreciation.
          </p>
        </section>
      </article>

      {/* Author Bio Card */}
      <div className="p-6 bg-neutral-50 dark:bg-[#121316] border border-neutral-200 dark:border-neutral-800/80 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center gap-4 shadow-xl">
        <Avatar className="size-16 border-2 border-neutral-300 dark:border-neutral-700 shrink-0">
          <AvatarImage
            src={post.authors[0]?.avatar}
            alt={post.authors[0]?.name}
          />
          <AvatarFallback className="bg-neutral-200 dark:bg-neutral-800 text-lg font-bold text-neutral-900 dark:text-white">
            CN
          </AvatarFallback>
        </Avatar>

        <div className="space-y-1 flex-1">
          <div className="flex items-center justify-between">
            <h4 className="text-base font-bold text-neutral-900 dark:text-white">
              Written by {post.authors.map((a) => a.name).join(", ")}
            </h4>
            <span className="flex items-center gap-1 justify-center text-xs font-semibold text-white dark:text-white bg-blue-500 dark:bg-blue-600 px-2.5 py-1 rounded-full">
              <BadgeCheck className="text-white h-4 w-4 " />
              Verified Creator
            </span>
          </div>
          <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
            Dedicated to documenting, preserving, and celebrating Nepalese
            heritage, festivals, art forms, and sacred traditions across
            Kathmandu Valley and beyond.
          </p>
        </div>
      </div>

      {/* Related Articles Section */}
      {relatedPosts.length > 0 && (
        <section className="space-y-6 pt-6 border-t border-neutral-200 dark:border-neutral-900">
          <div className="flex items-center justify-between">
            <h3 className="text-xl sm:text-2xl font-bold text-neutral-900 dark:text-white tracking-tight">
              Related Articles
            </h3>
            <Link
              href="/"
              className="text-xs font-medium text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
            >
              Explore all articles &rarr;
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedPosts.map((relatedPost) => (
              <ArticleCard key={relatedPost.id} post={relatedPost} />
            ))}
          </div>
        </section>
      )}
    </main>
  );
}
