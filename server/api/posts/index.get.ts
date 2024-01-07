import { sql } from "@vercel/postgres";

enum DataPreset {
    Display = 0,
    IndexOnly,
    Minimal,
    Management
};

export default defineEventHandler(async (event) => {
    const client = await sql.connect();
    const query = getQuery(event);
    const dataPreset = query.datapreset;
    let sql_result;
    if (dataPreset == DataPreset.Display) {
        const search_slug = `/posts/${query.series}/${query.post}`;
        sql_result = await client.sql`SELECT * FROM posts WHERE slug = ${search_slug};`;
    } else if (dataPreset == DataPreset.IndexOnly) {
        sql_result = await client.sql`SELECT title, subtitle, image_path, slug, pub_date, image_alt FROM posts ORDER BY id DESC;`;
    } else if (dataPreset == DataPreset.Minimal) {
        sql_result = await client.sql`SELECT title, subtitle, slug, pub_date FROM posts ORDER BY id DESC;`;
    } else if (dataPreset == DataPreset.Management) {
        sql_result = await client.sql`SELECT id, title, pub_date, slug, series, image_alt FROM posts ORDER BY id DESC;`;
    } else {
        sql_result = await client.sql`SELECT * FROM posts ORDER BY id DESC;`;
    }
    let res = sql_result.rows;
    client.release();
    return res;
});
