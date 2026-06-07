import { SessionProvider } from "next-auth/react";
import React from "react";

interface AdminLayoutProps {
    children: React.ReactNode;
}

function AdminLayout({ children }: AdminLayoutProps) {
    return <SessionProvider>{children}</SessionProvider>;
}

export default AdminLayout;