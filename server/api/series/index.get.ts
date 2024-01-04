import { sql } from "@vercel/postgres";

export default defineEventHandler(async (event) => {
    const client = await sql.connect();

    let res = (await client.sql`SELECT * FROM series;`).rows;
    client.release();
    return res;
});