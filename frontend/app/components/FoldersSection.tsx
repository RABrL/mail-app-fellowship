import { type ReactElement } from "react"
import { PiPencilLine } from "react-icons/pi";
import { HiOutlinePaperAirplane } from "react-icons/hi";
import { FaInbox } from "react-icons/fa";
export interface FoldersSectionProps {
  
}

export default function FoldersSection(props: FoldersSectionProps): ReactElement {
  return ( 
      <section className="flex flex-col px-10 py-10 bg-principal min-w-60">
        <button className="bg-button text-slate-50 rounded-lg px-5 py-1 shadow-[0_5px_10px_rgba(220,_46,_100,_0.7)]">
          <PiPencilLine className="text-slate-50 inline mr-2 mb-1"/>
         New Email
        </button>
        <div className="mt-20 text-slate-50 border-b-1 border-slate-50">
          <ul>
            <li className="my-5">
              <FaInbox className="inline text-orange-400 mb-1 mr-8"/>
              Inbox(2)
            </li>
            <li className="my-5">
              <HiOutlinePaperAirplane className="inline text-green-400 mb-1 mr-8"/>
              Sent
            </li>
          </ul>
        </div>
      </section> 
  )
}
