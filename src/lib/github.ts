export interface ShippedProject {
  slug: string;
  name: string;
  fullName: string;
  description: string;
  url: string;
  homepage: string | null;
  stars: number;
  language: string | null;
  topics: string[];
  defaultBranch: string;
  pushedAt: string;
}

interface GitHubRepo {
  name: string;
  full_name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  stargazers_count: number;
  language: string | null;
  topics: string[];
  default_branch: string;
  pushed_at: string;
  owner: {
    login: string;
  };
}

async function fetchGitHub<T>(path: string): Promise<T> {
  const headers: Record<string, string> = {
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
  };

  if (process.env.GITHUB_PAT) {
    headers.Authorization = `Bearer ${process.env.GITHUB_PAT}`;
  }

  const res = await fetch(`https://api.github.com${path}`, { headers });

  if (!res.ok) {
    throw new Error(`GitHub API error: ${res.status} ${res.statusText}`);
  }

  return res.json() as Promise<T>;
}

export async function getShippedProjects(): Promise<ShippedProject[]> {
  const repos = await fetchGitHub<GitHubRepo[]>(
    "/users/matthewvolk/starred?per_page=100&sort=updated",
  );

  return repos
    .filter((repo) => repo.owner.login === "matthewvolk")
    .map((repo) => ({
      slug: repo.name,
      name: repo.name,
      fullName: repo.full_name,
      description: repo.description ?? "",
      url: repo.html_url,
      homepage: repo.homepage || null,
      stars: repo.stargazers_count,
      language: repo.language,
      topics: repo.topics,
      defaultBranch: repo.default_branch,
      pushedAt: repo.pushed_at,
    }));
}

export async function getShippedProject(
  slug: string,
): Promise<ShippedProject | undefined> {
  const projects = await getShippedProjects();
  return projects.find((p) => p.slug === slug);
}

export async function getReadmeContent(
  fullName: string,
  defaultBranch: string,
): Promise<string> {
  const res = await fetch(
    `https://raw.githubusercontent.com/${fullName}/${defaultBranch}/README.md`,
  );

  if (!res.ok) {
    throw new Error(`Failed to fetch README: ${res.status} ${res.statusText}`);
  }

  return res.text();
}

export async function getAllShippedSlugs(): Promise<string[]> {
  const projects = await getShippedProjects();
  return projects.map((p) => p.slug);
}
