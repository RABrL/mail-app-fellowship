export interface Email {
  id: number
  subject: string
  date: string
  sender_email: string
  receiver_email: string
  message: string | null
}

export interface User {
  email: string
}
