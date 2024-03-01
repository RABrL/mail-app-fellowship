import { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { Email } from '@/types'
import { tailwindColors } from '@/utils/randomColors'

export interface InboxCardProps extends Email {}
export function InboxCard(props: InboxCardProps) {
  // busca el parametro de la ruta de la url
  const pathname = usePathname()
  const [id, setId] = useState(Number(pathname?.match(/[\d]+/)))
  useEffect(() => {
    setId(Number(pathname?.match(/[\d]+/)))
    //check for digits on the pathname, will be the choosed email by user
  }, [pathname])
  const [cardColor] = useState(
    tailwindColors[Math.floor(Math.random() * tailwindColors.length)]
  )
  //generates a random color for the avatar
  return (
    <Link href={`/${props.id}`}>
      <article
        className={`${
          id === props.id && 'bg-opacity-95 border-l-4 border-l-button'
        } bg-secondary cursor-pointer border-b border-b-gray-500  flex text-slate-50  p-8 lg:p-5 items-center `}
      >
        <div
          style={{ backgroundColor: `${cardColor}` }}
          className="flex justify-center items-center rounded-full w-14 h-12"
        >
          <h2 className=" text-2xl ">{props.sender_email?.slice(0, 1)}</h2>
        </div>
        <div className="w-full  ">
          <p className="text-right text-xs text-gray-400">
            {props.date.slice(0, 10)}
          </p>
          <div className=" ml-5">
            <h3 className="font-semibold leading-tight">
              {props.sender_email}
            </h3>
            <p className="text-gray-300 text-xs leading-tight">
              {props.subject}
            </p>
          </div>
        </div>
      </article>
    </Link>
  )
}
