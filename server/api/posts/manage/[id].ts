import { sql } from "@vercel/postgres";

export default defineEventHandler(async (event) => {
    const id = getRouterParam(event, "id");
    const client = await sql.connect();

    let res = (await client.sql`SELECT * FROM posts WHERE id = ${id}`).rows;
    client.release();
    return res;
});
