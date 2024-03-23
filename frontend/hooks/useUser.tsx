import { User, UserContextType, userProps } from '@/types/user'
import { createContext, useContext, useEffect, useState } from 'react'

const UserContext = createContext<UserContextType | undefined>(undefined)

export const MyUserContextProvider = (props: userProps) => {
  const [user, setUser] = useState<User | null>(null)

  let data: string | null = null

  if (typeof window !== 'undefined') {
    data = localStorage.getItem('user')
  }

  useEffect(() => {
    data = localStorage.getItem('user')
    if (data) {
      setUser(JSON.parse(data))
      return
    }
    setUser(null)
  }, [data])

  const value = { user }

  return <UserContext.Provider value={value} {...props} />
}

export const useUser = () => {
  const context = useContext(UserContext)
  if (context === undefined) {
    throw new Error('useUser must be used within a MyUserContextProvider')
  }

  return context
}
