export const createUser = async (formData: FormData) => {
  const email = formData.get('email')?.toString()
  const password = formData.get('password')?.toString()
  const confirmPassword = formData.get('confirmPassword')?.toString()

  if (!email || !password || !confirmPassword)
    return [new Error('All fields are required'), null]

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/

  if (!emailRegex.test(email)) return [new Error('Email is not valid'), null]

  if (password.length < 6)
    return [new Error('Password must be at least 6 characters long'), null]

  if (password !== confirmPassword)
    return [new Error('Passwords do not match'), null]
  //checking the inputs from the signUp form
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/mail/user/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email, password })
  })

  if (res.status === 409)
    return [new Error('This email account already exists'), null]

  if (!res.ok) {
    return [new Error('Error creating user'), null]
  }

  return [null, await res.json()]
  //creating the new user and handling errors
}
