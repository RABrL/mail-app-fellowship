'use client'

import { MyUserContextProvider } from '@/hooks/useUser'
import { UserProviderProps } from '@/types/user'

const UserProvider = ({ children }: UserProviderProps) => {
  return <MyUserContextProvider>{children}</MyUserContextProvider>
}

export default UserProvider
