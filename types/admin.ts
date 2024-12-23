export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  status: string;
  subscription: {
    status: string;
    type: string;
  };
} 