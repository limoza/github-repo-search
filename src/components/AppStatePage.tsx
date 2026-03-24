import type { ReactNode } from 'react';

type AppStatePageProps = {
  title: string;
  description: string;
  actions?: ReactNode;
};

export const AppStatePage = ({
  title,
  description,
  actions,
}: AppStatePageProps) => (
  <main className="mx-auto w-full max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-2xl font-bold tracking-tight text-foreground">
          {title}
        </h1>
        <p className="max-w-2xl text-sm leading-7 text-muted-foreground">
          {description}
        </p>
      </div>

      {actions ? (
        <div className="flex flex-col gap-3 sm:flex-row">{actions}</div>
      ) : null}
    </div>
  </main>
);
