'use client'

import { useEffect, useState } from 'react'

import SendMailModal from '@/components/modals/SendMailModal'
import SignInModal from '@/components/modals/SignInModal'
import SignUpModal from '@/components/modals/SignUpModal'

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
      <SignUpModal />
    </>
  )
}

export default ModalProvider
