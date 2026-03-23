import Link from 'next/link';

export const AppHeader = () => {
  return (
    <header className="bg-primary text-primary-foreground">
      <div className="mx-auto w-full max-w-5xl px-4 py-3 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="text-base font-semibold tracking-tight text-primary-foreground"
        >
          GitHub Repo Search
        </Link>
      </div>
    </header>
  );
};
