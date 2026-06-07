import { Badge } from "@/app/components/ui/badge";
import { primaryImage, totalStock } from "@/lib/admin/api";
import type { Product } from "@/lib/admin/types";
import { ImageOff, Tag, Flame, Star } from "lucide-react"; // Added Flame and Star icons

export function ProductCard({ product, onClick }: { product: Product; onClick: () => void }) {
  const img = primaryImage(product);
  const stock = totalStock(product);
  const status =
    stock === 0
      ? { label: "Out of stock", className: "bg-destructive text-destructive-foreground" }
      : stock < 10
        ? { label: "Low stock", className: "bg-warning text-warning-foreground" }
        : { label: "Active", className: "bg-success text-success-foreground" };

  const hasDiscount =
    product.discountPrice && Number(product.discountPrice) < Number(product.price);

  return (
    <button
      onClick={onClick}
      className="group flex w-full flex-col overflow-hidden rounded-2xl bg-card text-left shadow-[var(--shadow-soft)] transition active:scale-[0.98]"
    >
      <div className="relative aspect-square w-full overflow-hidden bg-muted">
        {img ? (
          <img
            src={img}
            alt={product.name}
            loading="lazy"
            className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-muted-foreground">
            <ImageOff className="h-8 w-8" />
          </div>
        )}
        
        {/* Availability Status (Top Left) */}
        <Badge className={`absolute left-2 top-2 ${status.className} border-0 z-10 shadow-sm`}>
          {status.label}
        </Badge>

        {/* Marketing/Promo Badges Stack (Top Right) */}
        <div className="absolute right-2 top-2 flex flex-col items-end gap-1 z-10">
          {product.is_fresh_drop && (
            <Badge className="border-0 bg-amber-500 text-black font-bold shadow-sm">
              <Flame className="mr-1 h-3 w-3 fill-black" />
              Drop
            </Badge>
          )}
          
          {product.is_bestseller && (
            <Badge className="border-0 bg-primary text-on-primary font-bold shadow-sm">
              <Star className="mr-1 h-3 w-3 fill-current" />
              Best
            </Badge>
          )}

          {/* Sale fallback conditional */}
          {!product.is_fresh_drop && !product.is_bestseller && hasDiscount && (
            <Badge className="border-0 bg-foreground text-background shadow-sm">
              <Tag className="mr-1 h-3 w-3" />
              Sale
            </Badge>
          )}
        </div>
      </div>

      <div className="flex flex-col gap-1 p-3">
        <h3 className="line-clamp-1 text-sm font-semibold">{product.name}</h3>
        <p className="line-clamp-1 text-xs text-muted-foreground">
          {product.category} · {product.gender}
        </p>
        <div className="mt-1 flex items-baseline gap-2">
          <span className="text-base font-bold text-primary">
            ₹{hasDiscount ? product.discountPrice : product.price}
          </span>
          {hasDiscount && (
            <span className="text-xs text-muted-foreground line-through">₹{product.price}</span>
          )}
        </div>
      </div>
    </button>
  );
}