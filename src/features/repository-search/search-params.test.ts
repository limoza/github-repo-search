import { SORT_OPTIONS } from './constants';
import { getSingleValue, normalizeSearchParams } from './search-params';

describe('getSingleValue', () => {
  it('stringをそのまま返す', () => {
    expect(getSingleValue('react')).toBe('react');
  });

  it('string[]の先頭要素を返す', () => {
    expect(getSingleValue(['react', 'vue'])).toBe('react');
  });

  it('undefined のときは undefined を返す', () => {
    expect(getSingleValue(undefined)).toBeUndefined();
  });
});

describe('normalizeSearchParams', () => {
  it('qをtrimして返す', () => {
    expect(
      normalizeSearchParams({
        q: ' react ',
      }),
    ).toEqual({
      q: 'react',
      page: 1,
      sort: SORT_OPTIONS.BEST_MATCH,
    });
  });

  it('qがundefinedのときは空文字を返す', () => {
    expect(normalizeSearchParams({})).toEqual({
      q: '',
      page: 1,
      sort: SORT_OPTIONS.BEST_MATCH,
    });
  });

  it('pageをnumberに変換して返す', () => {
    expect(
      normalizeSearchParams({
        page: '3',
      }),
    ).toEqual({
      q: '',
      page: 3,
      sort: SORT_OPTIONS.BEST_MATCH,
    });
  });

  it('pageがNaNになる値なら1にする', () => {
    expect(
      normalizeSearchParams({
        page: 'abc',
      }),
    ).toEqual({
      q: '',
      page: 1,
      sort: SORT_OPTIONS.BEST_MATCH,
    });
  });

  it('pageが1未満なら1にする', () => {
    expect(
      normalizeSearchParams({
        page: '0',
      }),
    ).toEqual({
      q: '',
      page: 1,
      sort: SORT_OPTIONS.BEST_MATCH,
    });

    expect(
      normalizeSearchParams({
        page: '-1',
      }),
    ).toEqual({
      q: '',
      page: 1,
      sort: SORT_OPTIONS.BEST_MATCH,
    });
  });

  it('sortが有効値ならそのまま返す', () => {
    expect(
      normalizeSearchParams({
        sort: SORT_OPTIONS.STARS,
      }),
    ).toEqual({
      q: '',
      page: 1,
      sort: SORT_OPTIONS.STARS,
    });
  });

  it('sortが無効値ならBEST_MATCHにする', () => {
    expect(
      normalizeSearchParams({
        sort: 'invalid',
      }),
    ).toEqual({
      q: '',
      page: 1,
      sort: SORT_OPTIONS.BEST_MATCH,
    });
  });

  it('配列で渡されたsearchParamsも正規化できる', () => {
    expect(
      normalizeSearchParams({
        q: ['  react  ', 'vue'],
        page: ['2', '3'],
        sort: [SORT_OPTIONS.FORKS, SORT_OPTIONS.STARS],
      }),
    ).toEqual({
      q: 'react',
      page: 2,
      sort: SORT_OPTIONS.FORKS,
    });
  });
});
