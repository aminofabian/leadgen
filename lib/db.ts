import { PrismaClient } from '@prisma/client'

declare global {
  var prisma: PrismaClient | undefined
}

const prismaClientSingleton = () => {
  return new PrismaClient({
    log: ['error', 'warn'],
    errorFormat: 'minimal'
  })
}

const prisma = globalThis.prisma ?? prismaClientSingleton()

export const db = prisma

if (process.env.NODE_ENV !== 'production') {
  globalThis.prisma = prisma
}

export default prisma
