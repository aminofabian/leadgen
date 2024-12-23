'use client'

import { useEffect } from 'react'
import { useUser } from '@/lib/stores/useUser'

export default function YourComponent() {
  const { user, isLoading, error, fetchUser } = useUser()

  useEffect(() => {
    fetchUser()
  }, [])

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error: {error}</div>
  if (!user) return <div>No user found</div>

  return (
    <div>
      <h1>Welcome {user.firstName}</h1>
      {/* Access any user data including relations */}
      <div>Subscription Status: {user.subscription?.status}</div>
      <div>Number of Integrations: {user.integrations.length}</div>
      <div>Number of Automations: {user.automations.length}</div>
      {/* etc */}
    </div>
  )
} 