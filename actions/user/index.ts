"use server"

import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { getUserByEmail } from "@/data/user/queries";
import { User } from "@prisma/client";

export const onCurrentUser = async () => {
    const session = await auth();
    return session;
}

export async function getCurrentUser(): Promise<User | null> {
    const session = await onCurrentUser();
    
    if (!session?.user?.email) {
        return null;
    }

    return getUserByEmail(session.user.email);
}