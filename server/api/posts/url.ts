import { sql } from "@vercel/postgres";

export default defineEventHandler(async (event) => {
   const Client = await sql.connect();

   const { rows } = await Client.sql`SELECT slug FROM posts;`;

   const res = rows.map((item) => {return "https://blog-kenryus.vercel.app" + item.slug;})

   return res;
});
