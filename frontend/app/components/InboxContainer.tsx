'use client'
import { useEffect, type ReactElement, useState } from "react"
import { InboxCard } from "./InboxCard"
import { Email } from "../types/EmailInterface"
import { getEmailsByUser } from "@/api/getEmails.api"
export interface InboxContainerProps {
  
}

export function InboxContainer(props: InboxContainerProps): ReactElement {
  const [emails, setEmails] = useState<Email[]>([])
  useEffect(() => {
    const fetchEmails = async () => {
      try {
        const res =  await getEmailsByUser(1)
        console.log(res)
      } catch (error) {
        console.error(error)
      }
    }
    fetchEmails()
  }, [])
  const [choosed, setChoosed] = useState<number>(0)
  return (
    <section className="w-1/4 min-w-96 overflow-y-scroll">
      {emails.map(( email, index ) => (
            <InboxCard key={email.id} {...email} choosed={choosed} setChoosed={setChoosed}/>
          ))}


    </section>
  )
}