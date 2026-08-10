"use client";

import React, { useState } from "react";
import { Share2, Link2, Check, Bookmark } from "lucide-react";

export const ArticleShareButtons: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);

  const handleCopyLink = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleShareTwitter = () => {
    if (typeof window !== "undefined") {
      const url = encodeURIComponent(window.location.href);
      const text = encodeURIComponent("Check out this article on Nepalese Culture & Heritage!");
      window.open(`https://twitter.com/intent/tweet?url=${url}&text=${text}`, "_blank");
    }
  };

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={handleCopyLink}
        className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-neutral-300 bg-neutral-900 border border-neutral-800 hover:border-neutral-700 hover:text-white rounded-lg transition-all cursor-pointer"
        title="Copy article link"
      >
        {copied ? (
          <>
            <Check className="w-3.5 h-3.5 text-emerald-400" />
            <span className="text-emerald-400">Copied!</span>
          </>
        ) : (
          <>
            <Link2 className="w-3.5 h-3.5" />
            <span>Copy Link</span>
          </>
        )}
      </button>

      <button
        onClick={handleShareTwitter}
        className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-neutral-300 bg-neutral-900 border border-neutral-800 hover:border-neutral-700 hover:text-white rounded-lg transition-all cursor-pointer"
        title="Share on X (Twitter)"
      >
        <Share2 className="w-3.5 h-3.5" />
        <span>Share</span>
      </button>

      <button
        onClick={() => setBookmarked(!bookmarked)}
        className={`p-1.5 text-xs font-medium rounded-lg border transition-all cursor-pointer ${
          bookmarked
            ? "bg-amber-500/10 border-amber-500/30 text-amber-400"
            : "bg-neutral-900 border-neutral-800 text-neutral-400 hover:text-white hover:border-neutral-700"
        }`}
        title="Bookmark article"
      >
        <Bookmark className={`w-4 h-4 ${bookmarked ? "fill-amber-400" : ""}`} />
      </button>
    </div>
  );
};
