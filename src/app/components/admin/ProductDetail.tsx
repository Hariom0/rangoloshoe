import { useEffect, useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/app/components/ui/sheet";
import { Button } from "@/app/components/ui/button";
import { Badge } from "@/app/components/ui/badge";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/app/components/ui/alert-dialog";
import { 
  Copy, 
  ImageOff, 
  Pencil, 
  Trash2, 
  Calendar, 
  PlayCircle, 
  Eye, 
  EyeOff,
  Flame, // Added for Fresh Drop badge
  Star   // Added for Bestseller badge
} from "lucide-react";
import { totalStock } from "@/lib/admin/api";
import type { Product } from "@/lib/admin/types";
import { toast } from "sonner";

interface Props {
  product: Product | null;
  open: boolean;
  onOpenChange: (o: boolean) => void;
  onEdit: () => void;
  onDelete: () => void;
  onDuplicate: () => void;
}

export function ProductDetail({ product, open, onOpenChange, onEdit, onDelete, onDuplicate }: Props) {
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [activeMediaIndex, setActiveMediaIndex] = useState(0);

  const media = product?.media || product?.images || [];

  // Reset to the primary image whenever the product changes
  useEffect(() => {
    if (product && media.length > 0) {
      const primaryIdx = media.findIndex((m: any) => m.isPrimary);
      setActiveMediaIndex(primaryIdx !== -1 ? primaryIdx : 0);
    } else {
      setActiveMediaIndex(0);
    }
  }, [product]);

  if (!product) return null;

  const stock = totalStock(product);
  const hasDiscount =
    product.discountPrice && Number(product.discountPrice) < Number(product.price);
  
  const activeMedia = media[activeMediaIndex];
  const isVideo = activeMedia?.url?.includes(".mp4") || activeMedia?.url?.includes("/video/");

  return (
    <>
      <Sheet open={open} onOpenChange={onOpenChange}>
        <SheetContent 
          side="bottom" 
          className="h-[92vh] sm:max-h-[85vh] sm:max-w-[420px] sm:mx-auto w-full overflow-y-auto rounded-t-3xl sm:rounded-3xl p-0 border-t sm:border shadow-2xl sm:mb-4"
        >
          <SheetHeader className="sr-only">
            <SheetTitle>{product.name}</SheetTitle>
          </SheetHeader>
          
          {/* Hero Media Preview */}
          <div className="relative aspect-square w-full bg-black/5 flex items-center justify-center overflow-hidden">
            {activeMedia ? (
              isVideo ? (
                <video 
                  src={activeMedia.url} 
                  controls 
                  className="h-full w-full object-contain bg-black"
                  autoPlay
                  muted
                />
              ) : (
                <img 
                  src={activeMedia.url} 
                  alt={activeMedia.altText || product.name} 
                  className="h-full w-full object-cover" 
                />
              )
            ) : (
              <div className="flex flex-col items-center justify-center text-muted-foreground gap-2">
                <ImageOff className="h-10 w-10 opacity-50" />
                <span className="text-sm font-medium">No media available</span>
              </div>
            )}
            
            {/* Absolute Status Badges Container */}
            <div className="absolute top-4 left-4 flex flex-col gap-1.5 items-start">
              {/* Product Visibility Badge */}
              <Badge variant={product.isActive ? "default" : "secondary"} className="shadow-md backdrop-blur-md bg-background/95 text-foreground hover:bg-background">
                {product.isActive ? <Eye className="h-3 w-3 mr-1 text-emerald-500" /> : <EyeOff className="h-3 w-3 mr-1 text-muted-foreground" />}
                {product.isActive ? "Active" : "Draft"}
              </Badge>

              {/* MODIFICATION: Dynamic Placement Badges */}
              {product.is_fresh_drop && (
                <Badge className="bg-amber-500 text-black border-transparent shadow-md font-bold hover:bg-amber-500">
                  <Flame className="h-3 w-3 mr-1 fill-black" /> Fresh Drop
                </Badge>
              )}
              
              {product.is_bestseller && (
                <Badge className="bg-primary text-on-primary border-transparent shadow-md font-bold hover:bg-primary">
                  <Star className="h-3 w-3 mr-1 fill-current" /> Bestseller
                </Badge>
              )}
            </div>
          </div>

          {/* Media Thumbnails Gallery */}
          {media.length > 1 && (
            <div className="flex gap-2 overflow-x-auto p-4 no-scrollbar border-b bg-muted/20">
              {media.map((m: any, i: number) => {
                const isThumbVideo = m.url.includes(".mp4") || m.url.includes("/video/");
                const isSelected = i === activeMediaIndex;
                
                return (
                  <button
                    key={m._id || i}
                    onClick={() => setActiveMediaIndex(i)}
                    className={`relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-lg border-2 transition-all ${
                      isSelected ? "border-primary opacity-100" : "border-transparent opacity-60 hover:opacity-100"
                    }`}
                  >
                    {isThumbVideo ? (
                      <div className="flex h-full w-full items-center justify-center bg-black/80">
                        <PlayCircle className="h-6 w-6 text-white" />
                      </div>
                    ) : (
                      <img
                        src={m.url}
                        alt={m.altText || `Thumbnail ${i + 1}`}
                        className="h-full w-full object-cover"
                      />
                    )}
                  </button>
                );
              })}
            </div>
          )}

          <div className="space-y-6 p-5">
            {/* Header Info */}
            <div>
              <div className="flex items-start justify-between gap-3">
                <h2 className="text-2xl font-bold leading-tight tracking-tight">{product.name}</h2>
                <Badge
                  className={
                    stock === 0
                      ? "bg-destructive text-destructive-foreground whitespace-nowrap"
                      : stock < 10
                        ? "bg-amber-500 text-white whitespace-nowrap"
                        : "bg-emerald-500 text-white whitespace-nowrap"
                  }
                >
                  {stock} in stock
                </Badge>
              </div>
              <p className="mt-1 text-sm text-muted-foreground font-medium">
                {product.category} · {product.gender}
              </p>
              <button
                onClick={() => {
                  navigator.clipboard.writeText(product.slug);
                  toast.success("Slug copied to clipboard");
                }}
                className="mt-3 inline-flex items-center gap-1.5 rounded-md bg-muted/50 px-2.5 py-1.5 font-mono text-[11px] text-muted-foreground hover:bg-muted transition-colors"
              >
                {product.slug} <Copy className="h-3 w-3" />
              </button>
            </div>

            {/* Pricing */}
            <div className="flex items-end gap-3 rounded-xl bg-muted/30 p-4 border">
              <span className="text-3xl font-bold text-foreground leading-none">
                ₹{hasDiscount ? product.discountPrice : product.price}
              </span>
              {hasDiscount && (
                <>
                  <span className="text-lg text-muted-foreground line-through leading-none mb-1">
                    ₹{product.price}
                  </span>
                  <Badge variant="destructive" className="mb-1 rounded-sm px-1.5 font-bold">
                    -{Math.round((1 - Number(product.discountPrice) / Number(product.price)) * 100)}%
                  </Badge>
                </>
              )}
            </div>

            {/* Description */}
            {product.description && (
              <div className="space-y-2">
                <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Description</h3>
                <p className="text-sm leading-relaxed text-foreground/80">{product.description}</p>
              </div>
            )}

            {/* Variants / Sizes */}
            <div className="space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center justify-between">
                <span>Variants ({product.variants?.length || 0})</span>
              </h3>
              <div className="grid grid-cols-2 gap-2">
                {(product.variants || []).map((v: any, i: number) => (
                  <div
                    key={v._id || i}
                    className="flex flex-col justify-center rounded-xl border bg-card p-3 shadow-sm"
                  >
                    <div className="flex items-center justify-between mb-1">
                      <div className="text-sm font-bold">Size {v.size}</div>
                      <Badge
                        variant={v.stock === 0 ? "destructive" : "secondary"}
                        className="text-[10px]"
                      >
                        {v.stock} qty
                      </Badge>
                    </div>
                    <div className="font-mono text-[10px] text-muted-foreground truncate" title={v.sku}>
                      {v.sku}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Meta Data */}
            <div className="flex flex-col gap-1 text-[11px] text-muted-foreground border-t pt-4">
              <div className="flex items-center gap-1.5">
                <Calendar className="h-3 w-3" />
                <span>Created: {new Date(product.createdAt).toLocaleDateString()}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Calendar className="h-3 w-3" />
                <span>Last updated: {new Date(product.updatedAt).toLocaleDateString()}</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-2 gap-2 pt-2">
              <Button variant="outline" onClick={onDuplicate} className="h-12 rounded-xl">
                <Copy className="h-4 w-4 mr-2" /> Duplicate
              </Button>
              <Button onClick={onEdit} className="h-12 rounded-xl">
                <Pencil className="h-4 w-4 mr-2" /> Edit
              </Button>
            </div>

            <Button
              variant="ghost"
              onClick={() => setConfirmOpen(true)}
              className="h-12 w-full text-destructive hover:bg-destructive/10 hover:text-destructive rounded-xl mt-2"
            >
              <Trash2 className="h-4 w-4 mr-2" /> Delete product
            </Button>
          </div>
        </SheetContent>
      </Sheet>

      <AlertDialog open={confirmOpen} onOpenChange={setConfirmOpen}>
        <AlertDialogContent className="sm:max-w-[400px] rounded-2xl">
          <AlertDialogHeader>
            <AlertDialogTitle>Delete "{product.name}"?</AlertDialogTitle>
            <AlertDialogDescription>
              This permanently removes the product, its variants, and all attached media. This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="rounded-xl">Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                setConfirmOpen(false);
                onDelete();
              }}
              className="bg-destructive hover:bg-destructive/90 rounded-xl"
            >
              Yes, delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}