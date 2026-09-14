import { z } from "zod";

export const customerAddressSchema = z.object({
  firstName: z.string().min(2, "First name is required"),
  lastName: z.string().min(2, "Last name is required"),
  company: z.string().optional(),
  address1: z.string().min(4, "Street address is required"),
  address2: z.string().optional(),
  city: z.string().min(2, "City is required"),
  state: z.string().min(2, "State or region is required"),
  postalCode: z.string().min(3, "Valid postal code required"),
  country: z.string().min(2, "Country is required"),
  phone: z.string().optional(),
});

export const checkoutFormSchema = z.object({
  email: z.string().email("Please provide a valid email address for your order confirmation"),
  shippingAddress: customerAddressSchema,
  sameAsBilling: z.boolean().default(true),
  billingAddress: customerAddressSchema.optional(),
  shippingMethodId: z.enum(["standard", "express", "white_glove"]),
  paymentMethod: z.enum(["card", "apple_pay", "google_pay"]),
  cardNumber: z.string().regex(/^[0-9\s]{15,19}$/, "Valid card number required").optional(),
  cardExpiry: z.string().regex(/^(0[1-9]|1[0-2])\/?([0-9]{2})$/, "MM/YY").optional(),
  cardCvc: z.string().regex(/^[0-9]{3,4}$/, "CVC").optional(),
  promoCode: z.string().optional(),
});

export type CheckoutFormData = z.infer<typeof checkoutFormSchema>;

export const reviewFormSchema = z.object({
  author: z.string().min(2, "Please enter your name"),
  email: z.string().email("Valid email required for verification"),
  rating: z.number().int().min(1).max(5),
  title: z.string().min(3, "Review title must be at least 3 characters"),
  content: z.string().min(10, "Review content must be at least 10 characters"),
});

export type ReviewFormData = z.infer<typeof reviewFormSchema>;

export const newsletterSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
});

export type NewsletterFormData = z.infer<typeof newsletterSchema>;
