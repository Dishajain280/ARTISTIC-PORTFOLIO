import { useState, useEffect } from 'react';
import { Creator, Artwork, Collection, CommissionService, CommissionRequest, CommissionStatus } from '../types';
import { SEED_CREATORS, SEED_ARTWORKS, SEED_COLLECTIONS, SEED_SERVICES, SEED_COMMISSIONS } from '../data/seedData';

const STORAGE_KEY = 'atelier_hackathon_store_v1';

interface AtelierState {
  currentHandle: string;       // Active logged-in creator handle e.g. "maya"
  creators: Creator[];
  artworks: Artwork[];
  collections: Collection[];
  services: CommissionService[];
  commissions: CommissionRequest[];
}

function getInitialState(): AtelierState {
  if (typeof window === 'undefined') {
    return {
      currentHandle: 'maya',
      creators: SEED_CREATORS,
      artworks: SEED_ARTWORKS,
      collections: SEED_COLLECTIONS,
      services: SEED_SERVICES,
      commissions: SEED_COMMISSIONS,
    };
  }

  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (parsed.creators && parsed.artworks && parsed.commissions) {
        return parsed;
      }
    }
  } catch (err) {
    console.error('Failed to load store from localStorage', err);
  }

  return {
    currentHandle: 'maya',
    creators: SEED_CREATORS,
    artworks: SEED_ARTWORKS,
    collections: SEED_COLLECTIONS,
    services: SEED_SERVICES,
    commissions: SEED_COMMISSIONS,
  };
}

class StoreManager {
  private state: AtelierState;
  private listeners: Set<() => void> = new Set();

  constructor() {
    this.state = getInitialState();
  }

  private save() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.state));
    } catch (e) {
      console.warn('Storage save error', e);
    }
    this.notify();
  }

  private notify() {
    this.listeners.forEach((listener) => listener());
  }

  subscribe(listener: () => void) {
    this.listeners.add(listener);
    return () => {
      this.listeners.delete(listener);
    };
  }

  getState(): AtelierState {
    return this.state;
  }

  // Demo state reset
  resetToDemo() {
    this.state = {
      currentHandle: 'maya',
      creators: [...SEED_CREATORS],
      artworks: [...SEED_ARTWORKS],
      collections: [...SEED_COLLECTIONS],
      services: [...SEED_SERVICES],
      commissions: [...SEED_COMMISSIONS],
    };
    this.save();
  }

  // Active creator switch
  setCurrentHandle(handle: string) {
    this.state.currentHandle = handle;
    this.save();
  }

  // Creator methods
  getCreatorByHandle(handle: string): Creator | undefined {
    return this.state.creators.find(
      (c) => c.handle.toLowerCase() === handle.toLowerCase()
    );
  }

  getCurrentCreator(): Creator {
    const found = this.getCreatorByHandle(this.state.currentHandle);
    return found || this.state.creators[0];
  }

  updateCreator(handle: string, updates: Partial<Creator>) {
    this.state.creators = this.state.creators.map((c) =>
      c.handle.toLowerCase() === handle.toLowerCase() ? { ...c, ...updates } : c
    );
    this.save();
  }

  createCreator(newCreator: Creator) {
    this.state.creators = [newCreator, ...this.state.creators];
    this.state.currentHandle = newCreator.handle;
    this.save();
  }

  // Artwork methods
  getArtworksByCreator(creatorId: string): Artwork[] {
    return this.state.artworks.filter((a) => a.creatorId === creatorId);
  }

  createArtwork(artwork: Artwork) {
    this.state.artworks = [artwork, ...this.state.artworks];
    this.save();
  }

  updateArtwork(id: string, updates: Partial<Artwork>) {
    this.state.artworks = this.state.artworks.map((a) =>
      a.id === id ? { ...a, ...updates } : a
    );
    this.save();
  }

  deleteArtwork(id: string) {
    this.state.artworks = this.state.artworks.filter((a) => a.id !== id);
    this.save();
  }

  setFeaturedArtwork(creatorId: string, artworkId: string) {
    this.state.artworks = this.state.artworks.map((a) => {
      if (a.creatorId === creatorId) {
        return { ...a, featured: a.id === artworkId };
      }
      return a;
    });
    this.save();
  }

  // Collection methods
  getCollectionsByCreator(creatorId: string): Collection[] {
    return this.state.collections.filter((c) => c.creatorId === creatorId);
  }

  createCollection(col: Collection) {
    this.state.collections = [...this.state.collections, col];
    this.save();
  }

  deleteCollection(id: string) {
    this.state.collections = this.state.collections.filter((c) => c.id !== id);
    this.save();
  }

  // Service methods
  getServicesByCreator(creatorId: string): CommissionService[] {
    return this.state.services.filter((s) => s.creatorId === creatorId);
  }

  createService(service: CommissionService) {
    this.state.services = [...this.state.services, service];
    this.save();
  }

  updateService(id: string, updates: Partial<CommissionService>) {
    this.state.services = this.state.services.map((s) =>
      s.id === id ? { ...s, ...updates } : s
    );
    this.save();
  }

  deleteService(id: string) {
    this.state.services = this.state.services.filter((s) => s.id !== id);
    this.save();
  }

  // Commission Request methods
  getCommissionsByCreator(creatorId: string): CommissionRequest[] {
    return this.state.commissions
      .filter((c) => c.creatorId === creatorId)
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }

  createCommissionRequest(request: CommissionRequest) {
    this.state.commissions = [request, ...this.state.commissions];
    this.save();
  }

  updateCommissionStatus(
    id: string,
    status: CommissionStatus,
    statusNotes?: string
  ) {
    this.state.commissions = this.state.commissions.map((c) =>
      c.id === id
        ? {
            ...c,
            status,
            statusNotes: statusNotes || c.statusNotes,
            updatedAt: new Date().toISOString(),
          }
        : c
    );
    this.save();
  }

  deleteCommissionRequest(id: string) {
    this.state.commissions = this.state.commissions.filter((c) => c.id !== id);
    this.save();
  }
}

export const store = new StoreManager();

export function useAtelierStore() {
  const [state, setState] = useState<AtelierState>(() => store.getState());

  useEffect(() => {
    return store.subscribe(() => {
      setState({ ...store.getState() });
    });
  }, []);

  return {
    state,
    currentCreator: store.getCurrentCreator(),
    setCurrentHandle: (h: string) => store.setCurrentHandle(h),
    resetToDemo: () => store.resetToDemo(),
    getCreatorByHandle: (h: string) => store.getCreatorByHandle(h),
    updateCreator: (h: string, u: Partial<Creator>) => store.updateCreator(h, u),
    createCreator: (c: Creator) => store.createCreator(c),
    getArtworksByCreator: (id: string) => store.getArtworksByCreator(id),
    createArtwork: (a: Artwork) => store.createArtwork(a),
    updateArtwork: (id: string, u: Partial<Artwork>) => store.updateArtwork(id, u),
    deleteArtwork: (id: string) => store.deleteArtwork(id),
    setFeaturedArtwork: (cId: string, aId: string) => store.setFeaturedArtwork(cId, aId),
    getCollectionsByCreator: (id: string) => store.getCollectionsByCreator(id),
    createCollection: (col: Collection) => store.createCollection(col),
    deleteCollection: (id: string) => store.deleteCollection(id),
    getServicesByCreator: (id: string) => store.getServicesByCreator(id),
    createService: (s: CommissionService) => store.createService(s),
    updateService: (id: string, u: Partial<CommissionService>) => store.updateService(id, u),
    deleteService: (id: string) => store.deleteService(id),
    getCommissionsByCreator: (id: string) => store.getCommissionsByCreator(id),
    createCommissionRequest: (r: CommissionRequest) => store.createCommissionRequest(r),
    updateCommissionStatus: (id: string, s: CommissionStatus, notes?: string) =>
      store.updateCommissionStatus(id, s, notes),
    deleteCommissionRequest: (id: string) => store.deleteCommissionRequest(id),
  };
}
