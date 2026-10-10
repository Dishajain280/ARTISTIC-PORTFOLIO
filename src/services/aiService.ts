import { GoogleGenAI } from '@google/genai';

// Initialize Gemini client if environment key is provided
const apiKey =
  (typeof process !== 'undefined' && process.env?.GEMINI_API_KEY) ||
  (typeof import.meta !== 'undefined' && (import.meta as any).env?.VITE_GEMINI_API_KEY) ||
  '';

let aiClient: GoogleGenAI | null = null;
if (apiKey) {
  try {
    aiClient = new GoogleGenAI({ apiKey });
  } catch (e) {
    console.warn('Could not initialize Gemini SDK with key', e);
  }
}

// 1. AI ARTWORK METADATA ASSISTANT
export interface ArtworkMetadataInput {
  titleHint?: string;
  medium: string;
  roughNotes?: string;
  creatorName?: string;
}

export interface ArtworkMetadataResult {
  suggestedTitle: string;
  description: string;
  suggestedDimensions: string;
  detailedMedium: string;
  tags: string[];
}

export async function generateArtworkMetadata(
  input: ArtworkMetadataInput
): Promise<ArtworkMetadataResult> {
  if (aiClient) {
    try {
      const prompt = `You are a curatorial assistant for Atelier, a high-end digital monograph and studio platform for fine craft artists and sculptors.
Given the following artist work details:
- Medium: ${input.medium}
- Working title/idea: ${input.titleHint || 'Untitled work'}
- Rough notes from the artist: ${input.roughNotes || 'Monolithic piece exploring texture and material presence'}
- Artist: ${input.creatorName || 'Artist'}

Generate a curatorial monograph entry in JSON format with exact keys:
{
  "suggestedTitle": "Poetic, museum-grade title",
  "description": "2-3 sentences of evocative curatorial text focusing on materiality, fire/technique, and tactile form. Avoid generic hype or empty buzzwords.",
  "suggestedDimensions": "e.g. 34 × 22 × 22 cm",
  "detailedMedium": "Refined technical medium specification (e.g. Unglazed Shigaraki stoneware with wood ash reduction)",
  "tags": ["3 to 5 lowercase tags, e.g. stoneware, wood-fired, monolith"]
}
Return ONLY valid JSON.`;

      const response = await aiClient.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: prompt,
      });

      const text = response.text || '';
      const cleaned = text.replace(/```json/g, '').replace(/```/g, '').trim();
      const parsed = JSON.parse(cleaned);
      return {
        suggestedTitle: parsed.suggestedTitle || input.titleHint || 'Vessel in Reduction Ash',
        description: parsed.description || 'Shaped by hand with coarse grog and mineral slip, fired in slow reduction.',
        suggestedDimensions: parsed.suggestedDimensions || '32 × 22 × 22 cm',
        detailedMedium: parsed.detailedMedium || input.medium,
        tags: Array.isArray(parsed.tags) ? parsed.tags : ['sculpture', 'monolith', 'handmade'],
      };
    } catch (err) {
      console.warn('Gemini artwork metadata generation error, using creative fallback', err);
    }
  }

  // Graceful domain-specific fallback
  const mediumLower = input.medium.toLowerCase();
  const isCeramic = mediumLower.includes('clay') || mediumLower.includes('ceramic') || mediumLower.includes('stone');
  const isWood = mediumLower.includes('wood') || mediumLower.includes('timber') || mediumLower.includes('join');

  if (isCeramic) {
    return {
      suggestedTitle: input.titleHint ? `${input.titleHint} (Strata VII)` : 'Vessel in Kuro-yū & Pine Ash',
      description: `Hand-coiled coarse stoneware fired inside a reduction wood kiln for 72 continuous hours. Natural fly ash melts across the shoulder into a vitrified mineral crust.`,
      suggestedDimensions: '36 × 24 × 24 cm',
      detailedMedium: 'Wood-fired Shigaraki Stoneware & Natural Ash Glaze',
      tags: ['stoneware', 'wood-fired', 'reduction', 'monolith', 'anagama'],
    };
  }

  if (isWood) {
    return {
      suggestedTitle: input.titleHint ? `${input.titleHint} (No. 04)` : 'Monolithic Plinth in Smoked Oak',
      description: `Carved from fallen Danish heartwood with hand-adzed facets. Finished with natural organic walnut oil to preserve the deep tactile grain tension.`,
      suggestedDimensions: '64 × 28 × 28 cm',
      detailedMedium: 'Solid Danish Smoked Oak with Hand-Adzed Surface',
      tags: ['woodcraft', 'joinery', 'sculptural', 'oak', 'hand-adzed'],
    };
  }

  return {
    suggestedTitle: input.titleHint ? `${input.titleHint} (Edition I)` : 'Tectonic Balance No. 01',
    description: `Constructed through methodical layering and physical intuition, honoring the unadorned integrity of raw materials and spatial weight.`,
    suggestedDimensions: '42 × 30 × 20 cm',
    detailedMedium: input.medium || 'Mixed Studio Materials',
    tags: ['monograph', 'sculptural', 'contemporary', 'bespoke'],
  };
}

// 2. AI PORTFOLIO / BIO ASSISTANT
export interface ArtistBioInput {
  name: string;
  medium: string;
  location: string;
  philosophyKeywords?: string;
}

export interface ArtistBioResult {
  tagline: string;
  bio: string;
}

export async function generateArtistBio(input: ArtistBioInput): Promise<ArtistBioResult> {
  if (aiClient) {
    try {
      const prompt = `You are an editorial art critic writing for an international art monograph publication.
Write a sophisticated, dignified artist statement and tagline for:
- Artist Name: ${input.name}
- Studio Location: ${input.location}
- Primary Medium: ${input.medium}
- Artistic Themes/Keywords: ${input.philosophyKeywords || 'slow craft, material memory, tactile presence, elemental techniques'}

Respond in JSON with exact keys:
{
  "tagline": "A punchy, poetic 4-8 word identity descriptor (e.g. Architectural Stoneware, Basalt Vessels & Mineral Reduction)",
  "bio": "A 3-4 sentence editorial artist bio that feels museum-worthy, deeply respectful of physical craft, and avoids cliché marketing buzzwords."
}
Return ONLY JSON.`;

      const response = await aiClient.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: prompt,
      });

      const text = response.text || '';
      const cleaned = text.replace(/```json/g, '').replace(/```/g, '').trim();
      const parsed = JSON.parse(cleaned);
      return {
        tagline: parsed.tagline || `${input.medium} Atelier`,
        bio: parsed.bio || `Working in ${input.location}, ${input.name} creates works of tactile depth and quiet restraint.`,
      };
    } catch (err) {
      console.warn('Gemini artist bio generation fallback', err);
    }
  }

  // Fallback
  return {
    tagline: `${input.medium} & Raw Architectural Form`,
    bio: `Working from an independent studio in ${input.location}, ${input.name} examines the dialogue between elemental material and sculptural poise. Every piece is shaped by hand using ancestral techniques, rejecting accelerated mass production in favor of slow, deliberate craft and enduring provenance.`,
  };
}

// 3. AI COMMISSION BRIEF GENERATOR
export interface CommissionBriefInput {
  clientRawIdea: string;
  serviceTitle: string;
  clientSpaceOrIntent?: string;
  budget?: number;
  timeline?: string;
  creatorName: string;
}

export interface CommissionBriefResult {
  structuredBrief: string;
  suggestedDeliverables: string[];
  dimensionsRecommendation: string;
  suggestedReferences: string[];
}

export async function generateCommissionBrief(
  input: CommissionBriefInput
): Promise<CommissionBriefResult> {
  if (aiClient) {
    try {
      const prompt = `You are a commission director at Atelier, helping a patron formulate a clear, actionable, and respectful commission brief for artist ${input.creatorName}.
Client initial thoughts: "${input.clientRawIdea}"
Target Service: "${input.serviceTitle}"
Space or Intent: "${input.clientSpaceOrIntent || 'Residential interior'}"
Budget: "$${input.budget || 2000}"
Target Timeline: "${input.timeline || 'Flexible / 6-8 weeks'}"

Synthesize this into a structured, professional brief that eliminates ambiguity and scope creep.
Respond in JSON with exact keys:
{
  "structuredBrief": "A well-organized 2-paragraph brief explaining context, intended placement, aesthetic characteristics, and finish preferences.",
  "suggestedDeliverables": ["3 clear milestones, e.g. Pre-production clay maquette review", "Glaze test tile photo sign-off", "Museum timber crating & certificate"],
  "dimensionsRecommendation": "Recommended height and footprint in cm",
  "suggestedReferences": ["3 visual or thematic reference cues"]
}
Return ONLY valid JSON.`;

      const response = await aiClient.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: prompt,
      });

      const text = response.text || '';
      const cleaned = text.replace(/```json/g, '').replace(/```/g, '').trim();
      const parsed = JSON.parse(cleaned);
      return {
        structuredBrief: parsed.structuredBrief || input.clientRawIdea,
        suggestedDeliverables: Array.isArray(parsed.suggestedDeliverables)
          ? parsed.suggestedDeliverables
          : ['Maquette approval', 'Progress photographs', 'Signed certificate'],
        dimensionsRecommendation: parsed.dimensionsRecommendation || '38 × 22 × 22 cm',
        suggestedReferences: Array.isArray(parsed.suggestedReferences)
          ? parsed.suggestedReferences
          : ['Natural mineral crust', 'Warm architectural presence'],
      };
    } catch (err) {
      console.warn('Gemini commission brief fallback', err);
    }
  }

  // Intelligent fallback synthesis
  return {
    structuredBrief: `We are requesting a bespoke commission under "${input.serviceTitle}".
Context & Placement: Intended for a dedicated focal position in ${input.clientSpaceOrIntent || 'a contemporary interior'}.
Aesthetic Character: Seeking a piece that embodies the artist's signature textural presence—specifically honoring: "${input.clientRawIdea}". We welcome natural variations that emerge from the firing process.`,
    suggestedDeliverables: [
      'Scale sketch / clay maquette photographic review',
      'Mid-process studio firing update',
      'Museum-grade timber crating and signed certificate of authenticity',
    ],
    dimensionsRecommendation: 'Approx. 36 × 24 × 24 cm',
    suggestedReferences: [
      'Geological Strata Textures',
      'Warm Neutral Architectural Palette',
      'Monolithic Silhouette',
    ],
  };
}
