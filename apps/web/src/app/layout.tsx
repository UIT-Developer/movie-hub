import { ClerkProvider } from '@clerk/nextjs';
export const dynamic = 'force-dynamic';
import { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Toaster } from 'sonner';
import PageWrapper from '../components/providers/page-wrapper';
import QueryClientProviders from '../components/providers/query-client-provider';
import { siteConfig } from '../config/site-config';
import './global.css';

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
  const hasClerkPublishableKey = !!process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;

  const app = (
    <PageWrapper>
      <Toaster theme="light" richColors closeButton />

      {children}
    </PageWrapper>
  );

  return (
    <html lang="en" className="dark">
      <body className={inter.className}>
        <QueryClientProviders>
          {hasClerkPublishableKey ? (
            <ClerkProvider
              appearance={{
                variables: {
                  colorPrimary: '#E11D48',
                },
              }}
              afterSignOutUrl="/admin/login"
            >
              {app}
            </ClerkProvider>
          ) : (
            app
          )}
        </QueryClientProviders>
      </body>
    </html>
  );
}
