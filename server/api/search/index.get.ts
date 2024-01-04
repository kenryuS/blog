import { sql } from "@vercel/postgres";

export default defineEventHandler(async (event) => {
    const qur = getQuery(event);
    if (JSON.stringify(qur) === '{}') {return 1;}
    let temp = [];

    let search_kwd = `%${qur.kwd}%`;

    temp = (await sql`SELECT id FROM posts WHERE tags LIKE ${search_kwd} OR title LIKE ${search_kwd} OR post_content LIKE ${search_kwd}`).rows;

    let sql_ids = [];
    for (let i = 0; i < temp.length; i++) {
        sql_ids.push(temp[i].id);
    }

    let res = (await sql`SELECT id, title, subtitle, pub_date, slug FROM posts WHERE id = ANY(${"{" + sql_ids.toString() + "}"} :: int8[])`).rows;
    
    return res;
});
