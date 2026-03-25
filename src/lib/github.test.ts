import { SORT_OPTIONS } from '@/features/repository-search/constants';
import { githubFetch } from '@/lib/githubClient';

import { getRepositoryDetail, searchRepositories } from './github';

vi.mock('@/lib/githubClient', () => ({
  githubFetch: vi.fn(),
}));

const mockedGithubFetch = vi.mocked(githubFetch);

describe('searchRepositories', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('BEST_MATCHのときはsortを付けずに検索する', async () => {
    const json = vi.fn().mockResolvedValue({
      items: [],
      total_count: 0,
      incomplete_results: false,
    });

    mockedGithubFetch.mockResolvedValue({
      ok: true,
      json,
    } as unknown as Response);

    await searchRepositories({
      q: 'react',
      page: 2,
      perPage: 30,
      sort: SORT_OPTIONS.BEST_MATCH,
    });

    expect(mockedGithubFetch).toHaveBeenCalledWith(
      '/search/repositories?q=react&page=2&per_page=30',
      expect.anything(),
    );
  });

  it.each([SORT_OPTIONS.STARS, SORT_OPTIONS.FORKS, SORT_OPTIONS.UPDATED])(
    'BEST_MATCH以外のときはsortを付けて検索する',
    async (sortOption) => {
      const json = vi.fn().mockResolvedValue({
        items: [],
        total_count: 0,
        incomplete_results: false,
      });

      mockedGithubFetch.mockResolvedValue({
        ok: true,
        json,
      } as unknown as Response);

      await searchRepositories({
        q: 'react',
        page: 2,
        perPage: 30,
        sort: sortOption,
      });

      expect(mockedGithubFetch).toHaveBeenCalledWith(
        `/search/repositories?q=react&page=2&per_page=30&sort=${sortOption}`,
        expect.anything(),
      );
    },
  );

  it('レスポンスが成功ならjsonを返す', async () => {
    const data = {
      items: [{ id: 1, full_name: 'facebook/react' }],
      total_count: 1,
      incomplete_results: false,
    };

    mockedGithubFetch.mockResolvedValue({
      ok: true,
      json: vi.fn().mockResolvedValue(data),
    } as unknown as Response);

    await expect(
      searchRepositories({
        q: 'react',
        page: 1,
        perPage: 30,
        sort: SORT_OPTIONS.BEST_MATCH,
      }),
    ).resolves.toEqual(data);
  });

  it('レスポンスが失敗ならerrorをthrowする', async () => {
    mockedGithubFetch.mockResolvedValue({
      ok: false,
    } as Response);

    await expect(
      searchRepositories({
        q: 'react',
        page: 1,
        perPage: 30,
        sort: SORT_OPTIONS.BEST_MATCH,
      }),
    ).rejects.toThrow('Failed to fetch repositories');
  });
});

describe('getRepositoryDetail', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('ownerとrepoをencodeして取得する', async () => {
    mockedGithubFetch.mockResolvedValue({
      ok: true,
      status: 200,
      json: vi.fn().mockResolvedValue({ id: 1 }),
    } as unknown as Response);

    await getRepositoryDetail({
      owner: 'foo/bar',
      repo: 'my repo',
    });

    expect(mockedGithubFetch).toHaveBeenCalledWith(
      '/repos/foo%2Fbar/my%20repo',
      expect.objectContaining({
        next: { revalidate: 60 },
      }),
    );
  });

  it('404のときはnullを返す', async () => {
    mockedGithubFetch.mockResolvedValue({
      ok: false,
      status: 404,
    } as Response);

    await expect(
      getRepositoryDetail({
        owner: 'foo',
        repo: 'bar',
      }),
    ).resolves.toBeNull();
  });

  it('成功時はjsonを返す', async () => {
    const data = { id: 1, full_name: 'foo/bar' };

    mockedGithubFetch.mockResolvedValue({
      ok: true,
      status: 200,
      json: vi.fn().mockResolvedValue(data),
    } as unknown as Response);

    await expect(
      getRepositoryDetail({
        owner: 'foo',
        repo: 'bar',
      }),
    ).resolves.toEqual(data);
  });

  it('404以外の失敗時はerrorをthrowする', async () => {
    mockedGithubFetch.mockResolvedValue({
      ok: false,
      status: 403,
    } as Response);

    await expect(
      getRepositoryDetail({
        owner: 'foo',
        repo: 'bar',
      }),
    ).rejects.toThrow('Failed to fetch repository detail.');
  });

  it('githubFetchが5xxで失敗した場合はその例外をそのまま伝播する', async () => {
    mockedGithubFetch.mockRejectedValue(new Error('GitHub API server error.'));

    await expect(
      getRepositoryDetail({
        owner: 'foo',
        repo: 'bar',
      }),
    ).rejects.toThrow('GitHub API server error.');
  });
});
