//@ts-ignore

import clientPromise from "../../../lib/mongodb";

export async function POST(req: any) {
  //@ts-ignore
  const client = await clientPromise;
  //@ts-ignore
  const db = client.db("data");

  try {
    const { team } = await req.json();

    const result = await db.collection("shortlistedTeams").insertOne(team);

    return new Response(
      JSON.stringify({
        message: "Team added to shortlistedTeams successfully",
        team: result,
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error: any) {
    console.error("Failed to add team to shortlistedTeams:", error);
    return new Response(
      JSON.stringify({
        message: "Failed to add team to shortlistedTeams",
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
