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
    throw new Error('Failed to send email')
  }

  const data = await res.json()
  return data
}
