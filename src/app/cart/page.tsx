import { Navbar } from "../components/shared/Navbar";
import { Footer } from "../components/shared/Footer";
import CartPage from "../components/shared/cartPage";

function page() {
    return (
        <>
            <Navbar />
            <CartPage />
            <Footer />
        </>
    );
}

export default page;
