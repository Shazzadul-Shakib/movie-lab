'use client';

import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/components/providers/theme-provider';
import { QueryProvider } from '@/components/providers/query-provider';
import { Header } from '@/components/layout/header';
import { Sidebar } from '@/components/layout/sidebar';
import { MainContent } from '@/components/layout/main-content';
import { useState, useCallback } from 'react';
import { Toaster } from 'sonner';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleMenuToggle = useCallback(() => {
    setSidebarOpen((prev) => !prev);
  }, []);

  const handleClose = useCallback(() => {
    setSidebarOpen(false);
  }, []);

  return (
    <html lang='en' suppressHydrationWarning>
      <head>
        <title>MovieLab - Discover and Explore Movies Seamlessly</title>
        <meta
          name='description'
          content='Discover and Explore Movies Seamlessly'
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        <QueryProvider>
          <ThemeProvider
            attribute='class'
            defaultTheme='light'
            enableSystem={false}
            disableTransitionOnChange
            storageKey='movielab-theme'
          >
            <Toaster position='top-right' richColors />
            <Header onMenuToggle={handleMenuToggle} />
            <Sidebar isOpen={sidebarOpen} onClose={handleClose} />
            <MainContent>{children}</MainContent>
          </ThemeProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
