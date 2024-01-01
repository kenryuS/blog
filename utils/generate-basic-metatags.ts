import type { PageMetaData, GlobalSiteMetaData } from "./metadataObject.ts";
import type { UseSeoMetaInput } from "@unhead/schema";

export function genBasicMeta(metas: Object, pageName: String): UseSeoMetaInput {
    const val: PageMetaData = JSON.parse(JSON.stringify(metas[pageName])) as PageMetaData;
    const siteMetaData : GlobalSiteMetaData = JSON.parse(JSON.stringify(metas.siteMeta)) as GlobalSiteMetaData;
    let ret: UseSeoMetaInput = val as UseSeoMetaInput;
    ret["title"] = siteMetaData.name + " - " + ret.title;
    ret["lang"] = siteMetaData.lang;
    ret["charset"] = siteMetaData.charset;
    ret["icon"] = siteMetaData.icon;
    ret["ogTitle"] = ret.title;
    ret["ogDescription"] = ret.description;
    ret["ogLocale"] = siteMetaData.locale;
    ret["ogSiteName"] = ret.title;
    ret["ogUrl"] = "".concat(siteMetaData.base_url.valueOf(), val["path_to_page"].valueOf());
    ret["twitter:title"] = ret["title"];
    ret["twitter:description"] = ret.description;
    ret["twitter:image"] = ret.ogImage;
    ret["twitter:card"] = siteMetaData.default_twitter_card_type;
    return ret;
}
