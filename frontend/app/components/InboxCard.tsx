import { type ReactElement } from "react"
import { Email } from "../types/EmailInterface";
export interface InboxCardProps extends Email {
  choosed: number;
  setChoosed: React.Dispatch<React.SetStateAction<number>>;
}

export function InboxCard(props: InboxCardProps): ReactElement {
  return (
    <article className={ `${props.choosed && 'bg-opacity-95 border-l-4 border-l-button'} bg-secondary border-b border-b-gray-500 flex text-slate-50  px-8 py-8 items-center ` }>
      <h2 className="py-2 px-4 text-2xl rounded-full bg-blue-400">
        {props.remitent.slice(0,1)}
      </h2>
      <div className="w-full  ">
        <p className="text-right text-xs text-gray-400">29/02/2024</p>
        <div className=" ml-5">
          <h3 className="font-semibold leading-tight">Carlos Villagran</h3>
          <p className="text-gray-300 text-xs leading-tight">Hi, I am looking for u</p>
        </div>
      </div>
    </article>
  )
}
