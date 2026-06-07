import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const adminUser = process.env.ADMIN_USER;
        const adminPass = process.env.ADMIN_PASS;

        if (
          credentials?.username === adminUser &&
          credentials?.password === adminPass
        ) {
          // Return a user object if matching. This data gets encrypted into the cookie.
          return { id: "1", name: "Admin User", role: "admin" };
        }
        
        // Return null if authentication fails
        return null;
      },
    }),
  ],
  pages: {
    signIn: "/login", // Redirects users here when they need to log in
  },
});