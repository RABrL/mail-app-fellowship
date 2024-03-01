import { type ReactElement } from 'react'
import { CiMail } from 'react-icons/ci'

export interface SentProps {}

export default function SentPage(props: SentProps): ReactElement {
  return (
    <div className="w-full bg-slate-300 h-full flex flex-col justify-center items-center">
      <h3 className="text-2xl text-principal">No Email selected</h3>
      <CiMail className="text-9xl text-principal" />
    </div>
  )
}
