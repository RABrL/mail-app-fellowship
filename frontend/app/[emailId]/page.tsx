'use client'
import testEmails from "../assets/testEmails.json"
import { Email } from "../types/EmailInterface"
import { useState, type ReactElement } from "react"

export interface EmailPageProps {
  
}

export default function EmailPage({ params }: { params: { emailId: string } }): ReactElement {

  const emails: Email[] = JSON.parse(JSON.stringify(testEmails))
  const [email, setEmail] = useState(emails.map(e => e.id === parseInt(params.emailId)))
  return (
    <section>
      <div>
        <p>{email[0]}</p>
      </div>
    </section>
  )
}
