interface sendEmailProps {
  subject: string
  content: string
  sender_email: string
  receiver_email: string
}

export async function sendEmail(formData: FormData) {
  const receiver = formData.get('receiver')?.toString()
  const content = formData.get('content')?.toString()
  const subject = formData.get('subject')?.toString()

  if (!receiver || !content || !subject)
    return [new Error('Todos los campos son requeridos'), null]

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/

  if (!emailRegex.test(receiver.toString()))
    return [new Error('El correo no es valido'), null]

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/mails/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      subject,
      content,
      sender_email: 'mendo6472@gmail.com',
      receiver_email: receiver
    })
  })

  if (!res.ok) {
    return [new Error('Error al enviar el correo'), null]
  }

  const data = await res.json()

  return [null, data]
}
