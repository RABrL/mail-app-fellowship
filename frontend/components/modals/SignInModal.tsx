'use client'

import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

import useModal from '@/hooks/useModalStore'
import AuthForm from '@/components/AuthForm'
import { useUser } from '@/hooks/useUser'

import Modal from './Modal'

const SignInModal = () => {
  const router = useRouter()
  const { user } = useUser()
  const { isOpen, onClose, type } = useModal((state) => state)

  const isModalOpen = isOpen && type === 'signIn'

  useEffect(() => {
    if (user) {
      router.refresh()
      onClose()
    }
  }, [user, onClose, router])

  const onChange = (open: boolean) => {
    if (!open) onClose()
  }

  return (
    <Modal
      title="Welcome back"
      description="Login to your account"
      isOpen={isModalOpen}
      onChange={onChange}
    >
      <AuthForm isLogin />
    </Modal>
  )
}

export default SignInModal
