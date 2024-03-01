'use client'

import SendMailModal from '@/components/modals/SendMailModal'
import SignInModal from '@/components/modals/SignInModal'
import { useEffect, useState } from 'react'

const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) return null

  return (
    <>
      <SignInModal />
      <SendMailModal />
    </>
  )
}

export default ModalProvider
