import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import type React from 'react'
import './globals.css'
import { Toaster } from '@/components/ui/sonner'
import { Sidebar } from './sidebar'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Grocery AI - Marketplace Inteligente',
  description:
    'Marketplace de supermercado com assistente de IA para receitas e comparação de preços',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR">
      <body className={inter.className}>
        <div className="flex h-screen bg-gray-50">
          <Sidebar />
          <main className="flex-1 overflow-auto lg:ml-0">
            <div className="pl-0 lg:pl-0">{children}</div>
          </main>
        </div>
        <Toaster richColors />
      </body>
    </html>
  )
}
