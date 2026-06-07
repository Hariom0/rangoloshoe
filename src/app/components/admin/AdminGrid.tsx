"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Toaster, toast } from "sonner";
import { 
    AlertCircle, 
    Boxes, 
    Flame, 
    LogOut, 
    Package, 
    Plus, 
    RefreshCcw, 
    Search, 
    ShoppingBag, 
    Star 
} from "lucide-react";
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/app/components/ui/select";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/app/components/ui/sheet";
import { ProductCard } from "@/app/components/admin/ProductCard";
import { ProductDetail } from "@/app/components/admin/ProductDetail";
import { ProductForm } from "@/app/components/admin/ProductForm";
import { CATEGORIES, GENDERS, type Product } from "@/lib/admin/types";
import { createProduct, deleteProduct, fetchProducts, getBaseUrl, totalStock, updateProduct } from "@/lib/admin/api";
import Pagination from "../collections/Pagination";
import { signOut } from "next-auth/react";

type Props = {
    category: string;
    gender: string;
    page: string;
};

export default function AdminGrid({ category, gender, page }: Props) {
    const router = useRouter();
    const searchParams = useSearchParams();

    // Search State
    const [search, setSearch] = useState("");
    const [debounced, setDebounced] = useState("");

    // UI State
    const [hasBaseUrl, setHasBaseUrl] = useState(!!process.env.NEXT_PUBLIC_BASE_URL);
    const [detailProduct, setDetailProduct] = useState<Product | null>(null);
    const [detailOpen, setDetailOpen] = useState(false);
    const [formMode, setFormMode] = useState<"create" | "edit" | null>(null);
    const [formInitial, setFormInitial] = useState<Product | null>(null);
    const [bestSellers, setBestSellers] = useState<number>(0);
    const [freshDrops, setFreshDrop] = useState<number>(0);

    // Data Fetching State
    const [products, setProducts] = useState<any>([]);
    const [isLoading, setIsLoading] = useState(false); // Initial load
    const [isFetching, setIsFetching] = useState(false); // Background refresh
    const [error, setError] = useState<Error | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [total, setTotal] = useState(1);

    /* =========================
       QUERY PARAMS ROUTING
    ========================= */
    function updateQueryParams(key: string, value: string) {
        const params = new URLSearchParams(searchParams.toString());

        if (value && value !== "all") {
            params.set(key, value);
        } else {
            params.delete(key);
        }

        if (key === "category" || key === "gender") {
            params.set("page", "1");
        }

        router.push(`/admin?${params.toString()}`);
    }

    function handlePageChange(newPage: number) {
        updateQueryParams("page", String(newPage));
    }

    useEffect(() => {
        const has = !!getBaseUrl();
        setHasBaseUrl(has);
    }, []);

    useEffect(() => {
        const t = setTimeout(() => setDebounced(search), 250);
        return () => clearTimeout(t);
    }, [search]);

    const fetchAllProducts = useCallback(async () => {
        if (!hasBaseUrl) return;

        setIsFetching(true);
        if (products.length === 0) setIsLoading(true);

        try {
            setError(null);
            const { list, total: backendTotal } = await fetchProducts({ gender, category, page });

            setProducts(list || []);
            setTotal(backendTotal || 0);
        } catch (err) {
            setError(err instanceof Error ? err : new Error("Failed to fetch products"));
        } finally {
            setIsLoading(false);
            setIsFetching(false);
        }
    }, [gender, category, page, hasBaseUrl, products.length]);

    useEffect(() => {
        fetchAllProducts();
    }, [fetchAllProducts]);

    const filtered = useMemo(() => {
        if (!debounced) return products;
        const q = debounced.toLowerCase();
        return products.filter((p:any) => p.name?.toLowerCase().includes(q) || p.slug?.toLowerCase().includes(q) || p.category?.toLowerCase().includes(q));
    }, [products, debounced]);

    const existingSlugs = useMemo(() => products.map((p:any) => p.slug), [products]);

    const stats = useMemo(() => {
        const totalUnits = products.reduce((s:any, p:any) => s + totalStock(p), 0);
        const outOfStock = products.filter((p:any) => totalStock(p) === 0).length;
        const lowStock = products.filter((p:any) => {
            const s = totalStock(p);
            return s > 0 && s < 10;
        }).length;
        return { total: products.length, totalUnits, outOfStock, lowStock };
    }, [products]);

    useEffect(() => {
        async function fetchStocks() {
            try {
                let res = await fetch("/api/stocks");
                let { freshDrops: f, bestSellers: b } = await res.json();
                setFreshDrop(f);
                setBestSellers(b);
            } catch (error) {
                console.error("Failed to fetch product placement stats:", error);
            }
        }
        fetchStocks();
    }, []);

    const handleMasterSubmit = async (payload: any) => {
        setIsSubmitting(true);

        try {
            const formData = new FormData();
            formData.append("name", payload.name);
            formData.append("slug", payload.slug);
            formData.append("description", payload.description || "");
            formData.append("gender", payload.gender);
            formData.append("category", payload.category);
            formData.append("price", payload.price.toString());
            formData.append("is_bestseller", payload.is_bestseller);
            formData.append("is_fresh_drop", payload.is_fresh_drop);
            if (payload.discountPrice) {
                formData.append("discountPrice", payload.discountPrice.toString());
            }

            formData.append("variants", JSON.stringify(payload.variants));
            formData.append("mediaMetadata", JSON.stringify(payload.mediaMetadata));
            formData.append("retainedMedia", JSON.stringify(payload.retainedMedia || []));

            payload.files.forEach((file: File) => {
                formData.append("files", file);
            });

            if (formMode === "create") {
                await createProduct(formData);
                toast.success("Product created successfully");
            } else if (formMode === "edit" && formInitial?.slug) {
                await updateProduct(formInitial.slug, formData);
                toast.success("Product updated successfully");
            }

            setFormMode(null);
            setDetailOpen(false);
            await fetchAllProducts();
        } catch (e: any) {
            toast.error(e.message || "An unexpected submission error occurred");
            console.error(e);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleDelete = async (slug: string) => {
        try {
            await deleteProduct(slug);
            toast.success("Product deleted");
            await fetchAllProducts();
            setDetailOpen(false);
        } catch (e: any) {
            toast.error(e.message || "Failed to delete product");
        }
    };

    function openCreate(prefill?: Product) {
        setFormInitial(prefill || null);
        setFormMode("create");
    }

    function openEdit(p: Product) {
        setFormInitial(p);
        setFormMode("edit");
        setDetailOpen(false);
    }

    function duplicate(p: Product) {
        const copy: Product = {
            ...p,
            name: `${p.name} (copy)`,
            slug: "",
            _id: undefined,
            id: undefined,
        };
        setDetailOpen(false);
        openCreate(copy);
    }

    // Handlers for clearing state
    const clearFilters = () => {
        setSearch("");
        router.push("/admin");
    };

    return (
        <div className="min-h-screen bg-background pb-20">
            <Toaster position="top-center" richColors />

            {/* Header */}
            <header className="sticky top-0 z-30 bg-background/75 backdrop-blur supports-backdrop-filter:bg-background/70">
                <div className="mx-auto max-w-2xl px-4 py-3">
                    <div className="mb-3 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-primary-foreground">
                                <ShoppingBag className="h-5 w-5" />
                            </div>
                            <div>
                                <h1 className="text-base font-bold leading-none">Rangoli Shoe</h1>
                                <p className="text-[10px] text-muted-foreground">Admin · Footwear store</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-1">
                            <Button variant="ghost" size="icon" onClick={fetchAllProducts} aria-label="Refresh" disabled={isFetching}>
                                <RefreshCcw className={`h-4 w-4 ${isFetching ? "animate-spin text-primary" : ""}`} />
                            </Button>
                            <Button size="icon" title="Logout" className="text-white" onClick={() => signOut()}>
                                <LogOut size={16} />
                            </Button>
                        </div>
                    </div>

                    <div className="relative">
                        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <Input placeholder="Search products..." value={search} onChange={(e) => setSearch(e.target.value)} className="h-11 rounded-xl pl-9" />
                    </div>

                    <div className="mt-2 grid grid-cols-2 gap-2">
                        <Select value={gender} onValueChange={(val) => updateQueryParams("gender", val)}>
                            <SelectTrigger className="h-10 rounded-xl">
                                <SelectValue placeholder="Gender" />
                            </SelectTrigger>
                            <SelectContent className="bg-white solid-shadow">
                                <SelectItem value="all">All genders</SelectItem>
                                {GENDERS.map((g) => (
                                    <SelectItem key={g} value={g}>{g}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>

                        <Select value={category} onValueChange={(val) => updateQueryParams("category", val)}>
                            <SelectTrigger className="h-10 rounded-xl">
                                <SelectValue placeholder="Category" />
                            </SelectTrigger>
                            <SelectContent className="bg-white solid-shadow">
                                <SelectItem value="all">All categories</SelectItem>
                                {CATEGORIES.map((c) => (
                                    <SelectItem key={c} value={c}>{c}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                </div>
            </header>

            <main className="mx-auto w-full max-w-2xl px-4 py-4">
                {/* Stats Dashboard Grid (Only show if we have data) */}
                {products.length > 0 && !error && (
                    <div className="mb-6 grid grid-cols-3 gap-2">
                        <StatCard icon={<Package className="h-3.5 w-3.5" />} label="Products" value={stats.total} />
                        <StatCard icon={<Flame className="h-3.5 w-3.5" />} label="FreshDrops" value={freshDrops} />
                        <StatCard icon={<Star className="h-3.5 w-3.5" />} label="BestSeller" value={bestSellers} />
                    </div>
                )}

                {/* Conditional Rendering for Loading, Error, Empty, and Data States */}
                {isLoading ? (
                    // 1. Loading State (Skeleton Grid)
                    <div className="grid grid-cols-2 gap-3">
                        {[1, 2, 3, 4, 5, 6].map((i) => (
                            <div key={i} className="flex flex-col gap-3 rounded-2xl border bg-card p-3 shadow-sm">
                                <div className="aspect-square w-full animate-pulse rounded-xl bg-muted/60" />
                                <div className="space-y-2">
                                    <div className="h-4 w-3/4 animate-pulse rounded bg-muted/60" />
                                    <div className="h-3 w-1/2 animate-pulse rounded bg-muted/60" />
                                </div>
                            </div>
                        ))}
                    </div>
                ) : error ? (
                    // 2. Error State
                    <div className="flex flex-col items-center justify-center rounded-2xl border border-destructive/20 bg-destructive/5 py-16 px-4 text-center mt-4">
                        <div className="mb-4 rounded-full bg-destructive/10 p-3 text-destructive">
                            <AlertCircle className="h-8 w-8" />
                        </div>
                        <h3 className="mb-1 text-lg font-semibold text-foreground">Failed to load products</h3>
                        <p className="mb-6 text-sm text-muted-foreground">{error.message || "An unexpected error occurred while fetching data."}</p>
                        <Button variant="default" onClick={fetchAllProducts} className="gap-2">
                            <RefreshCcw size={16} />
                            Try Again
                        </Button>
                    </div>
                ) : filtered.length === 0 ? (
                    // 3. Empty State (No results found)
                    <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-muted-foreground/20 bg-muted/10 py-20 px-4 text-center mt-4">
                        <div className="mb-4 rounded-full bg-muted p-4 text-muted-foreground">
                            <Package className="h-8 w-8 opacity-50" />
                        </div>
                        <h3 className="mb-1 text-lg font-medium text-foreground">No products found</h3>
                        <p className="mb-6 text-sm text-muted-foreground max-w-[250px]">
                            We couldn't find any items matching your current search or filter criteria.
                        </p>
                        {(search || category !== 'all' || gender !== 'all') ? (
                            <Button variant="outline" onClick={clearFilters}>
                                Clear all filters
                            </Button>
                        ) : (
                            <Button variant="default" onClick={() => openCreate()} className="gap-2">
                                <Plus size={16} />
                                Add your first product
                            </Button>
                        )}
                    </div>
                ) : (
                    // 4. Data State (Product Grid)
                    <div className="grid grid-cols-2 gap-3">
                        {filtered.map((p:any) => (
                            <ProductCard
                                key={p.slug || p._id}
                                product={p}
                                onClick={() => {
                                    setDetailProduct(p);
                                    setDetailOpen(true);
                                }}
                            />
                        ))}
                    </div>
                )}

                {/* Pagination Controls - Only show if data exists and there are multiple pages */}
                {!isLoading && !error && filtered.length > 0 && total > 1 && (
                    <div className="mt-8">
                        <Pagination page={page} total={total} handlePageChange={handlePageChange} />
                    </div>
                )}
            </main>

            {/* FAB */}
            {hasBaseUrl && !isLoading && !error && (
                <button
                    onClick={() => openCreate()}
                    className="fixed bottom-5 right-5 z-30 flex h-14 items-center gap-2 rounded-full bg-primary px-5 font-semibold text-primary-foreground shadow-[var(--shadow-pop)] transition hover:scale-105 active:scale-95"
                    aria-label="Add product"
                >
                    <Plus className="h-5 w-5" />
                    <span>New</span>
                </button>
            )}

            <ProductDetail
                product={detailProduct}
                open={detailOpen}
                onOpenChange={setDetailOpen}
                onEdit={() => detailProduct && openEdit(detailProduct)}
                onDelete={() => detailProduct && handleDelete(detailProduct.slug)}
                onDuplicate={() => detailProduct && duplicate(detailProduct)}
            />

            <Sheet open={formMode !== null} onOpenChange={(o) => !o && setFormMode(null)}>
                <SheetContent side="bottom" className="h-[95vh] overflow-y-auto rounded-t-3xl">
                    <SheetHeader className="mb-2">
                        <SheetTitle className="text-xl">{formMode === "create" ? "New product" : "Edit product"}</SheetTitle>
                    </SheetHeader>
                    {formMode && <ProductForm mode={formMode} initial={formInitial} existingSlugs={existingSlugs} submitting={isSubmitting} onSubmit={handleMasterSubmit} />}
                </SheetContent>
            </Sheet>
        </div>
    );
}

function StatCard({ icon, label, value, tone = "default" }: { icon: React.ReactNode; label: string; value: number; tone?: "default" | "warning" | "destructive" }) {
    const toneClass = tone === "destructive" ? "text-destructive" : tone === "warning" ? "text-warning" : "text-primary";
    return (
        <div className="rounded-2xl border bg-card p-3 shadow-sm">
            <div className={`flex items-center gap-1 text-[10px] uppercase tracking-wider ${toneClass}`}>
                {icon}
                <span>{label}</span>
            </div>
            <div className="mt-1 text-xl font-bold">{value}</div>
        </div>
    );
}