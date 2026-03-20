import { buildPaginationItems } from './buildPaginationItems';

describe('buildPaginationItems', () => {
  it('totalPagesが0以下なら空配列を返す', () => {
    expect(buildPaginationItems({ currentPage: 1, totalPages: 0 })).toEqual([]);
    expect(buildPaginationItems({ currentPage: 1, totalPages: -1 })).toEqual(
      [],
    );
  });

  it('全ページ数が少ないときは省略記号なしで全ページを返す', () => {
    expect(buildPaginationItems({ currentPage: 3, totalPages: 5 })).toEqual([
      { type: 'page', value: 1 },
      { type: 'page', value: 2 },
      { type: 'page', value: 3 },
      { type: 'page', value: 4 },
      { type: 'page', value: 5 },
    ]);
  });

  it('先頭付近では右側だけ省略記号を出す', () => {
    expect(buildPaginationItems({ currentPage: 1, totalPages: 20 })).toEqual([
      { type: 'page', value: 1 },
      { type: 'page', value: 2 },
      { type: 'page', value: 3 },
      { type: 'page', value: 4 },
      { type: 'page', value: 5 },
      { type: 'ellipsis' },
      { type: 'page', value: 20 },
    ]);
  });

  it('末尾付近では左側だけ省略記号を出す', () => {
    expect(buildPaginationItems({ currentPage: 20, totalPages: 20 })).toEqual([
      { type: 'page', value: 1 },
      { type: 'ellipsis' },
      { type: 'page', value: 16 },
      { type: 'page', value: 17 },
      { type: 'page', value: 18 },
      { type: 'page', value: 19 },
      { type: 'page', value: 20 },
    ]);
  });

  it('中間ページでは左右に省略記号を出す', () => {
    expect(buildPaginationItems({ currentPage: 10, totalPages: 20 })).toEqual([
      { type: 'page', value: 1 },
      { type: 'ellipsis' },
      { type: 'page', value: 6 },
      { type: 'page', value: 7 },
      { type: 'page', value: 8 },
      { type: 'page', value: 9 },
      { type: 'page', value: 10 },
      { type: 'page', value: 11 },
      { type: 'page', value: 12 },
      { type: 'page', value: 13 },
      { type: 'page', value: 14 },
      { type: 'ellipsis' },
      { type: 'page', value: 20 },
    ]);
  });

  it('先頭ページの次がそのまま続く場合は左側に省略記号を出さない', () => {
    expect(buildPaginationItems({ currentPage: 6, totalPages: 20 })).toEqual([
      { type: 'page', value: 1 },
      { type: 'page', value: 2 },
      { type: 'page', value: 3 },
      { type: 'page', value: 4 },
      { type: 'page', value: 5 },
      { type: 'page', value: 6 },
      { type: 'page', value: 7 },
      { type: 'page', value: 8 },
      { type: 'page', value: 9 },
      { type: 'page', value: 10 },
      { type: 'ellipsis' },
      { type: 'page', value: 20 },
    ]);
  });

  it('右側で省略されるページがない場合は省略記号を出さない', () => {
    expect(buildPaginationItems({ currentPage: 15, totalPages: 20 })).toEqual([
      { type: 'page', value: 1 },
      { type: 'ellipsis' },
      { type: 'page', value: 11 },
      { type: 'page', value: 12 },
      { type: 'page', value: 13 },
      { type: 'page', value: 14 },
      { type: 'page', value: 15 },
      { type: 'page', value: 16 },
      { type: 'page', value: 17 },
      { type: 'page', value: 18 },
      { type: 'page', value: 19 },
      { type: 'page', value: 20 },
    ]);
  });
});
