import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}
export function addToWishlist(slug: string): boolean {
	// 1. Guard check for SSR (Next.js server-side safety)
	if (typeof window === "undefined") return false;

	try {
		const stored = localStorage.getItem("wishlist");
		let wishlist: string[] = [];

		if (stored) {
			wishlist = JSON.parse(stored);
			// Ensure the parsed data is actually an array
			if (!Array.isArray(wishlist)) wishlist = [];
		}

		// 2. Prevent duplicate entries
		if (wishlist.includes(slug)) {
			return false; // Already in wishlist
		}

		// 3. Append the new slug and commit to storage
		wishlist.push(slug);
		localStorage.setItem("wishlist", JSON.stringify(wishlist));

		// 4. Dispatch a custom event so other components (like a Navbar badge) update instantly
		window.dispatchEvent(new Event("wishlist-updated"));

		return true;
	} catch (error) {
		console.error("Failed to update wishlist storage state:", error);
		return false;
	}
}
interface LocalCartItem {
  slug: string;
  size: string | number;
  quantity: number;
}

/**
 * Adds a product variant configuration to the localStorage cart array.
 * Increments quantity if the exact item configuration (slug + size) exists.
 * * @param slug The unique product identifier string
 * @param size The selected footwear size (e.g., 9, 10, " 9")
 * @param quantity Optional number of units to add (defaults to 1)
 * @returns boolean - true if successful, false otherwise
 */
export function addToCart(
  slug: string,
  size: string | number | undefined,
  quantity: number = 1
): boolean {
  // 1. Guard check for SSR (Next.js server-side safety) and missing selections
  if (typeof window === "undefined" || !size) return false;

  try {
    const stored = localStorage.getItem("cart");
    let cart: LocalCartItem[] = [];

    if (stored) {
      try {
        cart = JSON.parse(stored);
        if (!Array.isArray(cart)) cart = [];
      } catch {
        cart = [];
      }
    }

    // 2. Locate duplicate matching item configurations (slug AND size must match)
    const existingIndex = cart.findIndex(
      (item) => item.slug === slug && String(item.size) === String(size)
    );

    if (existingIndex > -1) {
      // Config match found: increment the unit weight counter
      cart[existingIndex].quantity += quantity;
    } else {
      // Unique configuration: map a new item entry row
      cart.push({ slug, size, quantity });
    }

    // 3. Commit state arrays back to device hardware storage
    localStorage.setItem("cart", JSON.stringify(cart));

    // 4. Fire custom system broadcast event so your navbar badge updates instantly
    window.dispatchEvent(new Event("cart-updated"));

    return true;
  } catch (error) {
    console.error("Critical error updating local cart storage array:", error);
    return false;
  }
}