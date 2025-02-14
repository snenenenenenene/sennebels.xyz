import { NextResponse } from 'next/server';

const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const GITHUB_USERNAME = 'snenenenenenene';

async function fetchContributions() {
  const query = `
    query {
      user(login: "${GITHUB_USERNAME}") {
        contributionsCollection {
          contributionCalendar {
            totalContributions
            weeks {
              contributionDays {
                contributionCount
                date
              }
            }
          }
        }
      }
    }
  `;

  const response = await fetch('https://api.github.com/graphql', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${GITHUB_TOKEN}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ query }),
  });

  const data = await response.json();
  return data.data.user.contributionsCollection.contributionCalendar;
}

async function fetchGitHubStats() {
  try {
    // Fetch user data
    const userResponse = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}`, {
      headers: GITHUB_TOKEN ? {
        Authorization: `Bearer ${GITHUB_TOKEN}`,
      } : {},
    });
    const userData = await userResponse.json();

    // Fetch repositories
    const reposResponse = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100`, {
      headers: GITHUB_TOKEN ? {
        Authorization: `Bearer ${GITHUB_TOKEN}`,
      } : {},
    });
    const reposData = await reposResponse.json();

    // Calculate language statistics
    const languageStats: { [key: string]: number } = {};
    let totalSize = 0;

    for (const repo of reposData) {
      if (repo.language) {
        languageStats[repo.language] = (languageStats[repo.language] || 0) + repo.size;
        totalSize += repo.size;
      }
    }

    // Convert to percentages and sort
    const languages = Object.entries(languageStats)
      .map(([name, size]) => ({
        name,
        percentage: Math.round((size / totalSize) * 100),
      }))
      .sort((a, b) => b.percentage - a.percentage)
      .slice(0, 3);

    // Fetch contribution data
    const contributionData = await fetchContributions();

    return {
      publicRepos: userData.public_repos,
      totalContributions: contributionData.totalContributions,
      languages,
      followers: userData.followers,
      contributionCalendar: contributionData,
    };
  } catch (error) {
    console.error('Error fetching GitHub stats:', error);
    return null;
  }
}

export async function GET() {
  const stats = await fetchGitHubStats();
  
  if (!stats) {
    return NextResponse.json({ error: 'Failed to fetch GitHub stats' }, { status: 500 });
  }

  return NextResponse.json(stats);
} 