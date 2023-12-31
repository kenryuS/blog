import { sql } from "@vercel/postgres";

export default defineEventHandler(async (event) => {
    const query = getQuery(event);
    const client = await sql.connect();
    
    await client.sql`DELETE FROM posts WHERE id = ${query.id};`;

    client.release();
});
