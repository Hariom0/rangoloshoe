import { auth, signOut } from "@/auth";

export default auth((req) => {
	const isLoggedIn = !!req.auth;
	const isSearchingAdminRoute = req.nextUrl.pathname.startsWith("/admin");

	if (isSearchingAdminRoute && !isLoggedIn) {
		// Construct the login URL and redirect unauthorized attempts
		const newUrl = new URL("/login", req.nextUrl.origin);
		return Response.redirect(newUrl);
	}
	if (req.nextUrl.pathname === "/login" && isLoggedIn) {
        const newUrl = new URL("/admin",req.nextUrl.origin)
       return Response.redirect(newUrl)
	}
});

export const config = {
	// Run middleware on every file inside the admin folder
	matcher: ["/admin/:path*","/login"],
};
