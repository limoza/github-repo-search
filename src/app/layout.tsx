import './globals.css';

import type { Metadata } from 'next';
import { Geist } from 'next/font/google';
import type { ReactNode } from 'react';

import { AppHeader } from '@/components/AppHeader';
import { cn } from '@/lib/utils';

const geist = Geist({ subsets: ['latin'], variable: '--font-sans' });

export const metadata: Metadata = {
  title: {
    template: '%s | GitHub Repo Search',
    default: 'GitHub Repo Search',
  },
  description: 'GitHubリポジトリを検索できるアプリです。',
};

type RootLayoutProps = {
  children: ReactNode;
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="ja" className={cn('font-sans', geist.variable)}>
      <body>
        <div>
          <AppHeader />
          <div>{children}</div>
        </div>
      </body>
    </html>
  );
}
