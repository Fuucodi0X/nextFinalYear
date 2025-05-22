"use client"

import type React from "react"
import "./globals.css"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import { AuthProvider } from "@/components/auth-provider"
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { Toaster } from "@/components/ui/toaster"

const inter = Inter({ subsets: ["latin"] })


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const client = new ApolloClient({
    ssrMode: true,
    uri: 'https://massive-worm-1767.ddn.hasura.app/graphql',
    cache: new InMemoryCache(),
  });

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <AuthProvider><ApolloProvider client={client}>{children}</ApolloProvider></AuthProvider>
        </ThemeProvider>
        <Toaster />
      </body>
    </html>
  )
}
