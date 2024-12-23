import { UserRole } from "@prisma/client"
import NextAuth, { DefaultSession } from "next-auth"

declare module "next-auth" {
  interface User {
    id: string
    role: UserRole
    email: string
    emailVerified?: Date
    firstName?: string
    lastName?: string
    image?: string
    isTwoFactorEnabled: boolean
  }

  interface Session extends DefaultSession {
    user: User & {
      id: string
      role: UserRole
      firstName?: string
      lastName?: string
      email: string
      emailVerified?: Date
      image?: string
    }
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    role: UserRole
    firstName?: string
    lastName?: string
    emailVerified?: Date
  }
}