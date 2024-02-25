import { useState, type ReactElement } from 'react'
import { Email } from '@/types/EmailInterface'
import { tailwindColors } from '../utils/randomColors'
import Link from 'next/link'
export interface InboxCardProps extends Email {
  choosed: number
  setChoosed: React.Dispatch<React.SetStateAction<number>>
}

export function InboxCard(props: InboxCardProps): ReactElement {
  const [cardColor] = useState(
    tailwindColors[Math.floor(Math.random() * tailwindColors.length)]
  )
  return (
    <Link href={`/${props.mail_id}`}>
      <article
        onClick={() => props.setChoosed(props.mail_id)}
        className={`${
          props.choosed === props.mail_id &&
          'bg-opacity-95 border-l-4 border-l-button'
        } bg-secondary cursor-pointer border-b border-b-gray-500 flex text-slate-50  px-8 py-8 items-center `}
      >
        <div
          className={` ${cardColor} flex justify-center items-center rounded-full w-14 h-12`}
        >
          <h2 className=" text-2xl ">{props.sender_email?.slice(0, 1)}</h2>
        </div>
        <div className="w-full  ">
          <p className="text-right text-xs text-gray-400">
            {props.sent_date.slice(0, 10)}
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
