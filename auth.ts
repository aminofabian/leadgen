// auth.ts
import NextAuth, { type NextAuthConfig } from "next-auth";
import authConfig from "@/auth.config";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { getUserById } from "@/data/user";
import db from "@/lib/db";
import type { Adapter } from "next-auth/adapters"
import { UserRole } from "@prisma/client";

// List of admin emails
const ADMIN_EMAILS = [
  "aminofab@gmail.com",
  "aminofabian@gmail.com",
  "eminselimaslan@gmail.com",
];

const isAdminEmail = (email: string | null | undefined): boolean => {
  return ADMIN_EMAILS.includes(email?.toLowerCase() ?? "");
};

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  pages: {
    signIn: "/auth/login",
    error: "/auth/error",
  },
  events: {
    async linkAccount({ user, account, profile }) {
      console.log("LinkAccount event - Starting with:", { user, account, profile });
      
      if (account?.provider === "google" || account?.provider === "github") {
        try {
          const email = profile?.email?.toLowerCase();
          const isAdmin = isAdminEmail(email);
          
          const updateData = {
            emailVerified: new Date(),
            role: isAdmin ? UserRole.ADMIN : UserRole.USER,
            isTwoFactorEnabled: false,
            ...(profile?.name ? {
              firstName: profile.name.split(" ")[0],
              lastName: profile.name.split(" ").slice(1).join(" ")
            } : {}),
            ...(email ? { email } : {}),
            ...(profile?.image ? { image: profile.image } : {})
          };

          const updatedUser = await db.user.update({
            where: { id: user.id },
            data: updateData,
          });
          console.log("User updated successfully:", updatedUser);
        } catch (error) {
          console.error("LinkAccount event failed:", error);
          throw error;
        }
      }
    },
  },
  callbacks: {
    async signIn({ user, account }) {
      console.log("SignIn callback:", { user, account });

      if (!user.email) return false;
      
      // For OAuth providers
      if (account?.provider !== "credentials") {
        const isAdmin = isAdminEmail(user.email);
if (isAdmin && user?.id) {
  await db.user.update({
    where: { id: user.id },
    data: { role: UserRole.ADMIN },
  });
}
        return true;
      }

      // For credentials provider
      const existingUser = await getUserById(user?.id ?? '');
      if (!existingUser?.emailVerified) return false;

      // Update role if needed
      const isAdmin = isAdminEmail(existingUser.email);
      if (isAdmin && existingUser.role !== UserRole.ADMIN) {
        await db.user.update({
          where: { id: user.id },
          data: { role: UserRole.ADMIN },
        });
      }

      return true;
    },

    async session({ token, session }) {
      console.log("Session callback - Input:", { token, session });
      
      if (token.sub && session.user) {
        session.user.id = token.sub;
        session.user.name = token.name as string;
        session.user.firstName = token.firstName as string;
        session.user.lastName = token.lastName as string;
        session.user.email = token.email as string;
        session.user.role = token.role as UserRole;
        session.user.image = token.picture as string;
        session.user.emailVerified = token.emailVerified as Date | null;
      }

      console.log("Session callback - Output:", session);
      return session;
    },

    async jwt({ token, user, account, profile }) {
      console.log("JWT callback - Input:", { token, user, account, profile });
      
      if (!token.sub) return token;

      const existingUser = await getUserById(token.sub);
      if (!existingUser) return token;

      // Check and update admin status
      const isAdmin = isAdminEmail(existingUser.email);
      if (isAdmin && existingUser.role !== UserRole.ADMIN) {
        await db.user.update({
          where: { id: existingUser.id },
          data: { role: UserRole.ADMIN },
        });
        existingUser.role = UserRole.ADMIN;
      }

      token.name = `${existingUser.firstName || ''} ${existingUser.lastName || ''}`.trim();
      token.firstName = existingUser.firstName;
      token.lastName = existingUser.lastName;
      token.email = existingUser.email;
      token.role = existingUser.role;
      token.picture = existingUser.image;
      token.emailVerified = existingUser.emailVerified;

      console.log("JWT callback - Output token:", token);
      return token;
    },
  },
  adapter: (PrismaAdapter(db) as unknown) as Adapter,
  session: { strategy: "jwt" },
  ...authConfig,
});