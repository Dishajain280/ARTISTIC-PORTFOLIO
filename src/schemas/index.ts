import { z } from 'zod';

export const CreatorSchema = z.object({
  handle: z.string().min(2).max(30).regex(/^[a-zA-Z0-9_-]+$/, 'Handle can only contain letters, numbers, hyphens, and underscores'),
  name: z.string().min(1, 'Name is required').max(100),
  tagline: z.string().max(200).default(''),
  bio: z.string().max(2000).default(''),
  location: z.string().max(100).default(''),
  medium: z.string().min(1, 'Primary medium is required'),
  avatarUrl: z.string().url('Must be a valid URL').or(z.string().min(1)),
});

export const ArtworkSchema = z.object({
  title: z.string().min(1, 'Artwork title is required').max(120),
  description: z.string().max(2000).default(''),
  medium: z.string().min(1, 'Medium description is required'),
  year: z.number().int().min(1900).max(2100).default(new Date().getFullYear()),
  dimensions: z.string().max(80).default(''),
  tags: z.array(z.string()).default([]),
  featured: z.boolean().default(false),
  status: z.enum(['available', 'reserved', 'private_collection', 'exhibition_loan']).default('available'),
  price: z.number().nonnegative().optional(),
  collectionId: z.string().optional(),
  images: z.array(z.string()).min(1, 'At least one artwork image is required'),
});

export const CommissionServiceSchema = z.object({
  title: z.string().min(2, 'Service title is required').max(100),
  description: z.string().max(1000).default(''),
  basePrice: z.number().positive('Base price must be greater than 0'),
  currency: z.enum(['USD', 'EUR', 'GBP', 'JPY']).default('USD'),
  turnaroundWeeks: z.number().int().positive('Turnaround must be at least 1 week').default(4),
  revisionsIncluded: z.number().int().min(0).default(2),
  active: z.boolean().default(true),
  deliverables: z.array(z.string()).default([]),
});

export const CommissionRequestSchema = z.object({
  clientName: z.string().min(2, 'Your name is required'),
  clientEmail: z.string().email('Please enter a valid email address'),
  serviceId: z.string().min(1, 'Service selection is required'),
  brief: z.string().min(10, 'Please describe your request in at least 10 characters'),
  budget: z.number().positive('Budget must be positive'),
  targetDeadline: z.string().optional(),
  dimensionsRequired: z.string().optional(),
  references: z.array(z.string()).default([]),
});
