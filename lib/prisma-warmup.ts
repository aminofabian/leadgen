import prisma from './db'

// Warmup Prisma Client
export async function warmupPrisma() {
  try {
    // Perform a simple query to initialize the connection
    await prisma.$connect()
    console.log('Prisma Client warmed up successfully')
  } catch (error) {
    console.error('Error warming up Prisma Client:', error)
    throw error
  }
}
