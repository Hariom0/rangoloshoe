import type { Product } from "./types";

const STORAGE_KEY = process.env.NEXT_PUBLIC_BASE_URL;

export function getBaseUrl(): string {
	if (typeof window === "undefined") return "";
	return STORAGE_KEY!
}



function buildUrl(path: string, params?: Record<string, string | undefined>) {
	const base = getBaseUrl();
	if (!base) throw new Error("API base URL not configured. Open Settings.");
	const url = new URL(base + path);
	if (params) {
		for (const [k, v] of Object.entries(params)) {
			if (v && v !== "all") url.searchParams.set(k, v);
		}
	}
	return url.toString();
}

async function handle<T>(res: Response): Promise<T> {
	if (!res.ok) {
		let msg = `Request failed (${res.status})`;
		try {
			const j = await res.json();
			console.log(j)
			msg = j.message || j.error || msg;
		} catch {}
		throw new Error(msg);
	}
	return res.json();
}

export interface ProductFilters {
	search?: string;
	gender?: string;
	page?:number | string;
	category?: string;
}

export async function fetchProducts(filters: ProductFilters = {}): Promise<any> {
	const url = buildUrl("/api/products", {
		gender: filters.gender,
		category: filters.category,
	});
	const res = await fetch(url);
	const data = await handle<any>(res);
	const list: any = Array.isArray(data) ? data : data.products || data.data || [];
	if (filters.search) {
		const q = filters.search.toLowerCase();
		return list.filter((p:any) => p.name?.toLowerCase().includes(q) || p.slug?.toLowerCase().includes(q) || p.category?.toLowerCase().includes(q));
	}
	return {list,"total":data?.total};
}

export async function fetchProduct(slug: string): Promise<Product> {
	const res = await fetch(buildUrl(`/api/products/${slug}`));
	const data = await handle<any>(res);
	return data.product || data.data || data;
}

export interface ProductFormPayload {
	name: string;
	slug: string;
	description?: string;
	gender?: string;
	category?: string;
	price: number;
	discountPrice?: number;
	variants: { size: number | string; stock: number; sku: string }[];
	files: File[];
	mediaMetadata?: { altText: string; isPrimary: boolean }[];
}

function buildFormData(payload: Partial<ProductFormPayload>) {
	const fd = new FormData();
	if (payload.name !== undefined) fd.append("name", payload.name);
	if (payload.slug !== undefined) fd.append("slug", payload.slug);
	if (payload.description !== undefined) fd.append("description", payload.description);
	if (payload.gender !== undefined) fd.append("gender", payload.gender);
	if (payload.category !== undefined) fd.append("category", payload.category);
	if (payload.price !== undefined) fd.append("price", String(payload.price));
	if (payload.discountPrice !== undefined && payload.discountPrice !== null && !Number.isNaN(payload.discountPrice)) fd.append("discountPrice", String(payload.discountPrice));
	if (payload.variants) fd.append("variants", JSON.stringify(payload.variants));
	if (payload.files && payload.files.length) {
		const meta = payload.mediaMetadata || payload.files.map((_, i) => ({ altText: payload.name || "Image", isPrimary: i === 0 }));
		fd.append("mediaMetadata", JSON.stringify(meta));
		payload.files.forEach((f) => fd.append("files", f));
	}
	for(let [k,v] of fd){
		console.log(k,v)
	}
	return fd;
}

export async function createProduct(payload: any): Promise<any> {
	const res = await fetch(buildUrl("/api/products"), {
		method: "POST",
		body: payload
	});
	return handle<Product>(res);
}

export async function updateProduct(slug: string, formData: FormData) {
	const res = await fetch(`${getBaseUrl()}/api/products/${slug}`, {
		method: "PUT",
		body: formData, // Browser automatically applies dynamic multipart/form-data boundary definitions
	});
	if (!res.ok) throw new Error("Failed updating product database entry");
	return res.json();
}
export async function deleteProduct(slug: string): Promise<void> {
	const res = await fetch(buildUrl(`/api/products/${slug}`), { method: "DELETE" });
	if (!res.ok) throw new Error(`Delete failed (${res.status})`);
}

export function slugify(input: string): string {
	return input
		.toLowerCase()
		.trim()
		.replace(/['"]+/g, "")
		.replace(/[^a-z0-9]+/g, "-")
		.replace(/^-+|-+$/g, "")
		.slice(0, 60);
}

export function uniqueSlug(input: string, existing: string[]): string {
	const base = slugify(input) || "product";
	if (!existing.includes(base)) return base;
	let i = 2;
	while (existing.includes(`${base}-${i}`)) i++;
	return `${base}-${i}`;
}

export function primaryImage(p: Product): string | undefined {
	const list = p.media || p.images || [];
	const primary = list.find((m) => m.isPrimary);
	return (primary || list[0])?.url;
}

export function totalStock(p: Product): number {
	return (p.variants || []).reduce((sum, v) => sum + (Number(v.stock) || 0), 0);
}
