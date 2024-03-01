'use client'
import { useEffect, type ReactElement, useState } from 'react'
import { useSearchParams, usePathname } from 'next/navigation'

import { getEmailsByUser } from '@/services/getEmails'
import { getEmailsSent } from '@/services/getEmails'
import { useUser } from '@/hooks/useUser'
import { Email } from '@/types'

import { Spiner } from './Spiner'
import { InboxCard } from './InboxCard'

export function InboxContainer() {
  const [emails, setEmails] = useState<Email[]>([])
  const [filteredEmails, setFilteredEmails] = useState<Email[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const { user } = useUser()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [userEmail, setUserEmail] = useState(null)

  /* if (!user) {
    return (
      <section className="bg-principal border-l border-l-gray-500 text-white pt-3 px-3">
        <p>You need to be logged in to see your emails</p>
      </section>
    )
  } */

  useEffect(() => {
    const fetchEmails = async () => {
      try {
        if (pathname === '/') {
          setIsLoading(true)
          const res = await getEmailsByUser(user?.email)
          const emails = res?.data
          if (!emails || emails.length === 0) return
          setEmails(emails)
        } else if (pathname === '/sent') {
          setIsLoading(true)
          const res = await getEmailsSent(user?.email)
          const emails = res?.data
          if (!emails || emails.length === 0) return
          setEmails(emails)
        }

        setIsLoading(false)
      } catch (error) {
        console.error(error)
      }
    }
    fetchEmails()
  }, [pathname])

  useEffect(() => {
    const searchTerm = searchParams.get('search')?.toLowerCase() || ''
    const filtered = emails.filter((email) => {
      return (
        email.subject.toLowerCase().includes(searchTerm) ||
        email.sender_email.toLowerCase().includes(searchTerm)
      )
    })
    setFilteredEmails(filtered)
  }, [searchParams, emails])

  const emailList = searchParams.get('search') ? filteredEmails : emails

  return (
    <section className="w-1/4 min-w-96 bg-principal border-l border-l-gray-500  overflow-y-auto">
      {isLoading ? (
        <div className="w-full h-full flex justify-center items-center text-slate-50">
          <Spiner />
        </div>
      ) : (
        <>
          {emailList.length === 0 ? (
            <p>No Emails found</p>
          ) : (
            <>
              {emailList?.map((email, index) => (
                <InboxCard key={email.id} {...email} />
              ))}
            </>
          )}
        </>
      )}
    </section>
  )
}
