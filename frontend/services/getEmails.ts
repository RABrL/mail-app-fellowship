import { Email } from '@/types'
import axios from 'axios'

export const getEmailsByUser = async (userEmail: string) => {
  try {
    return await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/mail/received/mendo6472@gmail.com`
    )
  } catch (error) {
    console.error()
  }
}
export const getEmailsSent = async (userEmail: string) => {
  try {
    return await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/mail/sent/mendo6472@gmail.com`
    )
  } catch (error) {
    console.error(error)
  }
}
export const getAnEmail = async (
  mailId: number
): Promise<Email | undefined> => {
  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/mail/information/${mailId}`
    )
    if (!res.data) return undefined
    return res.data
  } catch (error) {
    console.error()
  }
}
