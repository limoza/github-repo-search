import { render, screen } from '@testing-library/react';
import type { ReactNode } from 'react';
import { vi } from 'vitest';

import { Pagination } from './Pagination';

vi.mock('next/link', () => ({
  default: ({
    href,
    children,
  }: {
    href: string;
    children: ReactNode;
  }) => <a href={href}>{children}</a>,
}));

describe('Pagination', () => {
  it('totalPagesが1以下なら何も描画しない', () => {
    const { container } = render(
      <Pagination
        currentPage={1}
        totalPages={1}
        query="react"
        sort="best-match"
      />,
    );

    expect(container).toBeEmptyDOMElement();
  });

  it('1ページ目では戻るを表示しない', () => {
    render(
      <Pagination
        currentPage={1}
        totalPages={10}
        query="react"
        sort="best-match"
      />,
    );

    expect(
      screen.queryByRole('link', { name: '戻る' }),
    ).not.toBeInTheDocument();
    expect(screen.getByRole('link', { name: '進む' })).toBeInTheDocument();
  });

  it('最終ページでは進むを表示しない', () => {
    render(
      <Pagination
        currentPage={10}
        totalPages={10}
        query="react"
        sort="best-match"
      />,
    );

    expect(screen.getByRole('link', { name: '戻る' })).toBeInTheDocument();
    expect(
      screen.queryByRole('link', { name: '進む' }),
    ).not.toBeInTheDocument();
  });

  it('中間ページでは戻ると進むの両方を表示する', () => {
    render(
      <Pagination
        currentPage={5}
        totalPages={10}
        query="react"
        sort="best-match"
      />,
    );

    expect(screen.getByRole('link', { name: '戻る' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: '進む' })).toBeInTheDocument();
  });

  it('現在ページはリンクではなくaria-current=pageを持つ', () => {
    render(
      <Pagination
        currentPage={5}
        totalPages={10}
        query="react"
        sort="best-match"
      />,
    );

    expect(screen.getByText('5')).toHaveAttribute('aria-current', 'page');
    expect(screen.queryByRole('link', { name: '5' })).not.toBeInTheDocument();
  });

  it('best-matchではsortクエリを含まないリンクを出す', () => {
    render(
      <Pagination
        currentPage={5}
        totalPages={10}
        query="react"
        sort="best-match"
      />,
    );

    expect(screen.getByRole('link', { name: '戻る' })).toHaveAttribute(
      'href',
      '/?q=react&page=4',
    );
    expect(screen.getByRole('link', { name: '進む' })).toHaveAttribute(
      'href',
      '/?q=react&page=6',
    );
  });

  it('best-match以外ではsortクエリを含むリンクを出す', () => {
    render(
      <Pagination currentPage={5} totalPages={10} query="react" sort="stars" />,
    );

    expect(screen.getByRole('link', { name: '戻る' })).toHaveAttribute(
      'href',
      '/?q=react&page=4&sort=stars',
    );
    expect(screen.getByRole('link', { name: '進む' })).toHaveAttribute(
      'href',
      '/?q=react&page=6&sort=stars',
    );
  });
});
