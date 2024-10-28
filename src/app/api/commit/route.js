import { getCommitData } from '../../../../utils/commitUtils';

export async function POST(request) {
  try {
    const { commits } = await request.json();
    const data = await getCommitData(commits);
    return new Response(JSON.stringify(data), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error("Error in POST /api/commits:", error);
    return new Response(JSON.stringify({ error: "Failed to fetch commit data" }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}