export const getGitHubData = async () => {
  const query = `query {
    viewer {
      contributionsCollection {
        contributionCalendar {
          totalContributions
          weeks {
            firstDay
            contributionDays {
              contributionCount
              contributionLevel
              date
              weekday
            }
          }
        }
      }
      pinnedItems(last: 6) {
        nodes {
          ... on Repository {
            name
            description
            owner {
              login
            }
            url
          }
        }
      }
    }
  }`;

  interface GitHubResponse {
    data: {
      viewer: {
        contributionsCollection: {
          contributionCalendar: {
            totalContributions: number;
            weeks: {
              firstDay: string;
              contributionDays: {
                contributionCount: number;
                contributionLevel: string;
                date: string;
                weekday: number;
              }[];
            }[];
          };
        };
        pinnedItems: {
          nodes: {
            name: string;
            description: string;
            owner: {
              login: string;
            };
            url: string;
          }[];
        };
      };
    };
  }

  const response = await fetch("https://api.github.com/graphql", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
    },
    body: JSON.stringify({ query }),
    next: { revalidate: 60 },
  });

  return response.json() as Promise<GitHubResponse>;
};
