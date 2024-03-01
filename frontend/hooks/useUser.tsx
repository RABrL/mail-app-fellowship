import { User } from '@/types'
import { createContext, useContext, useEffect, useState } from 'react'

type UserContextType = {
  user: User | null
}

const UserContext = createContext<UserContextType | undefined>(undefined)

interface Props {
  [propName: string]: any
}

export const MyUserContextProvider = (props: Props) => {
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
