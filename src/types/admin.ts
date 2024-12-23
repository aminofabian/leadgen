import type { UserRole, SubscriptionStatus } from '@prisma/client';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  status: string;
  subscription: {
    status: SubscriptionStatus;
    type: string;
  };
} 