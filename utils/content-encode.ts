const encodedSingleQuotation = "\u2800";
const encodedDoubleQuotation = "\u2801";
const encodedTick = "\u2802";
const encodedNewLine = "\u2803";

export function encode(str: String) : String {
    let res = str.repeat(1);
    res = res.replaceAll("\'", encodedSingleQuotation).replaceAll('\"', encodedDoubleQuotation).replaceAll("\`", encodedTick).replaceAll("\n", encodedNewLine);
    return res;
}
