import { render, within } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { SearchResultsLoading } from './SearchResultsLoading';

describe('SearchResultsLoading', () => {
  it('loading itemを4件表示する', () => {
    const { container } = render(<SearchResultsLoading />);

    const list = container.querySelector('ul');
    expect(list).toBeInTheDocument();

    const items = within(list as HTMLElement).getAllByRole('listitem');
    expect(items).toHaveLength(4);
  });
});
