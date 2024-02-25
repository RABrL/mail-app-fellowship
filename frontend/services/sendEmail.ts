interface sendEmailProps {
  subject: string
  content: string
  sender_email: string
  receiver_email: string
}

export async function sendEmail({
  subject,
  content,
  sender_email,
  receiver_email
}: sendEmailProps) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/mails/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      subject,
      content,
      sender_email,
      receiver_email
    })
  })

  if (!res.ok) {
    return [new Error('Error al enviar el correo'), null]
  }

  const data = await res.json()

  return [null, data]
}
