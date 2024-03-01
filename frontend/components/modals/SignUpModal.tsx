'use client'

import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

import useModal from '@/hooks/useModalStore'
import AuthForm from '@/components/AuthForm'
import { useUser } from '@/hooks/useUser'

import Modal from './Modal'

const SignUpModal = () => {
  const router = useRouter()
  const { user } = useUser()
  const { isOpen, onClose, type } = useModal((state) => state)

  const isModalOpen = isOpen && type === 'signUp'

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
      title="Register now!"
      description="Create an account to start send emails to friends and family."
      isOpen={isModalOpen}
      onChange={onChange}
    >
      <AuthForm />
    </Modal>
  )
}

export default SignUpModal
