import Layout from '@/components/Layout'
import { UserProvider } from '@auth0/nextjs-auth0/client'
import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'かるいさばのぶろぐ（admin)',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ja">
      <UserProvider>
      <body className={inter.className}>
        <Layout>{children}</Layout>
      </body>
      </UserProvider>
    </html>
  )
}
