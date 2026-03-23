import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { RepositoryStatItem } from './RepositoryStatItem';

describe('RepositoryStatItem', () => {
  it('labelとvalueを表示する', () => {
    render(
      <dl>
        <RepositoryStatItem
          icon={<span data-testid="stat-icon" />}
          label="Stars"
          value="1,234"
        />
      </dl>,
    );

    expect(screen.getByText('Stars')).toBeInTheDocument();
    expect(screen.getByText('1,234')).toBeInTheDocument();
  });

  it('iconを表示する', () => {
    render(
      <dl>
        <RepositoryStatItem
          icon={<span data-testid="stat-icon" />}
          label="Forks"
          value="567"
        />
      </dl>,
    );

    expect(screen.getByTestId('stat-icon')).toBeInTheDocument();
  });

  it('dtとddの意味構造を持つ', () => {
    const { container } = render(
      <dl>
        <RepositoryStatItem
          icon={<span data-testid="stat-icon" />}
          label="Issues"
          value="42"
        />
      </dl>,
    );

    expect(container.querySelector('dt')).toHaveTextContent('Issues');
    expect(container.querySelector('dd')).toHaveTextContent('42');
  });
});
