import { render, screen } from '@testing-library/react';
import type { ReactNode } from 'react';
import { describe, expect, it, vi } from 'vitest';

import { AppHeader } from './AppHeader';

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

describe('AppHeader', () => {
  it('トップページへのリンクを表示する', () => {
    render(<AppHeader />);

    expect(
      screen.getByRole('link', { name: 'GitHub Repo Search' }),
    ).toBeInTheDocument();

    expect(
      screen.getByRole('link', { name: 'GitHub Repo Search' }),
    ).toHaveAttribute('href', '/');
  });

  it('header要素を持つ', () => {
    const { container } = render(<AppHeader />);

    expect(container.querySelector('header')).toBeInTheDocument();
  });
});
