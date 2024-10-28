import axios from "axios";

const fetchGitHubCommitsData = async (commit_sha) => {
    const { NEXT_PUBLIC_GITHUB_USERNAME, NEXT_PUBLIC_GITHUB_REPO, GITHUB_TOKEN } = process.env;

    try {
        const response = await axios.get(
            `https://api.github.com/repos/${NEXT_PUBLIC_GITHUB_USERNAME}/${NEXT_PUBLIC_GITHUB_REPO}/commits/${commit_sha}`,
            {
                headers: {
                    Authorization: `Bearer ${GITHUB_TOKEN}`,
                },
            }
        );
        return response.data;
    } catch (error) {
        console.error("Error fetching GitHub data:", error);
        return null;
    }
};

export const getCommitData = async (commits) => {
    
    const commitDetails = await Promise.all(commits.map(async (commit) => {
        const commit_sha = commit.url.split('/').pop(); // extract sha from url
        const commitData = await fetchGitHubCommitsData(commit_sha); // fetch data for each commit url

        if (!commitData) {
            console.error(`No data returned for commit SHA: ${commit_sha}`);
            return null; // return null for this entry
        }

        const stats = commitData.stats.total === 0 && commitData.stats.additions === 0 && commitData.stats.deletions === 0 ? null : commitData.stats;
        const blob_url = commitData.files && commitData.files[0] ? commitData.files[0].blob_url : null;
        if(!stats || !blob_url) {
            return null; // return null for this entry
        }

        const fileName = blob_url.split('/').pop().replace(/%2F/g, '/');

        return {
            message: fileName,
            stats: stats,
            blob_url: blob_url
        };
    }));
    
    const data = commitDetails.filter(Boolean); // filter any null entries

    // console.log("CData:", data);
    return data;
};
