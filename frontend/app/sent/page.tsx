import { CiMail } from 'react-icons/ci'

export default function SentPage() {


  return (
    <div className="w-full bg-slate-300 h-full flex flex-col justify-center items-center">
      <h3 className="text-2xl text-principal">No Email selected</h3>
      <CiMail className="text-9xl text-principal" />
    </div>
    //use this template when the user did not choose any email yet
  )
}
