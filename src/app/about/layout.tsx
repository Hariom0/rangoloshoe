import { Footer } from "../components/shared/Footer";
import { Navbar } from "../components/shared/Navbar";

export default function aboutLayout({ children }: { children: React.ReactNode }) {
	return (
		<>
			<Navbar />
            {children}
            <Footer />
		</>
	);
}
