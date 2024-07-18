// pages/api/teams.ts
//@ts-ignore
import clientPromise from "../../../lib/mongodb";

export async function GET(req: any) {
  //@ts-ignore
  const client = await clientPromise;
  //@ts-ignore
  const db = client.db("data");

  try {
    const teams = await db.collection("teams").find({}).toArray();

    return new Response(JSON.stringify(teams), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error: any) {
    console.error("Failed to fetch teams:", error);
    return new Response(
      JSON.stringify({
        message: "Failed to fetch teams",
        error: error.message,
      }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
}
