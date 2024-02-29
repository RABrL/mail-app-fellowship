'use client'
import { useEffect, type ReactElement, useState } from 'react'
import { Spiner } from './Spiner'
import { InboxCard } from './InboxCard'
import { Email } from '../types/EmailInterface'
import { getEmailsByUser } from '@/services/getEmails'
import { getEmailsSent } from '@/services/getEmails'
import { usePathname } from 'next/navigation'
import { useSearchParams } from 'next/navigation'
import path from 'path'
export function InboxContainer(): ReactElement {
  const [emails, setEmails] = useState<Email[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [filteredEmails, setFilteredEmails] = useState<Email[]>([])
  const pathname = usePathname()
  const searchParams = useSearchParams()
  useEffect(() => {
    const fetchEmails = async () => {
      try {
        if(pathname === '/'){
          setIsLoading(true)
          const res = await getEmailsByUser('juanma')
          const emails = res?.data
          if (!emails || emails.length === 0) return
          setEmails(emails)
        }else if(pathname === '/sent'){
          setIsLoading(true)
          const res = await getEmailsSent('')
          const emails = res?.data
          if(!emails || emails.length === 0) return
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
    const searchTerm = searchParams.get('search')?.toLowerCase() || '';
    const filtered = emails.filter((email) => {
      return email.subject.toLowerCase().includes(searchTerm) ||
        email.sender_email.toLowerCase().includes(searchTerm);
    });
    setFilteredEmails(filtered);
  }, [searchParams, emails]);
  const emailList = searchParams.get('search') ? filteredEmails : emails
  return (
    <section className="w-1/4 min-w-96 bg-principal border-l border-l-gray-500   overflow-y-auto">
      {isLoading ? (
        <div className='w-full  h-full flex justify-center items-center text-slate-50'>
          <Spiner/>
        </div>
        
      ): (
        <>
        {emailList.length === 0 ? (
          <p>No Emails found</p>
        ): (
          
          <>
            {emailList?.map((email, index) => (
              <InboxCard key={email.id} {...email}   />
            ))}
          </>
        )}
        </>
      )}

    </section>
  )
}
