import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

import './globals.css'
import React from 'react'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'MailApp',
  description: 'App para enviar y recibir correos electrónicos'
}

export default function RootLayout({
  children,
  modal
}: Readonly<{
  modal: React.ReactNode
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <main className="flex h-screen max-h-screen">
          {modal}
          {children}
        </main>
      </body>
    </html>
  )
}
