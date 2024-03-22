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

export interface SendEmailFormProps {
  className?: string
}

export interface InputFormProps {
  type?: string
  name: string
  className?: string
  id?: string
  placeholder?: string
}
