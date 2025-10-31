import { Toaster } from 'sonner';
import './global.css';
import { ClerkProvider } from '@clerk/nextjs';
import { Inter } from 'next/font/google';
import { Metadata } from 'next';
import { siteConfig } from '../config/site-config';
import QueryClientProviders from '../components/providers/query-client-provider';
import PageWrapper from '../components/providers/page-wrapper';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <body className={inter.className}>
        <QueryClientProviders>
          <ClerkProvider
            appearance={{
              theme: 'simple',
              variables: {
                colorPrimary: '#f43f5e',
              },
            }}
            afterSignOutUrl="/"
          >
            <PageWrapper>
              <Toaster theme="light" richColors closeButton />
              {children}
            </PageWrapper>
          </ClerkProvider>
        </QueryClientProviders>
      </body>
    </html>
  );
}
