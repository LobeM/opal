import type { Metadata } from 'next';
import { Manrope, DM_Sans } from 'next/font/google';
import { ClerkProvider } from '@clerk/nextjs';
import './globals.css';
import { ThemeProvider } from '@/components/theme';
import ReactQueryProvider from '@/react-query';
import { ReduxProvider } from '@/redux/provider';

const manrope = DM_Sans({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Opal',
  description: 'Share AI powered videos with your friends.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang='en' suppressHydrationWarning>
        <body className={`${manrope.className} bg-[#171717]`}>
          <ThemeProvider
            attribute='class'
            defaultTheme='dark'
            enableSystem
            disableTransitionOnChange
          >
            <ReduxProvider>
              <ReactQueryProvider>{children}</ReactQueryProvider>
            </ReduxProvider>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
