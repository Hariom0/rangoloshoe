// types.ts
export interface Product {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
  category: string;
}

export interface Collection {
  id: string;
  title: string;
  imageUrl: string;
}

// api.ts
const dummyProducts: Product[] = [
  { id: '1', name: 'Classic Leather Loafer', price: 2499, imageUrl: 'https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?w=500&q=80', category: 'Formal' },
  { id: '2', name: 'Everyday Runner', price: 1899, imageUrl: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&q=80', category: 'Sports' },
  { id: '3', name: 'Suede Ankle Boot', price: 3299, imageUrl: 'https://images.unsplash.com/photo-1608667508764-33cf0726b13a?w=500&q=80', category: 'Casual' },
  { id: '4', name: 'Handcrafted Mojari', price: 1499, imageUrl: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=500&q=80', category: 'Traditional' },
];

const dummyCollections: Collection[] = [
  { id: 'c1', title: 'Festive Edit', imageUrl: 'https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=500&q=80' },
  { id: 'c2', title: 'Workwear Essentials', imageUrl: 'https://images.unsplash.com/photo-1514989940723-e8e51635b782?w=500&q=80' },
];

// Simulated API Calls
export const fetchFreshDrops = async (): Promise<Product[]> => {
  return new Promise((resolve) => setTimeout(() => resolve(dummyProducts), 800));
};

export const fetchBestsellers = async (): Promise<Product[]> => {
  return new Promise((resolve) => setTimeout(() => resolve([...dummyProducts].reverse()), 1000));
};

export const fetchCollections = async (): Promise<Collection[]> => {
  return new Promise((resolve) => setTimeout(() => resolve(dummyCollections), 600));
};