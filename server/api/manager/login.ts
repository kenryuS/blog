import bcrypt from "bcrypt";

export default defineEventHandler(async (event) => {
    const body = await readBody(event);
    const plainText = body.pass;
    const config = useRuntimeConfig();

    const hash = config.CMS_PASSWD;

    const res = await bcrypt.compareSync(plainText, hash);

    return res;
});
