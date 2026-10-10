export type CommissionStatus =
  | 'RECEIVED'
  | 'IN_REVIEW'
  | 'ACCEPTED'
  | 'DECLINED'
  | 'IN_PROGRESS'
  | 'DELIVERED'
  | 'CANCELLED';

export interface Creator {
  id: string;
  handle: string;              // unique handle e.g. "maya" -> /@maya
  name: string;                // e.g. "Maya Chen"
  tagline: string;             // e.g. "Architectural Stoneware & Basalt Vessels"
  bio: string;
  avatarUrl: string;
  heroImageUrl?: string;
  location: string;            // e.g. "Brooklyn, NY"
  medium: string;              // e.g. "Ceramics & Stoneware"
  socialLinks: {
    instagram?: string;
    website?: string;
    twitter?: string;
    email?: string;
  };
  themeSettings: {
    palette: 'linen' | 'carbon' | 'terracotta';
    layout: 'editorial' | 'dense' | 'monograph';
  };
  createdAt: string;
}

export interface Artwork {
  id: string;
  creatorId?: string;
  artistId?: string;
  artistName?: string;
  artistLocation?: string;
  artistAvatar?: string;
  collectionId?: string;
  title: string;
  description?: string;
  curatorialStatement?: string;
  bodyDescription?: string;
  glazeDescription?: string;
  kilnDescription?: string;
  images?: string[];
  imageUrl?: string;
  altText?: string;
  alternateAngles?: {
    label: string;
    description: string;
    imageUrl: string;
  }[];
  medium: string;
  mediumCategory?: string;
  year: number;
  dimensions: string;
  mass?: string;
  footRing?: string;
  provenanceCode?: string;
  catalogNumber?: string;
  tags?: string[];
  featured?: boolean;
  status: 'available' | 'reserved' | 'private_collection' | 'exhibition_loan' | 'commission_sample' | 'edition';
  price?: number;
  priceFormatted?: string;
  createdAt?: string;
}

export interface Collection {
  id: string;
  creatorId: string;
  title: string;               // e.g. "Tectonic Strata (2024)"
  description: string;
  order: number;
  visibility: 'public' | 'unlisted';
}

export interface CommissionService {
  id: string;
  creatorId: string;
  title: string;               // e.g. "Bespoke Sculptural Vessel"
  description: string;
  basePrice: number;           // e.g. 1800
  currency: 'USD' | 'EUR' | 'GBP' | 'JPY';
  turnaroundWeeks: number;     // e.g. 6 (weeks)
  revisionsIncluded: number;   // e.g. 2
  active: boolean;             // Open / Closed for commissions
  deliverables: string[];      // e.g. ["Pre-firing clay maquette review", "Certificate of authenticity"]
}

export interface CommissionRequest {
  id: string;
  creatorId: string;
  serviceId: string;
  serviceTitle: string;
  clientName: string;
  clientEmail: string;
  brief: string;               // Structured client brief
  references: string[];        // Image URLs or visual inspirations
  budget: number;
  currency: string;
  targetDeadline?: string;
  dimensionsRequired?: string;
  status: CommissionStatus;
  statusNotes?: string;        // Artist's update note to client
  createdAt: string;
  updatedAt: string;
}

export interface Artist {
  id: string;
  name: string;
  location: string;
  medium: string;
  discipline: string;
  quote: string;
  bio: string;
  avatarUrl: string;
  heroImageUrl: string;
  galleryRepresentation: string;
  artworksCount: number;
  availablePiecesCount: number;
  selectedMasterworkTitle: string;
  selectedMasterworkYear: number;
  selectedMasterworkImage: string;
  featuredWorkIds: string[];
  exhibitions: {
    year: number;
    title: string;
    venue: string;
  }[];
}

export interface JournalArticle {
  id: string;
  dispatchNumber: string;
  title: string;
  subtitle: string;
  excerpt: string;
  category: string;
  readTime: string;
  author: string;
  authorRole: string;
  photographer?: string;
  location?: string;
  temperature?: string;
  imageUrl: string;
  featured?: boolean;
  contentParagraphs: string[];
}

export type ViewRoute = 
  | { type: 'landing' }
  | { type: 'profile'; handle: string; tab?: 'gallery' | 'commissions' | 'about' }
  | { type: 'dashboard'; tab?: 'inbox' | 'artworks' | 'services' | 'profile' }
  | { type: 'onboarding' };

export type ViewMode = 'home' | 'discover' | 'artwork' | 'artist' | 'journal' | 'pricing' | 'journal-essay';
export type Currency = 'USD' | 'EUR' | 'GBP' | 'JPY';
