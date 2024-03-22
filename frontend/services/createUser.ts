import apiClient from './api-client'
import { validEmail } from '@/utils/emailCheck'

export const createUser = async (formData: FormData) => {
  const email = formData.get('email')?.toString()
  const password = formData.get('password')?.toString()
  const confirmPassword = formData.get('confirmPassword')?.toString()

  if (!email || !password || !confirmPassword)
    return [new Error('All fields are required'), null]

  if (!validEmail(email)) return [new Error('Email is not valid'), null]

  if (password.length < 6)
    return [new Error('Password must be at least 6 characters long'), null]

  if (password !== confirmPassword)
    return [new Error('Passwords do not match'), null]

  const res = await apiClient.post('/mail/user/', {
    email,
    password
  })

  if (res.status === 409)
    return [new Error('This email account already exists'), null]

  if (res.status !== 201) {
    return [new Error('Error creating user'), null]
  }
  const data = await res.data
  return [null, data]
}
