'use client'

import { useEffect, useState } from 'react'

import { tailwindColors } from '@/utils/randomColors'
import { getAnEmail } from '@/services/getEmails'
import { Email } from '@/types'
import { Spiner } from '@/components/Spiner'

export default function EmailPage({ params }: { params: { emailId: number } }) {
  const [loading, setLoading] = useState(true)
  const [email, setEmail] = useState<Email>()
  useEffect(() => {
    const fetchEmail = async () => {
      try {
        const res = await getAnEmail(params.emailId)
        setEmail(res)
        setLoading(false)
      } catch (error) {
        console.error(error)
      }
    }
    fetchEmail()
  }, [params.emailId])

  // if (!email) return <h1>404</h1>

  const cardColor =
    tailwindColors[Math.floor(Math.random() * tailwindColors.length)]
  //Generates a random color for the avatar
  return (
    <section className="py-8 text-text font-semibold px-16 bg-slate-50 w-2/3 overflow-y-auto">
      {loading ? (
        <Spiner />
      ) : (
        <>
          <div className="flex items-center">
            <div
              className={`${cardColor} bg-button flex justify-center items-center rounded-full w-14 h-14`}
            >
              <h2 className=" text-2xl text-slate-50 ">
                {email?.sender_email?.slice(0, 1)}
              </h2>
            </div>
            <p className="text-center py-4 px-6">
              {email?.sender_email.split('@')[0]}
            </p>
          </div>
          <article className="mt-16">
            <h1 className="text-5xl font-bold">{email?.subject}</h1>
            <p className="mt-20 w-11/12 text-lg leading-7">{email?.message}</p>
          </article>
        </>
      )}
    </section>
  )
}
