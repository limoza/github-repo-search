import { buildSearchUrl } from './buildSearchUrl';

describe('buildSearchUrl', () => {
  it('パラメータが空なら/を返す', () => {
    expect(buildSearchUrl({ currentSearchParams: '' })).toBe('/');
  });

  it('queryを設定できる', () => {
    expect(
      buildSearchUrl({
        currentSearchParams: '',
        query: 'react',
      }),
    ).toBe('/?q=react');
  });

  it('queryの前後空白をtrimして設定する', () => {
    expect(
      buildSearchUrl({
        currentSearchParams: '',
        query: '  react  ',
      }),
    ).toBe('/?q=react');
  });

  it('空白のみのqueryを渡すとqとpageを削除する', () => {
    expect(
      buildSearchUrl({
        currentSearchParams: 'q=react&page=3&sort=stars',
        query: ' ',
      }),
    ).toBe('/?sort=stars');
  });

  it('pageを設定できる', () => {
    expect(
      buildSearchUrl({
        currentSearchParams: 'q=react',
        page: 2,
      }),
    ).toBe('/?q=react&page=2');
  });

  it('sortがbest-matchのときはsortパラメータを削除する', () => {
    expect(
      buildSearchUrl({
        currentSearchParams: 'q=react&page=2&sort=stars',
        sort: 'best-match',
      }),
    ).toBe('/?q=react&page=2');
  });

  it('sortがbest-match以外のときはsortパラメータを設定する', () => {
    expect(
      buildSearchUrl({
        currentSearchParams: 'q=react&page=2',
        sort: 'stars',
      }),
    ).toBe('/?q=react&page=2&sort=stars');
  });

  it('既存のパラメータを保持しながら一部だけ更新できる', () => {
    expect(
      buildSearchUrl({
        currentSearchParams: 'q=react&page=2&sort=stars',
        page: 3,
      }),
    ).toBe('/?q=react&page=3&sort=stars');
  });

  it('queryを空にして全パラメータが消えたら/を返す', () => {
    expect(
      buildSearchUrl({
        currentSearchParams: 'q=react&page=2',
        query: '',
      }),
    ).toBe('/');
  });
});
