import type { ReactNode } from 'react';

import { AppHeader } from '@/components/AppHeader';
import { Geist } from "next/font/google";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});


type RootLayoutProps = {
  children: ReactNode;
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="ja" className={cn("font-sans", geist.variable)}>
      <body>
        <div>
          <AppHeader />
          <div>{children}</div>
        </div>
      </body>
    </html>
  );
}
