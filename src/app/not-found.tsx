import Link from "next/link";
import { ArrowLeft, Compass } from "lucide-react";

export default function NotFound() {
  return (
    <main className="min-h-screen flex flex-col justify-center items-center p-6 bg-background relative overflow-hidden selection:bg-primary/10 selection:text-primary">
      {/* Top accent branding line matching the login portal layout */}
      <div className="absolute top-0 left-0 right-0 h-1.5 bg-primary" />
      
      {/* Subtle, oversized historical background watermarking */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center opacity-[0.02] select-none">
        <span className="font-headline text-[32vw] italic font-bold">1984</span>
      </div>

      <div className="w-full max-w-md text-center space-y-8 relative z-10">
        {/* Error Flagging */}
        <div className="space-y-3">
          <span className="font-body text-[11px] font-semibold uppercase tracking-widest text-primary bg-primary/5 px-3 py-1 rounded-full border border-primary/10">
            Error Code 404
          </span>
          <h1 className="font-headline text-5xl italic text-foreground tracking-tight pt-2">
            Lost Your Footing?
          </h1>
        </div>

        {/* Brand-Aligned Context Messaging */}
        <p className="font-body text-sm text-muted-foreground leading-relaxed max-w-sm mx-auto">
          Even the finest handcrafted journeys experience an occasional misstep. The page you are looking for has stepped away, moved positions, or never existed.
        </p>

        <div className="w-12 h-px bg-primary/20 mx-auto" />

        {/* Smart UX Alternative Paths */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
          <Link
            href="/"
            className="w-full sm:w-auto h-12 px-6 bg-primary text-white font-medium rounded-xl text-sm transition-all duration-300 shadow-md shadow-primary/10 hover:bg-primary/95 hover:shadow-lg hover:shadow-primary/20 active:scale-[0.99] flex items-center justify-center gap-2"
          >
            <ArrowLeft size={16} />
            <span>Return Home</span>
          </Link>
          
          <Link
            href="/collections" // Quick access path fallback for you during development
            className="w-full sm:w-auto h-12 px-6 bg-white text-foreground font-medium rounded-xl text-sm border border-border transition-all duration-300 hover:bg-muted/40 active:scale-[0.99] flex items-center justify-center gap-2"
          >
            <Compass size={16} />
            <span>View Collections</span>
          </Link>
        </div>
      </div>

      {/* Footer Identity Branding */}
      <p className="absolute bottom-6 font-body text-[10px] uppercase tracking-widest text-foreground/30">
        Young Fashion | Trendy & Premium Clothing
      </p>
    </main>
  );
}