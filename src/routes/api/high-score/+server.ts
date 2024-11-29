import { db } from "$lib/server/database";
import type { HighScoreEntry } from "$lib/server/types";
import { json, type RequestHandler } from "@sveltejs/kit";

export const POST: RequestHandler = async ({ request, cookies }) => {
  const { name, score } = await request.json();
  const cookieName = cookies.get("name");
  if (!cookieName) {
    cookies.set("name", name, {
      httpOnly: true,
      maxAge: 60 * 60 * 24 * 30, // 1 month
      path: "/",
    });
  }

  db.prepare("INSERT INTO high_score (name, score) VALUES (?, ?)").run(
    name,
    score,
  );
  console.log("High-score added successfully console.log message");

  return new Response(
    JSON.stringify({ status: "High-score added successfully" }),
    { status: 200 },
  );
};

export const GET: RequestHandler = async ({ url }) => {
  const amount = parseInt(url.searchParams.get("amount") || "10", 10);
  const page = parseInt(url.searchParams.get("page") || "1", 10);

  const highScores = db
    .prepare(
      `
      SELECT name, score, created_at
      FROM high_score
      ORDER BY score DESC
      LIMIT ? OFFSET ?
    `,
    )
    .all(amount, (page - 1) * amount) as HighScoreEntry[];

  return json(highScores);
};
