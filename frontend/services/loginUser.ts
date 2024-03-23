import { validEmail } from '@/utils/emailCheck'
import apiClient from './api-client'
import { setCookie } from '@/utils/cookies'

export const loginUser = async (formData: FormData) => {
  const email = formData.get('email')?.toString()
  const password = formData.get('password')?.toString()

  if (!email || !password) return [new Error('All fields are required'), null]

  if (!validEmail(email)) return [new Error('Email is not valid'), null]

  if (password.length < 6)
    return [new Error('Password must be at least 6 characters long'), null]

  const res = await apiClient.post('/mail/user/authentication/', {
    email,
    password
  })

  if (res.status === 400) {
    return [new Error('The email or password are incorrect'), null]
  }

  if (res.status === 404) {
    return [new Error('The email does not exist'), null]
  }

  if (res.status !== 200) {
    return [new Error('Something went wrong'), null]
  }

  const data = await res.data

  const user = { email: data.user }
  setCookie('user', JSON.stringify(user), 7);

  return [null, data]
}
