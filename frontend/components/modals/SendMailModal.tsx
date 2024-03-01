'use client'

import Modal from './Modal'
import useModal from '@/hooks/useModalStore'
import SendEmailForm from '../SendEmailForm'

const SendMailModal = () => {
  const { isOpen, onClose, type } = useModal((state) => state)

  const isModalOpen = isOpen && type === 'sendMail'

  const onChange = (open: boolean) => {
    if (!open) onClose()
  }

  return (
    <Modal
      title="Send a Email"
      description="Choose a recipient and write your email."
      isOpen={isModalOpen}
      onChange={onChange}
    >
      <SendEmailForm />
    </Modal>
  )
}

export default SendMailModal
