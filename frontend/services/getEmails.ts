import { Email } from '@/types'
import axios from 'axios'

export const getEmailsByUser = async (userEmail: string) => {
  return await fetch(`${process.env.NEXT_PUBLIC_API_URL}/mail/received/${userEmail}`).then((res) => { return res.json() })
}
export const getEmailsSent = async (userEmail: string) => {
  try {
    return await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/mail/sent/${userEmail}`
    )
  } catch (error) {
    console.error(error)
  }
}
export const getAnEmail = async (
  mailId: number
) => {
    return await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/mail/information/${mailId}`
    ).then((res) => { return res.json() })
}
