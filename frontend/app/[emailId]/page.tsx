'use client'
import {tailwindColors} from "../assets/randomColors"
import testEmails from "../assets/testEmails.json"
import { Email } from "../types/EmailInterface"
import { useState, type ReactElement } from "react"

export interface EmailPageProps {
  
}

export default function EmailPage({ params }: { params: { emailId: string } }): ReactElement {

  const emails: Email[] = JSON.parse(JSON.stringify(testEmails))
  const [email, setEmail] = useState(
    emails.filter((e) => (
       e.id===  params.emailId      
    ) 
                          
  )
  )
  const [cardColor] = useState(tailwindColors[Math.floor(Math.random() * tailwindColors.length)]);
  return (
    <section className="py-8 text-text font-semibold px-16 bg-slate-50 w-2/3">
      <div className="flex">
        <div className={` ${cardColor} flex justify-center items-center  rounded-full w-14 h-14`}>
        <h2 className=" text-2xl text-slate-50 ">
          {emails[2].remitent.slice(0,1)}
        </h2>
        </div>
        <p className="text-center py-4 px-6">{emails[2].remitent.split('@')[0]}</p>
      </div>
      <article className="mt-16">
        <h1 className="text-5xl font-bold">
          {emails[2].subject}
        </h1>
        <p className="mt-20 w-11/12 leading-7">
          {emails[1].body}
          {emails[1].body}
          {emails[1].body}
          {emails[1].body}
          {emails[1].body}
          {emails[1].body}
          {emails[1].body}
          {emails[1].body}
          
        </p>
      </article>
    </section>
  )
}
