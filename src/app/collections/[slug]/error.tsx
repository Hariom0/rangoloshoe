// app/products/[slug]/error.tsx
"use client"; // Error components must be Client Components

import { useEffect } from "react";
import { AlertCircle, RefreshCcw } from "lucide-react";
import { useRouter } from "next/navigation";

export default function ProductError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
	const router = useRouter();

	useEffect(() => {
		// Log the error to an error reporting service like Sentry if you have one
		console.error("Product fetch error:", error);
	}, [error]);

	return (
		<main className="min-h-[70vh] flex flex-col items-center justify-center p-6 text-center">
			<div className="mb-6 rounded-full bg-red-50 p-4 text-red-500 ring-8 ring-red-50/50">
				<AlertCircle className="h-10 w-10" />
			</div>

			<h2 className="font-serif italic text-3xl text-gray-900 mb-3">Unable to load product</h2>

			<p className="text-gray-500 max-w-md mb-8 leading-relaxed">
				We encountered an issue while trying to fetch this product's details. The connection may have timed out or the data is currently unavailable.
			</p>

			<div className="flex items-center gap-4">
				{/* The reset function attempts to re-render the Server Component */}
				<button onClick={() => reset()} className="flex items-center gap-2 h-12 px-6 bg-primary text-white font-bold rounded-xl hover:bg-primary/90 active:scale-95 transition-all shadow-sm">
					<RefreshCcw className="w-4 h-4" />
					Try Again
				</button>

				<button
					onClick={() => router.push("/collections")}
					className="flex items-center gap-2 h-12 px-6 bg-white border border-gray-200 text-gray-700 font-bold rounded-xl hover:bg-gray-50 active:scale-95 transition-all"
				>
					View Collections
				</button>
			</div>
		</main>
	);
}
