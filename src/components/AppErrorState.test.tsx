import { fireEvent, render, screen } from '@testing-library/react';
import type { ReactNode } from 'react';
import { describe, expect, it, vi } from 'vitest';

import { AppErrorState } from './AppErrorState';

vi.mock('next/link', () => ({
  default: ({
    href,
    children,
    ...props
  }: {
    href: string;
    children: ReactNode;
    [key: string]: unknown;
  }) => (
    <a href={href} {...props}>
      {children}
    </a>
  ),
}));

describe('AppErrorState', () => {
  it('titleと固定descriptionを表示する', () => {
    const resetMock = vi.fn();

    render(
      <AppErrorState title="データの取得に失敗しました。" reset={resetMock} />,
    );

    expect(
      screen.getByRole('heading', {
        name: 'データの取得に失敗しました。',
        level: 1,
      }),
    ).toBeInTheDocument();

    expect(
      screen.getByText(
        '一時的な通信障害や予期しない問題が発生しました。時間をおいて再度お試しください。',
      ),
    ).toBeInTheDocument();
  });

  it('再試行ボタンをクリックするとresetを呼ぶ', () => {
    const resetMock = vi.fn();

    render(
      <AppErrorState title="データの取得に失敗しました。" reset={resetMock} />,
    );

    fireEvent.click(screen.getByRole('button', { name: '再試行' }));

    expect(resetMock).toHaveBeenCalledTimes(1);
  });

  it('トップページに戻るリンクを表示する', () => {
    const resetMock = vi.fn();

    render(
      <AppErrorState title="データの取得に失敗しました。" reset={resetMock} />,
    );

    expect(
      screen.getByRole('link', { name: 'トップページに戻る' }),
    ).toHaveAttribute('href', '/');
  });
});
