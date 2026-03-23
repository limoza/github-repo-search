import { render, screen } from '@testing-library/react';
import type { ImgHTMLAttributes, ReactNode } from 'react';
import { describe, expect, it, vi } from 'vitest';

import { RepoList } from './RepoList';

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

vi.mock('next/image', () => ({
  default: (props: ImgHTMLAttributes<HTMLImageElement>) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img {...props} alt={props.alt ?? ''} />
  ),
}));

vi.mock('@/utils/formatRelativeUpdatedAt', () => ({
  formatRelativeUpdatedAt: vi.fn(() => '3日前'),
}));

describe('RepoList', () => {
  const items = [
    {
      id: 1,
      name: 'react',
      full_name: 'facebook/react',
      description: 'A JavaScript library for building user interfaces',
      stargazers_count: 235000,
      forks_count: 48500,
      updated_at: '2026-03-20T12:00:00Z',
      owner: {
        login: 'facebook',
        avatar_url: 'https://example.com/facebook.png',
      },
    },
    {
      id: 2,
      name: 'next.js',
      full_name: 'vercel/next.js',
      description: null,
      stargazers_count: 130000,
      forks_count: 28000,
      updated_at: '2026-03-21T08:30:00Z',
      owner: {
        login: 'vercel',
        avatar_url: 'https://example.com/vercel.png',
      },
    },
  ];

  it('itemsの件数ぶん表示する', () => {
    render(<RepoList items={items as never} />);

    expect(
      screen.getByRole('link', { name: /facebook\/react/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('link', { name: /vercel\/next\.js/i }),
    ).toBeInTheDocument();
  });

  it('詳細ページへのリンクを表示する', () => {
    render(<RepoList items={items as never} />);

    expect(
      screen.getByRole('link', { name: /facebook\/react/i }),
    ).toHaveAttribute('href', '/repos/facebook/react');
    expect(
      screen.getByRole('link', { name: /vercel\/next\.js/i }),
    ).toHaveAttribute('href', '/repos/vercel/next.js');
  });

  it('descriptionがある場合だけ表示する', () => {
    render(<RepoList items={items as never} />);

    expect(
      screen.getByText('A JavaScript library for building user interfaces'),
    ).toBeInTheDocument();
  });

  it('starsとforksを表示する', () => {
    render(<RepoList items={items as never} />);

    expect(screen.getByText('235,000')).toBeInTheDocument();
    expect(screen.getByText('48,500')).toBeInTheDocument();
    expect(screen.getByText('130,000')).toBeInTheDocument();
    expect(screen.getByText('28,000')).toBeInTheDocument();
  });

  it('更新日時を表示する', () => {
    render(<RepoList items={items as never} />);

    expect(screen.getAllByText('3日前')).toHaveLength(2);
  });

  it('itemsが空なら何も描画しない', () => {
    const { container } = render(<RepoList items={[]} />);

    expect(container).toBeEmptyDOMElement();
  });
});
