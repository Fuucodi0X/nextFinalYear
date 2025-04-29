import { createClient } from '@/lib/supabase/server';
import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'v0 App',
  description: 'Created with v0',
  generator: 'v0.dev',
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const supabase = createClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
