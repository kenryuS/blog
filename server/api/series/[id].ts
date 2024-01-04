import { sql } from "@vercel/postgres";

export default defineEventHandler(async (event) => {
    const slug = getRouterParam(event, "id");

    const res = (await sql`SELECT * FROM series WHERE id = ${slug}`).rows;
    return res;
});
