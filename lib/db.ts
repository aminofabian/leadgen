import { PrismaClient } from '@prisma/client'
import { Pool, PoolConfig } from '@neondatabase/serverless'
import { PrismaNeon } from '@prisma/adapter-neon'
import ws from 'ws'

declare global {
  var prisma: ReturnType<typeof prismaClientSingleton> | undefined
}

interface CustomPoolConfig extends PoolConfig {
  webSocketConstructor: any;
}

const connectionString = process.env.DIRECT_URL!
const pool = new Pool({ 
  connectionString, 
  max: 1, 
  webSocketConstructor: ws
} as CustomPoolConfig)
const adapter = new PrismaNeon(pool)

const prismaClientSingleton = () => {
  return new PrismaClient().$extends({
    query: {
      $allModels: {
        async $allOperations({ operation, model, args, query }) {
          return query(args);
        },
      },
    },
  });
}

const prisma = globalThis.prisma ?? prismaClientSingleton()

if (process.env.NODE_ENV !== 'production') {
  globalThis.prisma = prisma
}

export const db = prisma
export default prisma