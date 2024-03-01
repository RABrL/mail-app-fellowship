import * as Dialog from '@radix-ui/react-dialog'
import { IoMdClose } from 'react-icons/io'

interface ModalProps {
  isOpen: boolean
  onChange: (open: boolean) => void
  title: string
  description: string
  children: React.ReactNode
}

const Modal = ({
  children,
  description,
  isOpen,
  onChange,
  title
}: ModalProps) => {
  return (
    <Dialog.Root open={isOpen} defaultOpen={isOpen} onOpenChange={onChange}>
      <Dialog.Overlay
        className="
        bg-black/60
        backdrop-blur
        fixed
        inset-0
        z-[1]
      "
      />
      <Dialog.Content
        className="
          fixed
          drop-shadow-md
          border
          border-black
          top-[50%]
          left-[50%]
          max-h-full
          h-full
          md:h-auto
          md:max-h-[85vh]
          w-full
          md:w-[90vw]
          md:max-w-[450px]
          translate-x-[-50%]
          translate-y-[-50%]
          rounded-md
          bg-white
          p-[25px]
          focus:outline-none
          z-[2]
        "
      >
        <Dialog.Title
          className="
            text-xl
            text-center
            font-bold
            mb-4
          "
        >
          {title}
        </Dialog.Title>
        <Dialog.Description
          className="
            mb-5
            text-sm
            leading-normal
            text-center
          "
        >
          {description}
        </Dialog.Description>
        <div>{children}</div>
        <Dialog.Close asChild>
          <button
            className="
              text-neutral-600
              hover:bg-neutral-200
              absolute
              top-[10px]
              right-[10px]
              inline-flex
              h-[25px]
              w-[25px]
              apperance-none
              items-center
              justify-center
              rounded-md
              focus:outline-none
            "
          >
            <IoMdClose />
          </button>
        </Dialog.Close>
      </Dialog.Content>
    </Dialog.Root>
  )
}

export default Modal
