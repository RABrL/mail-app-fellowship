import { Email } from "@/types"
import apiClient from "./api-client"

export const getEmailsByUser = async (userEmail: string) => {
  try {
    return await apiClient.get(`/mail/received/${userEmail}`)
  } catch (error) {
    console.error();
  }
}

export const getEmailsSent = async (userEmail: string) => {
  try {
    return await apiClient.get(`/mail/sent/${userEmail}`)
  } catch (error) {
    console.error(error);
  }
}

export const getAnEmail = async (
  mailId: number
): Promise<Email | undefined> => {
  try {
    const res = await apiClient.get(`/mail/information/${mailId}`)
    if (!res.data) return undefined
    const data = await res.data
    return data
  } catch (error) {
    console.error();
  }
};
