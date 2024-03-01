'use client'
import { type ReactElement } from 'react'
import { PiPencilLine } from 'react-icons/pi'
import { HiOutlinePaperAirplane } from 'react-icons/hi'
import { FaInbox } from 'react-icons/fa'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import useModal from '@/hooks/useModalStore'
import { useUser } from '@/hooks/useUser'

export default function FoldersSection(): ReactElement {
  const pathname = usePathname()
  const onOpen = useModal((state) => state.onOpen)
  const { user } = useUser()
  
  const onClick = () => {
    if (!user) {
      return onOpen('signIn')
    }
    onOpen('sendMail')
  }
  return (
    <section className="flex flex-col px-10 py-10 bg-principal min-w-60">
      <button
        onClick={onClick}
        className="bg-button hover:bg-rose-400 transition-all duration-100 ease-in text-slate-50 rounded-lg px-5 py-1 shadow-[0_5px_10px_rgba(220,_46,_100,_0.7)]"
      >
        <PiPencilLine className="text-slate-50 inline mr-2 mb-1" />
        New Email
      </button>
      <div className="mt-20 text-slate-50 border-b-1 border-slate-50">
        <ul>
          <li
            className={`my-5 ${
              pathname === '/'
                ? 'underline decoration-button decoration-4 underline-offset-4'
                : ''
            }`}
          >
            <FaInbox className="inline text-orange-400 mb-1 mr-8" />
            <Link href={'/'}>Inbox</Link>
          </li>
          <li
            className={`my-5 ${
              pathname === '/sent'
                ? 'underline decoration-button decoration-4 underline-offset-4'
                : ''
            }`}
          >
            <HiOutlinePaperAirplane className="inline text-green-400 mb-1 mr-8" />
            <Link href={'/sent'}>Sent </Link>
          </li>
        </ul>
      </div>
    </section>
  )
}
