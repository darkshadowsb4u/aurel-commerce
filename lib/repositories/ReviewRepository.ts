import {
  IReviewRepository,
  ProductReview,
  ReviewSummary,
  CreateReviewInput,
} from "@/types/repositories";

const REVIEWS_STORE: ProductReview[] = [
  {
    id: "rev-01",
    productId: "prod-sonus-a1",
    author: "Marcello V.",
    rating: 5,
    title: "Acoustic density unmatched by conventional speakers",
    content:
      "The physical weight of the anodized billet gives it complete acoustic dampening. Low-end distortion is virtually zero even at high sound pressures. A permanent fixture on my desk.",
    date: "August 14, 2026",
    verifiedPurchase: true,
    helpfulCount: 28,
  },
  {
    id: "rev-02",
    productId: "prod-sonus-a1",
    author: "Astrid Lindholm",
    rating: 5,
    title: "Tactile perfection on the volume rotary dial",
    content:
      "The knurled brass dial has the damped mechanical resistance of fine high-end audio hardware. Seamless multipoint Bluetooth pairing across MacBook and iPhone.",
    date: "July 29, 2026",
    verifiedPurchase: true,
    helpfulCount: 19,
  },
  {
    id: "rev-03",
    productId: "prod-sonus-a1",
    author: "David K.",
    rating: 4,
    title: "Sculptural presence, slightly heavy for travel",
    content:
      "At 1.8 kg, this is a home and office monolith rather than a casual backpack speaker. The acoustic clarity and battery longevity (approx 22 hours real-world) are exceptional.",
    date: "July 12, 2026",
    verifiedPurchase: true,
    helpfulCount: 11,
  },
];

export class MockReviewRepository implements IReviewRepository {
  async getReviewsByProductId(productId: string): Promise<ProductReview[]> {
    return REVIEWS_STORE.filter((r) => r.productId === productId);
  }

  async getSummaryByProductId(productId: string): Promise<ReviewSummary> {
    const reviews = await this.getReviewsByProductId(productId);
    if (reviews.length === 0) {
      return {
        averageRating: 5.0,
        totalReviews: 0,
        ratingDistribution: { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 },
      };
    }

    const totalReviews = reviews.length;
    const sum = reviews.reduce((acc, r) => acc + r.rating, 0);
    const averageRating = Math.round((sum / totalReviews) * 10) / 10;

    const ratingDistribution: { [star: number]: number } = {
      5: 0,
      4: 0,
      3: 0,
      2: 0,
      1: 0,
    };
    reviews.forEach((r) => {
      ratingDistribution[r.rating] = (ratingDistribution[r.rating] || 0) + 1;
    });

    return { averageRating, totalReviews, ratingDistribution };
  }

  async addReview(
    productId: string,
    input: CreateReviewInput
  ): Promise<ProductReview> {
    const newRev: ProductReview = {
      id: `rev-${Date.now()}`,
      productId,
      author: input.author,
      rating: input.rating,
      title: input.title,
      content: input.content,
      date: new Date().toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      }),
      verifiedPurchase: true,
      helpfulCount: 0,
    };
    REVIEWS_STORE.unshift(newRev);
    return newRev;
  }
}

export const reviewRepository = new MockReviewRepository();
