import { ModalStore } from '@/types/modal'
import { create } from 'zustand'

export type ModalType = 'signIn' | 'sendMail' | 'signUp'

const useModal = create<ModalStore>((set) => ({
  type: null,
  isOpen: false,
  onOpen: (type) => set({ type, isOpen: true }),
  onClose: () => set({ type: null, isOpen: false })
}))

export default useModal
