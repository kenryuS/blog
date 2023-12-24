interface PageMetaData {
    title: String,
    description: String,
    contentType: String,
    lang?: String,
    charset?: String,
    icon?: String,
    ogType: String,
    ogImage: String,
    ogTitle?: String,
    ogDescription?: String,
    ogLocale?: String,
    ogSiteName?: String,
    ogUrl?: String,
    "twitter:title"?: String,
    "twitter:description"?: String,
    "twitter:image"?: String,
    "twitter:card"?: String,
    path_to_page: String,
};

interface GlobalSiteMetaData {
    name: String,
    locale: String,
    lang: String,
    base_url: String,
    charset: String,
    default_twitter_card_type: String,
    icon: String
}

export type { PageMetaData, GlobalSiteMetaData };
