import { SessionProvider } from "next-auth/react";
import React from "react";

function adminLayout({ children }: { children: React.ReactElement }) {
	return <SessionProvider>{children}</SessionProvider>;
}

export default adminLayout;
