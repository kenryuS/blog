import { sql } from "@vercel/postgres";

export default defineEventHandler(async (event) => {
    const body = await readBody(event);
    const client = await sql.connect();

    if (body.action === "new") {
        let current_count = ((await client.sql`SELECT COUNT(id) FROM series;`).rows);
        let new_count = (+(current_count[0]["count"])) + 1;
        await client.query('INSERT INTO series (id, series, displayname, description) VALUES($1, $2, $3, $4);', [new_count, body.series, body.displayName, body.description]);
    } else if (body.action === "edit") {
        await client.sql`UPDATE series SET series=${body.series}, displayname=${body.displayName}, description=${body.description} WHERE id = ${body.seriesID};`;
    }

    client.release();
});
