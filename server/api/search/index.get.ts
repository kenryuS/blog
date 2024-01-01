import sqlite3 from "sqlite3";
import { open } from 'sqlite';
import path from 'path';

export default defineEventHandler(async (event) => {
    const qur = getQuery(event);
    if (JSON.stringify(qur) === '{}') {return 1;}
    let res = {item: []};
    let temp = [];
    const db = await open({
        filename: path.join(process.cwd(), "/public/posts.sqlite"),
        driver: sqlite3.Database,
        mode: sqlite3.OPEN_READONLY,
    });

    let sql_cmd = "SELECT id FROM contents";

    if (qur.kwd) {
        sql_cmd += ` WHERE tags LIKE '%${qur.kwd}%' OR title LIKE '%${qur.kwd}%' OR mdContent LIKE '%${qur.kwd}%'`
    }

    temp = await db.all(sql_cmd);

    let sql_ids = [];
    for (let i = 0; i < temp.length; i++) {
        sql_ids.push(temp[i].id);
    }

    sql_cmd = `SELECT * FROM indexes WHERE id IN (${sql_ids.toString()})`;

    res.item = await db.all(sql_cmd);

    await db.close();
    
    return res;
});
