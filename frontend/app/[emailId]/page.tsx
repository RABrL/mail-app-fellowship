'use client'
import {tailwindColors} from "../assets/randomColors"
import testEmails from "../assets/testEmails.json"
import { Email } from "../types/EmailInterface"
import { useState, type ReactElement, useEffect } from "react"
import { getAnEmail } from "@/api/getEmails.api"
export interface EmailPageProps {
  
}

export default function EmailPage({ params }: { params: { emailId: number } }): ReactElement {

  const [email, setEmail] = useState<Email>()
  useEffect(() => {
    const fetchTheEmail = async () => {
      try {
        const res =   await getAnEmail(params.emailId)
        console.log(res?.data)
        setEmail(res?.data)
      } catch (error) {
       console.error(error) 
      }
    }
    fetchTheEmail()
  }, [params.emailId])
  const [cardColor] = useState(tailwindColors[Math.floor(Math.random() * tailwindColors.length)]);
  return (
    <section className="py-8 text-text font-semibold px-16 bg-slate-50 w-2/3">
            <div className="flex">
        <div className={` ${cardColor} flex justify-center items-center  rounded-full w-14 h-14`}>
        <h2 className=" text-2xl text-slate-50 ">
          {email?.sender_email.slice(0,1)}
        </h2>
        </div>
        <p className="text-center py-4 px-6">{email?.sender_email.split('@')[0]}</p>
      </div>
      <article className="mt-16">
        <h1 className="text-5xl font-bold">
          {email?.subject}
        </h1>
        <p className="mt-20 w-11/12 leading-7">
          {email?.content}
        </p>
      </article>

    </section>
  )
}
