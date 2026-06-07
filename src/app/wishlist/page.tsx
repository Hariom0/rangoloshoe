import React from "react";
import { Navbar } from "../components/shared/Navbar";
import { Footer } from "../components/shared/Footer";
import WishlistPage from "../components/shared/WishlistPage";

function page() {
	return (
		<>
			<Navbar />
            <WishlistPage />
            <Footer />
		</>
	);
}

export default page;
