import { PrismaAdapter } from "@auth/prisma-adapter"
import NextAuth from "next-auth"
import prisma from "./prisma"
import CredentialsProvider from "next-auth/providers/credentials"
import EmailProvider from "next-auth/providers/email"
import Credentials from "next-auth/providers/credentials"
import bcrypt from "bcryptjs"

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
    };
  }
}
 
export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    EmailProvider({
    server: process.env.EMAIL_SERVER,
    from: process.env.EMAIL_FROM,
    maxAge: 24 * 60 * 60, // How long email links are valid for (default 24h)
  }),
    Credentials({
      name: "Sign In",
      credentials: {
        email: { label: "Email", type: "text", placeholder: "jsmith@example.com" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          console.log("No email or password provided for credentials login.");
          return null;
        }

        const email = String(credentials.email).toLowerCase();
        const password = String(credentials.password);

        try {
          const user = await prisma.user.findUnique({
            where: { email: email },
          });

          if (!user || !user.password) {
            console.log("No user found with that email, or password not set.");
            return null;
          }

          const isValidPassword = await bcrypt.compare(password, user.password);

          if (!isValidPassword) {
            console.log("Invalid password for user:", email);
            return null;
          }

          console.log("User authenticated successfully:", user.email);
          return {
            id: user.id,
            name: user.firstName,
            email: user.email,
            // image: user.image,
          };

        } catch (error) {
          console.error("Error during credentials authorization:", error);
          return null;
        }
      },
    }),
  ],
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async session({ session, token }) {
      if (token.sub) {
        session.user.id = token.sub;
      }
      return session;
    },
  },
  //pages: {
    //signIn: "/auth/signin",
  //},
  // Debug mode (turn off in production)
  debug: process.env.NODE_ENV === "development",
})