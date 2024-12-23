import { create } from 'zustand'
import { User, Integration, Subscription, Automation, Hashtag, HashtagSearch } from '@prisma/client';

// Define the type for our user store state
interface UserState {
  user: (User & {
    integrations: Integration[]
    subscription: Subscription | null
    automations: Automation[]
    hashtags: Hashtag[]
    hashtagSearches: HashtagSearch[]
  }) | null
  users: (User & {
    subscription: Subscription | null
  })[]
  isLoading: boolean
  error: string | null
  fetchUser: () => Promise<void>
  fetchAllUsers: () => Promise<void>
}

export const useUser = create<UserState>((set) => ({
  user: null,
  users: [],
  isLoading: false,
  error: null,
  fetchUser: async () => {
    try {
      set({ isLoading: true, error: null })
      
      const response = await fetch('/api/user')
      
      if (!response.ok) {
        throw new Error('Failed to fetch user')
      }

      const userData = await response.json()
      set({ user: userData, isLoading: false })
    } catch (error) {
      set({ error: (error as Error).message, isLoading: false })
    }
  },
  fetchAllUsers: async () => {
    try {
      set({ isLoading: true, error: null })
      const response = await fetch('/api/users')
      if (!response.ok) throw new Error('Failed to fetch users')
      const usersData = await response.json()
      set({ users: usersData, isLoading: false })
    } catch (error) {
      set({ error: (error as Error).message, isLoading: false })
    }
  }
})) 