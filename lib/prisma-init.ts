import prisma from './db'

// Initialize Prisma with connection retry logic
async function initializePrisma() {
  const MAX_RETRIES = 3
  let currentTry = 0

  while (currentTry < MAX_RETRIES) {
    try {
      await prisma.$connect()
      console.log('Prisma Client initialized successfully')
      return
    } catch (error) {
      currentTry++
      console.error(`Prisma initialization attempt ${currentTry} failed:`, error)
      if (currentTry === MAX_RETRIES) {
        throw error
      }
      // Wait before retrying
      await new Promise(resolve => setTimeout(resolve, 1000 * currentTry))
    }
  }
}

// Initialize on module load
initializePrisma()
  .catch(error => {
    console.error('Failed to initialize Prisma:', error)
    process.exit(1)
  })
