import axios from 'axios';

const fetchGitHubCommits = async () => {
  const { NEXT_PUBLIC_GITHUB_USERNAME, NEXT_PUBLIC_GITHUB_REPO, GITHUB_TOKEN } = process.env;

  try {
    const response = await axios.get(
      `https://api.github.com/repos/${NEXT_PUBLIC_GITHUB_USERNAME}/${NEXT_PUBLIC_GITHUB_REPO}/commits`,
      {
        headers: {
          Authorization: `Bearer ${GITHUB_TOKEN}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching GitHub data:", error);
    return [];
  }
};

export const getHeatmapData = async () => {
  const commits = await fetchGitHubCommits();
  const data = {};
  
  commits.forEach((commit) => {
    const date = commit.commit.author.date.slice(0, 10);
    if (!data[date]) data[date] = [];
    data[date].push({ message: commit.commit.message, url: commit.commit.url });
  });
  
  // console.log("Data:", data);
  return data;
};
