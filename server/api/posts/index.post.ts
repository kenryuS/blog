import { sql } from "@vercel/postgres";

export default defineEventHandler(async (event) => {
    const body = await readBody(event);
    const client = await sql.connect();

    if (body.action === "new") {
        await client.sql`INSERT INTO posts (id, series, title, subtitle, image_path, image_alt, pub_date, update_date, slug, post_content, tags) VALUES (${Date.parse(body.pubdate)}, ${body.series}, ${body.title}, ${body.subtitle}, ${body.covimg}, ${body.covimg_alt}, ${body.pubdate}, ${body.pubdate}, ${"/posts/" + body.series + "/" +  body.slugname}, ${body.content}, ${body.tags})`;
    } else if (body.action === "edit") {
        await client.sql`UPDATE posts SET series=${body.series}, title=${body.title}, subtitle=${body.subtitle}, image_path=${body.covimg}, image_alt=${body.covimg_alt}, update_date=${body.updatedate}, slug=${"/posts/" + body.series + "/" + body.slugname}, post_content=${body.content}, tags=${body.tags} WHERE id=${body.id}`;
    }
});
