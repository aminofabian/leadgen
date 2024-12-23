import db from "@/lib/db";

export async function getUserByEmail(email: string) {
  try {
    return await db.user.findUnique({
      where: {
        email
      },
      include: {
        subscription: true,
        integrations: {
          select: {
            id: true,
            token: true,
            expiresAt: true,
            name: true,
            username: true,
            createdAt: true,
            updatedAt: true
          }
        },
        automations: {
          include: {
            integration: true,
            tasks: {
              orderBy: {
                createdAt: 'desc'
              },
              take: 5 // Get only the 5 most recent tasks
            }
          }
        }
      }
    });
  } catch (error) {
    console.error("Error in getUserByEmail:", error);
    return null;
  }
}
