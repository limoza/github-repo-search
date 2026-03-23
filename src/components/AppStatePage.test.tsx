import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { AppStatePage } from './AppStatePage';

describe('AppStatePage', () => {
  it('titleとdescriptionを表示する', () => {
    render(
      <AppStatePage
        title="ページが見つかりませんでした"
        description="指定されたページは存在しないか、移動または削除された可能性があります。"
      />,
    );

    expect(
      screen.getByRole('heading', {
        name: 'ページが見つかりませんでした',
        level: 1,
      }),
    ).toBeInTheDocument();

    expect(
      screen.getByText(
        '指定されたページは存在しないか、移動または削除された可能性があります。',
      ),
    ).toBeInTheDocument();
  });

  it('actionsを渡した場合は表示する', () => {
    render(
      <AppStatePage
        title="エラーが発生しました"
        description="時間をおいて再度お試しください。"
        actions={<button type="button">再試行</button>}
      />,
    );

    expect(screen.getByRole('button', { name: '再試行' })).toBeInTheDocument();
  });

  it('actionsを渡さない場合は表示しない', () => {
    render(
      <AppStatePage
        title="ページが見つかりませんでした"
        description="指定されたページは存在しないか、移動または削除された可能性があります。"
      />,
    );

    expect(
      screen.queryByRole('button', { name: '再試行' }),
    ).not.toBeInTheDocument();
  });
});
