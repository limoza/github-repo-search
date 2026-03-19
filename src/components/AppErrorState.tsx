'use client';

type AppErrorStateProps = {
  title: string;
  reset: () => void;
};

export const AppErrorState = ({ title, reset }: AppErrorStateProps) => {
  const handleGoHome = () => {
    window.location.href = '/';
  };

  return (
    <main>
      <h1>{title}</h1>
      <p>時間をおいて再度お試しください。</p>

      <div>
        <button type="button" onClick={reset}>
          再試行
        </button>

        <button type="button" onClick={handleGoHome}>
          トップページに戻る
        </button>
      </div>
    </main>
  );
};
