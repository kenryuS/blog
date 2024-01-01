import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import path from 'path';

export default defineEventHandler(async (event) => {
    const body = await readBody(event);
    const db = await open({
        filename: path.join(process.cwd(), "/public/posts.sqlite"),
        driver: sqlite3.Database,
        mode: sqlite3.OPEN_READWRITE
    });

    let sql_cmd_index = "";
    let sql_cmd_contents = "";

    if (body.action === "new") {
        sql_cmd_index = `INSERT INTO indexes (id, series, title, subTitle, coverImg, pubDate, updateDate, slug) VALUES (${Date.parse(body.pubdate)}, "${body.series}", "${body.title}", "${body.subtitle}", "${body.covimg}", "${body.pubdate}", "${body.pubdate}", "${"/posts/" + body.series + "/" +  body.slugname}")`;

        sql_cmd_contents = `INSERT INTO contents (id, series, title, subTitle, pubDate, updateDate, mdContent, headimage, tags, slug) VALUES (${Date.parse(body.pubdate)}, "${body.series}", "${body.title}", "${body.subtitle}", "${body.pubdate}", "${body.pubdate}", '${body.content}', "${body.covimg}", "${body.tags}", "${"/posts/" + body.series + "/" + body.slugname}")`;
    } else if (body.action === "edit") {
        sql_cmd_index = `UPDATE indexes SET series="${body.series}", title="${body.title}", subTitle="${body.subtitle}", coverImg="${body.covimg}", updateDate="${body.updatedate}", slug="${"/posts/" + body.series + "/" + body.slugname}" WHERE id=${body.id}`;
        sql_cmd_contents = `UPDATE contents SET mdContent="${body.content}", updateDate="${body.updatedate}", title="${body.title}", subTitle="${body.subtitle}", series="${body.series}", headimage="${body.covimg}", tags="${body.tags}", slug="${"/posts/" + body.series + "/" + body.slugname}" WHERE id=${body.id}`;
  }

    try {
        await db.exec(sql_cmd_index);
        
        await db.exec(sql_cmd_contents);
        
        setResponseStatus(event, 200);
    } catch (err: unknown) {
        if (err instanceof Error) {
            console.error(err.message);
            setResponseStatus(event, 500);
            throw createError({statusCode: 500, statusMessage: err.message, name: err.name, cause: err.cause});
        } else if (typeof err === "string") {
            console.error(`Error: ${err}`);
            setResponseStatus(event, 500);
            throw createError({statusCode: 500, statusMessage: err});
        } else {
            console.error("Unknown Error: Please report the Issue");
            setResponseStatus(event, 505);
            throw createError({statusCode: 505, statusMessage: "Unknown Error", message: "Unknown Error", fatal: true});
        }
    } finally {
        await db.close();
        setResponseStatus(event, 200);
    }
});
