import { signIn } from "@/auth";
import { AuthError } from "next-auth";
import { redirect } from "next/navigation";
import { LoginForm } from "../components/admin/LoginForm";

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const error = (await searchParams).error;

  // The login action remains isolated on the server side securely
  async function handleLogin(formData: FormData) {
    "use server";
    try {
      await signIn("credentials", {
        username: formData.get("username"),
        password: formData.get("password"),
        redirectTo: "/admin",
      });
    } catch (err) {
      if (err instanceof AuthError) {
        redirect("/login?error=true");
      }
      throw err;
    }
  }

  return (
    <main className="min-h-screen flex flex-col justify-center items-center p-4 bg-background selection:bg-primary/10 selection:text-primary">
      {/* Decorative Top Accent lines matching premium brand design */}
      <div className="absolute top-0 left-0 right-0 h-1.5 bg-primary" />
      
      {/* Login Card Component */}
      <LoginForm errorParam={error} loginAction={handleLogin} />
      
      {/* Footer Branding Note */}
      <p className="mt-8 text-[11px] uppercase tracking-widest text-foreground/40">
        © {new Date().getFullYear()} Young Fashion Corporate
      </p>
    </main>
  );
}