export async function sendEmail(formData: FormData, sender_email: string) {
  const receiver = formData.get('receiver')?.toString()
  const content = formData.get('content')?.toString()
  const subject = formData.get('subject')?.toString()

  if (!receiver || !content || !subject)
    return [new Error('Todos los campos son requeridos'), null]

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/

  if (!emailRegex.test(receiver))
    return [new Error('El correo no es valido'), null]

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/mail/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      subject,
      content,
      sender_email,
      receiver_email: receiver
    })
  })

  if (res.status === 404) {
    return [new Error(`The recipient's e-mail does not exist`), null]
  }

  if (!res.ok) {
    return [new Error('Error sendig mail'), null]
  }

  const data = await res.json()

  return [null, data]
}
