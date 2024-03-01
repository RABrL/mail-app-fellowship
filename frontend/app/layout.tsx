import React, { Suspense } from 'react'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

import { NavBar } from '@/components/NavBar'
import { InboxContainer } from '@/components/InboxContainer'
import FoldersSection from '@/components/FoldersSection'
import ToasterProvider from '@/providers/ToasterProvider'
import ModalProvider from '@/providers/ModalProvider'
import UserProvider from '@/providers/UserProvider'

import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'MailApp',
  description: 'App para enviar y recibir correos electrónicos'
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ToasterProvider />
        <UserProvider>
          <NavBar />
          <ModalProvider />
          <main className="flex relative h-screen max-h-screen">
            <FoldersSection />
            <Suspense>
              <InboxContainer />
            </Suspense>
            {children}
          </main>
        </UserProvider>
      </body>
    </html>
  )
}
