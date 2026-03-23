import type { ReactNode } from 'react';

type RepositoryStatItemProps = {
  icon: ReactNode;
  label: string;
  value: string;
};

export const RepositoryStatItem = ({
  icon,
  label,
  value,
}: RepositoryStatItemProps) => {
  return (
    <div className="rounded-lg border bg-background px-4 py-3">
      <dt className="flex items-center gap-2 text-sm text-muted-foreground">
        {icon}
        {label}
      </dt>
      <dd className="mt-1 text-lg font-semibold text-foreground">{value}</dd>
    </div>
  );
};
