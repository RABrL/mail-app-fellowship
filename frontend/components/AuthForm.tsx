'use client'

import { useState } from 'react'

import { InputForm } from './SendEmailForm'
import { loginUser } from '@/services/loginUser'
import { createUser } from '@/services/createUser'
import { toast } from 'sonner'
import useModal from '@/hooks/useModalStore'

interface AuthFormProps {
  isLogin?: boolean
  className?: string
}

const AuthForm = ({ isLogin, className }: AuthFormProps) => {
  const [isLoading, setIsLoading] = useState(false)

  const buttonText = isLogin ? 'Login' : 'Register'

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      const form = e.currentTarget
      const formData = new FormData(form)

      const [error, _] = isLogin
        ? await loginUser(formData)
        : await createUser(formData)

      if (error) throw error

      isLogin
        ? toast.success('Login succesfully')
        : toast.success('User created succesfully')
      form.reset()
    } catch (error) {
      if (error instanceof Error) return toast.error(error.message)
      return toast.error('Something went wrong')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={`${className ?? ''} flex flex-col w-full gap-2`}
    >
      <InputForm
        type="text"
        name="email"
        id="email"
        className="h-12 border-b w-full outline-none text-sm"
        placeholder="pepito@example.com"
      />
      <InputForm name="password" placeholder="*******" />
      <button
        type="submit"
        disabled={isLoading}
        className="mx-auto w-full text-sm font-semibold rounded-md px-4 h-10 bg-[#0F6CBD] text-white hover:bg-[#0F548C] transition"
      >
        {isLoading ? 'Loading...' : buttonText}
      </button>
    </form>
  )
}

export default AuthForm
