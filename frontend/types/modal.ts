import { ModalType } from '@/hooks/useModalStore'

export interface ModalProps {
  isOpen: boolean
  onChange: (open: boolean) => void
  title: string
  description: string
  children: React.ReactNode
}

export interface ModalStore {
  type: ModalType | null
  isOpen: boolean
  onOpen: (type: ModalType) => void
  onClose: () => void
}
