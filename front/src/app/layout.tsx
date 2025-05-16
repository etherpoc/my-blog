import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Layout from '@/components/Layout'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
    title: 'かるいさばのぶろぐ',
    description: 'かるいさばがいろいろやるための実験場です',
    keywords: ['karuisaba','かるいさば','ブログ', 'light-mackerel'],
    alternates: {
        canonical: "https://example.com"
    }
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
  return (
    <html lang="ja">
        <body className={inter.className}>
            <Layout>{children}</Layout>
        </body>
    </html>
  )
}
