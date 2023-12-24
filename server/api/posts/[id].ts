import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import path from 'path';

export default defineEventHandler(async (event) => {
    const slug = getRouterParam(event, "id");
    let resJson = {"indexes": [], "contents": []};
    const db = await open({
        filename: path.join(process.cwd(), "/public/posts.sqlite"),
        driver: sqlite3.Database,
        mode: sqlite3.OPEN_READWRITE
    });

    const sql_cmd_indexes = `SELECT * FROM indexes WHERE id = ${slug}`;
    const sql_cmd_contents = `SELECT mdContent, tags FROM contents WHERE id = ${slug}`;

    try {
        resJson["indexes"] = await db.all(sql_cmd_indexes);
        resJson["contents"] = await db.all(sql_cmd_contents);
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
        return resJson;
    }
});
