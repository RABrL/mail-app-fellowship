'use client'

import { useRouter } from 'next/navigation'

interface ModalProps {
  title?: string
  children: React.ReactNode
}

export const dynamic = 'dynamic'

const Modal = ({ title, children }: ModalProps) => {
  const router = useRouter()
  return (
    <>
      <div className="absolute w-full h-full p-5 flex items-center justify-center ">
        <div
          onClick={() => router.back()}
          onKeyDown={() => router.back()}
          className="fixed inset-0 bg-black/50 backdrop-blur"
        />
        <div className="w-[500px] relative bg-white rounded-md shadow-md p-4 md:p-5">
          {title && (
            <header className="flex items-center justify-between mb-5 pb-4 md:pb-5 border-b">
              {title}
            </header>
          )}

          <button
            onClick={() => router.back()}
            className="absolute top-2 md:top-4 right-4 md:right-5 hover:bg-black/10 rounded-md w-7 h-7 cursor-pointer transition text-[#0F6CBD] flex items-center justify-center"
          >
            <svg
              fill="currentColor"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18 18 6M6 6l12 12"
              />
            </svg>
          </button>

          {children}
        </div>
      </div>
    </>
  )
}

export default Modal
