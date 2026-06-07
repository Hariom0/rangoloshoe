import { Loader2 } from "lucide-react";

export default function Loading() {
    return (
        // min-h-[60vh] ensures it centers nicely between your Navbar and Footer
        <div className="flex min-h-[60vh] flex-col items-center justify-center bg-background">
            <div className="flex flex-col items-center gap-4">
                {/* Spinning Icon */}
                <Loader2 className="h-10 w-10 animate-spin text-primary" />
                
                {/* Subtle Text */}
                <p className="text-sm font-semibold tracking-[0.15em] text-foreground/60 uppercase animate-pulse">
                    Loading
                </p>
            </div>
        </div>
    );
}