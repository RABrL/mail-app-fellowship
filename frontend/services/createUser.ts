export const createUser = async (formData: FormData) => {
  const email = formData.get('email')?.toString()
  const password = formData.get('password')?.toString()

  if (!email || !password)
    return [new Error('All fields are required'), null]

  if (password.length < 6)
    return [new Error('Password must be at least 6 characters long'), null]

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/

  if (!emailRegex.test(email))
    return [new Error('Email is not valid'), null]

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/mail/user/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email, password })
  })

  if (!res.ok) {
    return [new Error('Error creating user'), null]
  }

  return [null, await res.json()]
}
