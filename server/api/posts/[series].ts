import { sql } from "@vercel/postgres";

export default defineEventHandler(async (event) => {
    const seriesName = await getRouterParam(event, 'series');  
    const client = await sql.connect();

    const { rows } = await client.sql`SELECT title, subtitle, image_path, slug, pub_date FROM posts WHERE series = ${seriesName} ORDER BY id DESC;`;
    let res = rows;
    client.release();
    return res;
});
