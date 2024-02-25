import { Email } from '@/types/EmailInterface'
import axios from 'axios'

export const getEmailsByUser = async (userId: number) => {
  try {
    return await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/mails/received/juan1010.jerm@gmail.com`
    )
  } catch (error) {
    console.error()
  }
}

export const getAnEmail = async (
  mailId: number
): Promise<Email | undefined> => {
  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/mails/information/${mailId}`
    )
    if (!res.data) return undefined
    return res.data
  } catch (error) {
    console.error()
  }
}
