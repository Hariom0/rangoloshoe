import { ArrowLeft } from "lucide-react";
import Link from "next/link";

interface MobileHeaderProps {
    title?: string;
    href?: string;
}

export default function MobileBackButton({ title , href = "/" }: MobileHeaderProps) {
    return (
        /* md:hidden ensures this native-app style header only shows on mobile/tablets */
        <header className="sticky top-0 z-50 flex h-14 items-center bg-background/90 backdrop-blur-md px-4 border-b border-border md:hidden shadow-sm">
            <div className="flex items-center gap-1">
                <Link
                    href={href}
                    aria-label="Go back"
                    className="flex h-10 w-10 -ml-2 items-center justify-center rounded-full text-foreground transition-colors hover:bg-surface/10 hover:text-primary active:scale-95"
                >
                    <ArrowLeft size={20} strokeWidth={2.5} />
                </Link>
                
                <span className="text-sm font-bold tracking-wider text-foreground uppercase">
                    {title}
                </span>
            </div>
        </header>
    );
}