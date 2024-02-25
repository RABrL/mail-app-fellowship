'use client'

import { sendEmail } from '@/services/sendEmail'
import { useState } from 'react'

interface SendEmailFormProps {
  className?: string
}

const SendEmailForm = ({ className }: SendEmailFormProps) => {
  const [isLoading, setIsLoading] = useState(false)
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setIsLoading(true)
    try {
      const formData = new FormData(event.currentTarget)
      const receiver = formData.get('receiver')?.toString()
      const content = formData.get('content')?.toString()
      const subject = formData.get('subject')?.toString()

      if (!receiver || !content || !subject)
        throw new Error('Todos los campos son requeridos')

      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/

      if (!emailRegex.test(receiver.toString()))
        throw new Error('El correo no es valido')

      const [error, data] = sendEmail({
        receiver_email: receiver,
        content,
        subject,
        sender_email: 'juan1010.jerm@gmail.com'
      })
      if (error) throw error
      event.currentTarget.reset()
    } catch (error) {
      if (error instanceof Error) return alert(error.message)
      return alert('Algo salio mal')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={`${className ?? ''} flex flex-col w-full gap-2`}
    >
      <div className="flex items-center">
        <label
          htmlFor="receiver"
          className="p-2 rounded-md border font-semibold mr-2"
        >
          Para
        </label>
        <InputForm
          type="text"
          name="receiver"
          id="receiver"
          className="h-12 border-b w-full outline-none text-sm"
          placeholder="pepito@example.com"
        />
      </div>
      <InputForm name="subject" placeholder="Agregar un asunto" />
      <div>
        <textarea
          name="content"
          className="h-32 border-b w-full outline-none text-sm px-3 py-4"
        />
      </div>
      <button
        type="submit"
        disabled={isLoading}
        className="max-w-28 text-sm rounded-md px-4 h-8 bg-[#0F6CBD] text-white flex items-center justify-between hover:bg-[#0F548C] transition"
      >
        {isLoading ? 'Enviando...' : 'Enviar'}
        {!isLoading && (
          <svg
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            fill="none"
            className="w-4 h-4"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M10 14l11 -11" />
            <path d="M21 3l-6.5 18a.55 .55 0 0 1 -1 0l-3.5 -7l-7 -3.5a.55 .55 0 0 1 0 -1l18 -6.5" />
          </svg>
        )}
      </button>
    </form>
  )
}

interface InputFormProps {
  type?: string
  name: string
  className?: string
  id?: string
  placeholder?: string
}

const InputForm = ({
  type = 'text',
  name,
  className,
  id,
  ...props
}: InputFormProps) => {
  return (
    <input
      type={type}
      name={name}
      id={id}
      className={`${
        className ?? ''
      } h-12 border-b w-full outline-none text-sm px-3`}
      {...props}
    />
  )
}

export default SendEmailForm
