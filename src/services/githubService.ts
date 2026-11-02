export interface GitHubUserProfile {
  login: string;
  id: number;
  avatar_url: string;
  name: string;
  bio: string;
  public_repos: number;
  followers: number;
  following: number;
  html_url: string;
}

export interface GitHubApiRepo {
  id: number;
  name: string;
  full_name: string;
  private: boolean;
  html_url: string;
  description: string;
  stargazers_count: number;
  forks_count: number;
  open_issues_count: number;
  default_branch: string;
  language: string;
}

export async function verifyGitHubPat(pat: string): Promise<GitHubUserProfile> {
  const cleanPat = pat.trim();
  const response = await fetch('https://api.github.com/user', {
    headers: {
      Authorization: `Bearer ${cleanPat}`,
      Accept: 'application/vnd.github.v3+json',
    },
  });

  if (!response.ok) {
    if (response.status === 401) {
      throw new Error('Invalid GitHub Personal Access Token (Bad credentials).');
    }
    throw new Error(`GitHub API error: HTTP ${response.status} ${response.statusText}`);
  }

  const user = await response.json();
  return user as GitHubUserProfile;
}

export async function fetchUserRepos(pat: string): Promise<GitHubApiRepo[]> {
  const cleanPat = pat.trim();
  const response = await fetch('https://api.github.com/user/repos?sort=updated&per_page=10', {
    headers: {
      Authorization: `Bearer ${cleanPat}`,
      Accept: 'application/vnd.github.v3+json',
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch user repositories: HTTP ${response.status}`);
  }

  return response.json();
}
