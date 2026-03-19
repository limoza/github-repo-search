import type { ReactNode } from 'react';

import { AppHeader } from '@/components/AppHeader';

type RootLayoutProps = {
  children: ReactNode;
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="ja">
      <body>
        <div>
          <AppHeader />
          <div>{children}</div>
        </div>
      </body>
    </html>
  );
}
