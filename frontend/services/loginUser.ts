export const loginUser = async (formData: FormData) => {
  const email = formData.get('email')?.toString()
  const password = formData.get('password')?.toString()

  if (!email || !password) return [new Error('All fields are required'), null]

  if (password.length < 6)
    return [new Error('Password must be at least 6 characters long'), null]

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/

  if (!emailRegex.test(email)) return [new Error('Email is not valid'), null]

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/mail/user/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email, password })
  })

  if (res.status === 400) {
    return [new Error('The email or password is incorrect'), null]
  }

  if (res.status === 404) {
    return [new Error('The email does not exist'), null]
  }

  if (!res.ok) {
    return [new Error('Something went wrong'), null]
  }

  return [null, await res.json()]
}
