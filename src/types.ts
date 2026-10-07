export type ViewMode = 
  | 'home' 
  | 'discover' 
  | 'artwork' 
  | 'artist' 
  | 'journal' 
  | 'pricing'
  | 'journal-essay';

export type Currency = 'USD' | 'EUR' | 'GBP' | 'JPY';

export interface Artwork {
  id: string;
  title: string;
  artistId: string;
  artistName: string;
  artistLocation: string;
  artistAvatar: string;
  medium: string;
  mediumCategory: string;
  year: number;
  price: number;
  priceFormatted?: string;
  status: 'available' | 'reserved' | 'exhibition_loan' | 'commission_sample' | 'edition';
  editionInfo?: string;
  dimensions: string;
  mass?: string;
  footRing?: string;
  imageUrl: string;
  altText: string;
  alternateAngles?: {
    label: string;
    description: string;
    imageUrl: string;
  }[];
  curatorialStatement?: string;
  bodyDescription?: string;
  glazeDescription?: string;
  kilnDescription?: string;
  provenanceCode?: string;
  catalogNumber?: string;
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
