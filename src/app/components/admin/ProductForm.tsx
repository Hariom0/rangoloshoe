"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import { Label } from "@/app/components/ui/label";
import { Textarea } from "@/app/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/components/ui/select";
import { Card } from "@/app/components/ui/card";
import { Badge } from "@/app/components/ui/badge";
import {
  CheckCircle2,
  Film,
  ImagePlus,
  Loader2,
  Package,
  Plus,
  Sparkles,
  Trash2,
  X,
  Flame, // Added for Fresh Drop iconography
  Star,  // Added for Bestseller iconography
} from "lucide-react";
import {
  CATEGORIES,
  GENDERS,
  type Product,
  type Variant,
} from "@/lib/admin/types";
import { slugify, uniqueSlug } from "@/lib/admin/api";
import { toast } from "sonner";

interface Props {
  mode: "create" | "edit";
  initial?: Product | null;
  existingSlugs: string[];
  onSubmit: (payload: {
    name: string;
    slug: string;
    description?: string;
    gender?: string;
    category?: string;
    price: number;
    discountPrice?: number;
    variants: Variant[];
    files: File[];
    retainedMedia?: any[]; 
    mediaMetadata: { altText: string; isPrimary: boolean }[];
    is_fresh_drop: boolean; // MODIFICATION: Added to payload interface
    is_bestseller: boolean;  // MODIFICATION: Added to payload interface
  }) => Promise<void>;
  submitting: boolean;
}

export function ProductForm({ mode, initial, existingSlugs, onSubmit, submitting }: Props) {
  const [name, setName] = useState(initial?.name || "");
  const [slug, setSlug] = useState(initial?.slug || "");
  const [slugDirty, setSlugDirty] = useState(!!initial);
  const [description, setDescription] = useState(initial?.description || "");
  const [gender, setGender] = useState(initial?.gender || "Unisex");
  const [category, setCategory] = useState(initial?.category || "Sneakers");
  const [price, setPrice] = useState<string>(initial?.price?.toString() || "");
  const [discountPrice, setDiscountPrice] = useState<string>(
    initial?.discountPrice?.toString() || "",
  );
  
  // MODIFICATION: Initialize state hooks for boolean values
  const [isFreshDrop, setIsFreshDrop] = useState<boolean>(initial?.is_fresh_drop || false);
  const [isBestseller, setIsBestseller] = useState<boolean>(initial?.is_bestseller || false);

  const [variants, setVariants] = useState<Variant[]>(
    initial?.variants?.length ? initial.variants : [{ size: 9, stock: 1, sku: "" }],
  );

  // Media State Management
  const [existingMedia, setExistingMedia] = useState<any[]>(initial?.images || []);
  const [files, setFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<{ src: string; isVideo: boolean }[]>([]);
  
  const [primaryIdx, setPrimaryIdx] = useState(() => {
    if (initial?.images) {
      const idx = initial.images.findIndex((img: any) => img.isPrimary);
      return idx >= 0 ? idx : 0;
    }
    return 0;
  });

  const fileRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!slugDirty && mode === "create") {
      setSlug(uniqueSlug(name, existingSlugs));
    }
  }, [name, slugDirty, existingSlugs, mode]);

  useEffect(() => {
    if (mode !== "create") return;
    const prefix = name
      .split(/\s+/)
      .map((w) => w[0])
      .filter(Boolean)
      .join("")
      .toUpperCase()
      .slice(0, 3);
    if (!prefix) return;
    setVariants((prev) =>
      prev.map((v) => (v.sku ? v : { ...v, sku: `${prefix}-${v.size}` })),
    );
  }, [name, mode]);

  useEffect(() => {
    const newPreviews = files.map((f) => ({
      src: URL.createObjectURL(f),
      isVideo: f.type.startsWith("video/"),
    }));
    setPreviews(newPreviews);
    
    return () => newPreviews.forEach((p) => URL.revokeObjectURL(p.src));
  }, [files]);

  function addVariant() {
    const last = variants[variants.length - 1];
    const nextSize = last ? Number(last.size) + 1 : 9;
    const prefix = name
      .split(/\s+/)
      .map((w) => w[0])
      .filter(Boolean)
      .join("")
      .toUpperCase()
      .slice(0, 3);
    setVariants([...variants, { size: nextSize, stock: 1, sku: prefix ? `${prefix}-${nextSize}` : "" }]);
  }

  function updateVariant(i: number, patch: Partial<Variant>) {
    setVariants(variants.map((v, idx) => (idx === i ? { ...v, ...patch } : v)));
  }

  function removeVariant(i: number) {
    if (variants.length === 1) return;
    setVariants(variants.filter((_, idx) => idx !== i));
  }

  function handleFiles(list: FileList | null) {
    if (!list) return;
    const arr = Array.from(list).filter((f) => f.size < 20 * 1024 * 1024);
    if (arr.length !== list.length) {
      toast.warning("Some files were skipped (max 20MB each)");
    }
    setFiles((prev) => [...prev, ...arr]);
  }

  function removeMediaItem(globalIndex: number) {
    const existingCount = existingMedia.length;
    if (globalIndex < existingCount) {
      setExistingMedia((prev) => prev.filter((_, idx) => idx !== globalIndex));
    } else {
      const fileIndex = globalIndex - existingCount;
      setFiles((prev) => prev.filter((_, idx) => idx !== fileIndex));
    }

    if (primaryIdx === globalIndex) {
      setPrimaryIdx(0);
    } else if (primaryIdx > globalIndex) {
      setPrimaryIdx((prev) => prev - 1);
    }
  }

  async function submit() {
    if (!name.trim()) return toast.error("Name is required");
    if (!slug.trim()) return toast.error("Slug is required");
    
    const p = Number(price);
    if (!p || p <= 0) return toast.error("Valid price required");
    
    const dp = discountPrice ? Number(discountPrice) : undefined;
    if (dp !== undefined && dp > p) return toast.error("Discount must be less than price");
    
    if (mode === "create" && existingSlugs.includes(slug)) {
      return toast.error("Slug already in use, change it");
    }
    
    if (variants.some((v) => !v.sku || !v.size)) {
      return toast.error("Every variant needs a size and SKU");
    }

    const totalMediaCount = existingMedia.length + files.length;
    if (totalMediaCount === 0) {
      return toast.error("At least one product image is required");
    }

    const mediaMetadata = Array.from({ length: totalMediaCount }).map((_, i) => ({
      altText: name,
      isPrimary: i === primaryIdx,
    }));

    await onSubmit({
      name: name.trim(),
      slug: slug.trim(),
      description: description.trim() || undefined,
      gender,
      category,
      price: p,
      discountPrice: dp,
      variants: variants.map((v) => ({
        size: Number(v.size) || v.size,
        stock: Number(v.stock) || 0,
        sku: v.sku.trim(),
      })),
      files,
      retainedMedia: existingMedia,
      mediaMetadata,
      is_fresh_drop: isFreshDrop, // MODIFICATION: Passed to state handler
      is_bestseller: isBestseller,  // MODIFICATION: Passed to state handler
    });
  }

  const totalStock = variants.reduce((s, v) => s + (Number(v.stock) || 0), 0);
  
  const allMedia = [
    ...existingMedia.map(m => ({ src: m.url, isVideo: m.url.includes('.mp4') || m.url.includes('/video/') })),
    ...previews
  ];

  return (
    <div className="mx-auto w-full max-w-2xl px-4 py-6 flex flex-col gap-8 pb-36">
      
      {/* Basics */}
      <section className="space-y-4">
        <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
          Basics
        </h3>
        <div className="space-y-4 p-4 rounded-2xl border bg-card/50">
          <div className="space-y-2">
            <Label htmlFor="name">Product name *</Label>
            <Input
              id="name"
              placeholder="e.g. Urban Stride Sneaker"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="h-12 text-base bg-background"
            />
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="slug">URL slug</Label>
              {!slugDirty && mode === "create" && (
                <span className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Sparkles className="h-3 w-3" /> auto
                </span>
              )}
            </div>
            <Input
              id="slug"
              value={slug}
              onChange={(e) => {
                setSlug(slugify(e.target.value));
                setSlugDirty(true);
              }}
              disabled={mode === "edit"}
              className="h-12 font-mono text-sm bg-background disabled:opacity-50"
            />
            {mode === "edit" && (
              <p className="text-[10px] text-muted-foreground">Slug cannot be changed once created.</p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="desc">Description</Label>
            <Textarea
              id="desc"
              placeholder="What makes this product special?"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
              className="bg-background resize-none"
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-2">
              <Label>Gender</Label>
              <Select value={gender} onValueChange={setGender}>
                <SelectTrigger className="h-12 bg-background"><SelectValue /></SelectTrigger>
                <SelectContent className="bg-white solid-shadow">
                  {GENDERS.map((g) => <SelectItem key={g} value={g}>{g}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Category</Label>
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger className="h-12 bg-background"><SelectValue /></SelectTrigger>
                <SelectContent className="bg-white solid-shadow">
                  {CATEGORIES.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </section>

      {/* MODIFICATION: Brand Badges and Display Strategy Section */}
      <section className="space-y-4">
        <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
          Product Placement
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          
          {/* Fresh Drop Toggle Card */}
          <div 
            onClick={() => setIsFreshDrop(!isFreshDrop)}
            className={`p-4 rounded-2xl border-2 cursor-pointer flex items-start gap-4 transition-all select-none ${
              isFreshDrop 
                ? "border-amber-500 bg-amber-500/5 dark:bg-amber-500/10" 
                : "border-border bg-card/50 hover:bg-card"
            }`}
          >
            <div className={`p-2.5 rounded-xl border transition-colors ${
              isFreshDrop ? "bg-amber-500 text-black border-amber-600" : "bg-background text-muted-foreground"
            }`}>
              <Flame className="h-5 w-5" />
            </div>
            <div className="space-y-0.5 flex-1">
              <span className="text-sm font-semibold block text-foreground">Fresh Drop</span>
              <span className="text-xs text-muted-foreground block leading-tight">
                Features item inside the frontpage "Just Dropped" collection feed.
              </span>
            </div>
            <input 
              type="checkbox" 
              checked={isFreshDrop} 
              readOnly 
              className="accent-amber-500 h-4 w-4 rounded mt-1 pointer-events-none" 
            />
          </div>

          {/* Bestseller Toggle Card */}
          <div 
            onClick={() => setIsBestseller(!isBestseller)}
            className={`p-4 rounded-2xl border-2 cursor-pointer flex items-start gap-4 transition-all select-none ${
              isBestseller 
                ? "border-primary bg-primary/5" 
                : "border-border bg-card/50 hover:bg-card"
            }`}
          >
            <div className={`p-2.5 rounded-xl border transition-colors ${
              isBestseller ? "bg-primary text-on-primary border-primary" : "bg-background text-muted-foreground"
            }`}>
              <Star className="h-5 w-5" />
            </div>
            <div className="space-y-0.5 flex-1">
              <span className="text-sm font-semibold block text-foreground">Bestseller</span>
              <span className="text-xs text-muted-foreground block leading-tight">
                Features item inside the "Timeless Essentials" collection row.
              </span>
            </div>
            <input 
              type="checkbox" 
              checked={isBestseller} 
              readOnly 
              className="accent-primary h-4 w-4 rounded mt-1 pointer-events-none" 
            />
          </div>

        </div>
      </section>

      {/* Pricing */}
      <section className="space-y-4">
        <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
          Pricing
        </h3>
        <div className="grid grid-cols-2 gap-4 p-4 rounded-2xl border bg-card/50">
          <div className="space-y-2">
            <Label>Price *</Label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">₹</span>
              <Input
                inputMode="decimal"
                value={price}
                onChange={(e) => setPrice(e.target.value.replace(/[^0-9.]/g, ""))}
                className="h-12 pl-7 bg-background"
                placeholder="120"
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label>Sale price</Label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">₹</span>
              <Input
                inputMode="decimal"
                value={discountPrice}
                onChange={(e) => setDiscountPrice(e.target.value.replace(/[^0-9.]/g, ""))}
                className="h-12 pl-7 bg-background"
                placeholder="optional"
              />
            </div>
          </div>
          {price && discountPrice && Number(discountPrice) < Number(price) && (
            <p className="col-span-2 flex items-center gap-1.5 text-xs font-medium text-emerald-600 dark:text-emerald-400">
              <CheckCircle2 className="h-4 w-4" />
              Users save {Math.round((1 - Number(discountPrice) / Number(price)) * 100)}% on this product
            </p>
          )}
        </div>
      </section>

      {/* Variants */}
      <section className="space-y-4">
        <div className="flex items-end justify-between">
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
              Inventory
            </h3>
            <p className="mt-1 flex items-center gap-1.5 text-xs text-muted-foreground">
              <Package className="h-3.5 w-3.5" />
              {totalStock} units across {variants.length} {variants.length === 1 ? "size" : "sizes"}
            </p>
          </div>
          <Button type="button" variant="outline" size="sm" onClick={addVariant} className="h-9">
            <Plus className="h-4 w-4 mr-1" /> Add variant
          </Button>
        </div>
        <div className="space-y-3">
          {variants.map((v, i) => (
            <Card key={i} className="p-3 shadow-sm transition-all hover:shadow-md">
              <div className="grid grid-cols-[1fr_1fr_1.5fr_auto] items-end gap-3">
                <div className="space-y-1">
                  <Label className="text-[10px] uppercase text-muted-foreground">Size</Label>
                  <Input
                    value={v.size}
                    onChange={(e) => updateVariant(i, { size: e.target.value })}
                    className="h-10 text-sm bg-background"
                  />
                </div>
                <div className="space-y-1">
                  <Label className="text-[10px] uppercase text-muted-foreground">Stock</Label>
                  <Input
                    inputMode="numeric"
                    value={v.stock}
                    onChange={(e) =>
                      updateVariant(i, { stock: Number(e.target.value.replace(/\D/g, "")) || 0 })
                    }
                    className="h-10 text-sm bg-background"
                  />
                </div>
                <div className="space-y-1">
                  <Label className="text-[10px] uppercase text-muted-foreground">SKU</Label>
                  <Input
                    value={v.sku}
                    onChange={(e) => updateVariant(i, { sku: e.target.value.toUpperCase() })}
                    className="h-10 text-sm font-mono bg-background"
                  />
                </div>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => removeVariant(i)}
                  disabled={variants.length === 1}
                  className="h-10 w-10 text-destructive hover:bg-destructive/10 hover:text-destructive"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* Media Management */}
      <section className="space-y-4">
        <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
          Media
        </h3>
        
        <input
          ref={fileRef}
          type="file"
          accept="image/*,video/*"
          multiple
          className="hidden"
          onChange={(e) => {
            handleFiles(e.target.files);
            e.target.value = "";
          }}
        />
        
        <button
          type="button"
          onClick={() => fileRef.current?.click()}
          className="flex w-full flex-col items-center justify-center gap-3 rounded-2xl border-2 border-dashed border-border bg-muted/30 py-10 text-sm transition hover:bg-muted/50 active:scale-[0.99]"
        >
          <div className="p-3 bg-background rounded-full shadow-sm">
            <ImagePlus className="h-6 w-6 text-primary" />
          </div>
          <div className="flex flex-col items-center gap-1">
            <span className="font-semibold">Tap to upload media</span>
            <span className="text-xs text-muted-foreground">JPG, PNG, MP4 up to 20MB</span>
          </div>
        </button>

        {allMedia.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {allMedia.map((media, i) => (
              <div
                key={i}
                className={`group relative overflow-hidden rounded-xl border-2 transition-all ${
                  primaryIdx === i ? "border-primary shadow-sm" : "border-border"
                }`}
              >
                {media.isVideo ? (
                  <div className="relative aspect-square w-full bg-black/5">
                    <video 
                      src={media.src} 
                      className="aspect-square w-full object-cover" 
                      autoPlay 
                      muted 
                      loop 
                      playsInline 
                    />
                    <div className="absolute top-2 left-2 bg-background/90 p-1.5 rounded-md shadow-sm backdrop-blur">
                      <Film className="h-3 w-3 text-foreground" />
                    </div>
                  </div>
                ) : (
                  <img src={media.src} className="aspect-square w-full object-cover" alt="" />
                )}
                
                {/* Overlay Controls */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                
                <button
                  type="button"
                  onClick={() => removeMediaItem(i)}
                  className="absolute right-2 top-2 rounded-full bg-black/50 p-1.5 text-white backdrop-blur hover:bg-destructive transition-colors"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
                
                <button
                  type="button"
                  onClick={() => setPrimaryIdx(i)}
                  className={`absolute bottom-2 left-2 right-2 rounded-md py-1.5 text-xs font-medium backdrop-blur transition-colors ${
                    primaryIdx === i 
                      ? "bg-primary text-primary-foreground shadow-md" 
                      : "bg-white/80 text-foreground hover:bg-white"
                  }`}
                >
                  {primaryIdx === i ? "★ Primary" : "Make primary"}
                </button>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Floating Submit Island */}
      <div className="fixed bottom-0 left-0 right-0 z-40 pointer-events-none p-4 pb-6">
        <div className="mx-auto max-w-2xl w-full pointer-events-auto bg-background/90 backdrop-blur-lg border border-border shadow-2xl rounded-2xl p-3 flex items-center gap-4 transition-all">
          <div className="hidden sm:flex flex-1 flex-col px-2">
            <span className="text-[10px] uppercase font-bold text-muted-foreground tracking-wider">Product Slug</span>
            <span className="font-mono text-sm truncate max-w-[200px] text-foreground">{slug || "auto-generated"}</span>
          </div>
          
          <Button
            onClick={submit}
            disabled={submitting}
            size="lg"
            className="flex-1 sm:flex-none sm:w-48 h-12 text-base font-semibold shadow-lg shadow-primary/20 rounded-xl"
          >
            {submitting ? (
              <Loader2 className="h-5 w-5 animate-spin" />
            ) : mode === "create" ? (
              "Create product"
            ) : (
              "Save changes"
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}