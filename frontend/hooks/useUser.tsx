import { User } from '@/types'
import { createContext, useContext, useEffect } from 'react'

type UserContextType = {
  user: User | null
}

const UserContext = createContext<UserContextType | undefined>(undefined)

interface Props {
  [propName: string]: any
}

export const MyUserContextProvider = (props: Props) => {

  useEffect(() => {
    
  },[])

  const value = {
    user: {
      id: 1,
      name: 'John Doe',
      email: 'sdad'
    }
  }
  return <UserContext.Provider value={value} {...props} />
}

export const useUser = () => {
  const context = useContext(UserContext)
  if (context === undefined) {
    throw new Error('useUser must be used within a MyUserContextProvider')
  }

  return context
}
