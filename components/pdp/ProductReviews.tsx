"use client";

import React, { useState } from "react";
import { Review } from "@/types/commerce";
import { ThumbsUp, CheckCircle, Star, PenLine, X } from "lucide-react";

interface ProductReviewsProps {
  productId: string;
  initialRating: number;
  initialReviewCount: number;
}

const SAMPLE_REVIEWS: Review[] = [
  {
    id: "rev-1",
    productId: "all",
    author: "Henrik S.",
    location: "Stockholm, Sweden",
    rating: 5,
    title: "Weight and acoustic transparency exceed all expectations",
    content:
      "The density of the unibody aluminum is immediately striking. In a room with untreated oak floors, there is zero acoustic cabinet vibration even at high volume output. The volume knurling has genuine hydraulic dampening.",
    date: "February 24, 2026",
    verifiedPurchase: true,
    helpfulCount: 28,
  },
  {
    id: "rev-2",
    productId: "all",
    author: "Elena M.",
    location: "Zurich, Switzerland",
    rating: 5,
    title: "Quiet luxury in the truest sense of the phrase",
    content:
      "Arrived in molded pulp packaging with a signed inspection certificate. The finish is velvety and does not attract fingerprint oils. A magnificent piece of industrial design that will outlive several generations of phones.",
    date: "January 19, 2026",
    verifiedPurchase: true,
    helpfulCount: 14,
  },
  {
    id: "rev-3",
    productId: "all",
    author: "David K.",
    location: "London, UK",
    rating: 4,
    title: "Remarkable craft; substantial presence",
    content:
      "Noticeably heavier than photographs convey. Bluetooth pairing was instantaneous without needing a companion tracking app or mandatory user account. Pure hardware honesty.",
    date: "December 12, 2025",
    verifiedPurchase: true,
    helpfulCount: 9,
  },
];

export function ProductReviews({
  productId,
  initialRating,
  initialReviewCount,
}: ProductReviewsProps) {
  const [reviews, setReviews] = useState<Review[]>(SAMPLE_REVIEWS);
  const [helpfulVoted, setHelpfulVoted] = useState<Record<string, boolean>>({});
  const [isFormOpen, setIsFormOpen] = useState(false);

  // Form state
  const [author, setAuthor] = useState("");
  const [location, setLocation] = useState("");
  const [rating, setRating] = useState(5);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleVoteHelpful = (id: string) => {
    if (helpfulVoted[id]) return;
    setReviews((prev) =>
      prev.map((r) => (r.id === id ? { ...r, helpfulCount: r.helpfulCount + 1 } : r))
    );
    setHelpfulVoted((prev) => ({ ...prev, [id]: true }));
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!author || !title || !content) return;

    const newReview: Review = {
      id: `rev-${Date.now()}`,
      productId,
      author,
      location: location || "Global Patron",
      rating,
      title,
      content,
      date: "Just now",
      verifiedPurchase: true,
      helpfulCount: 0,
    };

    setReviews([newReview, ...reviews]);
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setIsFormOpen(false);
      setAuthor("");
      setLocation("");
      setTitle("");
      setContent("");
    }, 1200);
  };

  return (
    <section className="space-y-10 border-t border-border pt-16">
      {/* Header and Rating Distribution */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-8 border-b border-border">
        <div>
          <span className="text-xs font-mono uppercase tracking-widest text-ink-muted block mb-1">
            Client Verification
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl text-ink font-normal">
            Evaluations & Reflections
          </h2>
        </div>

        <div className="flex items-center gap-8">
          <div className="text-center md:text-right">
            <div className="font-mono text-3xl font-medium text-ink">
              {initialRating.toFixed(1)}
            </div>
            <div className="text-accent text-sm">&#9733;&#9733;&#9733;&#9733;&#9733;</div>
            <div className="text-[11px] font-mono text-ink-muted">
              {initialReviewCount} Verified Patrons
            </div>
          </div>

          <button
            onClick={() => setIsFormOpen(true)}
            className="flex items-center gap-2 bg-surface border border-border hover:border-ink px-4 py-2.5 text-xs font-mono uppercase tracking-wider text-ink transition-colors"
          >
            <PenLine className="w-3.5 h-3.5 text-accent" />
            <span>Submit Evaluation</span>
          </button>
        </div>
      </div>

      {/* Review Submission Modal / Drawer */}
      {isFormOpen && (
        <div className="bg-surface-stone/40 border border-border p-6 sm:p-8 space-y-6">
          <div className="flex items-center justify-between border-b border-border pb-3">
            <h3 className="text-xs font-mono uppercase tracking-widest text-ink font-medium">
              Submit Patron Evaluation
            </h3>
            <button
              onClick={() => setIsFormOpen(false)}
              className="text-ink-muted hover:text-ink"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {submitted ? (
            <div className="p-4 bg-surface border border-border text-center text-xs text-ink font-mono">
              Thank you. Your reflection has been committed to the public ledger.
            </div>
          ) : (
            <form onSubmit={handleFormSubmit} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-mono uppercase tracking-wider text-[10px] text-ink-muted mb-1">
                    Your Name
                  </label>
                  <input
                    type="text"
                    required
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                    placeholder="e.g. Marcus L."
                    className="w-full bg-surface border border-border px-3 py-2 text-ink focus:outline-none focus:border-ink rounded-none"
                  />
                </div>
                <div>
                  <label className="block font-mono uppercase tracking-wider text-[10px] text-ink-muted mb-1">
                    Location
                  </label>
                  <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="e.g. Kyoto, Japan"
                    className="w-full bg-surface border border-border px-3 py-2 text-ink focus:outline-none focus:border-ink rounded-none"
                  />
                </div>
              </div>

              <div>
                <label className="block font-mono uppercase tracking-wider text-[10px] text-ink-muted mb-1">
                  Rating Calibration
                </label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                      className={`px-3 py-1.5 border font-mono text-xs ${
                        rating >= star
                          ? "border-ink bg-ink text-canvas"
                          : "border-border bg-surface text-ink-muted"
                      }`}
                    >
                      {star} ★
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block font-mono uppercase tracking-wider text-[10px] text-ink-muted mb-1">
                  Reflection Title
                </label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Summary of your experience..."
                  className="w-full bg-surface border border-border px-3 py-2 text-ink focus:outline-none focus:border-ink rounded-none"
                />
              </div>

              <div>
                <label className="block font-mono uppercase tracking-wider text-[10px] text-ink-muted mb-1">
                  Observations on Form, Material & Performance
                </label>
                <textarea
                  required
                  rows={4}
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Detailed notes on tactile quality, acoustic depth, or domestic fit..."
                  className="w-full bg-surface border border-border p-3 text-ink focus:outline-none focus:border-ink rounded-none"
                />
              </div>

              <div className="pt-2 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsFormOpen(false)}
                  className="px-4 py-2 border border-border text-ink-secondary hover:text-ink font-mono uppercase text-xs"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-ink text-canvas hover:bg-ink-secondary font-mono uppercase text-xs tracking-wider"
                >
                  Commit Evaluation
                </button>
              </div>
            </form>
          )}
        </div>
      )}

      {/* Review List */}
      <div className="space-y-6 divide-y divide-border">
        {reviews.map((rev) => (
          <div key={rev.id} className="pt-6 first:pt-0 space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
              <div className="flex items-center gap-2">
                <span className="font-medium text-ink">{rev.author}</span>
                <span className="text-ink-muted font-mono">&bull; {rev.location}</span>
                {rev.verifiedPurchase && (
                  <span className="inline-flex items-center gap-1 text-[10px] font-mono text-accent bg-accent-light px-2 py-0.5 border border-accent/20">
                    <CheckCircle className="w-3 h-3" />
                    <span>Verified Commission</span>
                  </span>
                )}
              </div>

              <div className="flex items-center gap-3 text-ink-muted text-[11px] font-mono">
                <span className="text-accent">&#9733;&#9733;&#9733;&#9733;&#9733;</span>
                <span>{rev.date}</span>
              </div>
            </div>

            <h3 className="font-serif text-base text-ink font-medium">
              {rev.title}
            </h3>

            <p className="text-xs sm:text-sm text-ink-secondary leading-relaxed">
              {rev.content}
            </p>

            <div className="pt-2">
              <button
                onClick={() => handleVoteHelpful(rev.id)}
                disabled={helpfulVoted[rev.id]}
                className={`inline-flex items-center gap-1.5 text-[11px] font-mono transition-colors ${
                  helpfulVoted[rev.id]
                    ? "text-accent font-medium"
                    : "text-ink-muted hover:text-ink"
                }`}
              >
                <ThumbsUp className="w-3 h-3" />
                <span>
                  Helpful ({rev.helpfulCount})
                  {helpfulVoted[rev.id] && " &bull; Acknowledged"}
                </span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
