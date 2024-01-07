import { sql } from "@vercel/postgres";

export default defineEventHandler(async (event) => {
    const num = getRouterParam(event, 'n');
    const client = await sql.connect();
    let res = (await client.sql`SELECT id, title, subtitle, series, pub_date, image_path, image_alt, slug FROM posts ORDER BY id DESC LIMIT ${num};`).rows;
    client.release();
    return res;
});
