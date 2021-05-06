const Router = require("koa-router");
const router = new Router();
const _ = require("lodash");
const auth = require("../middlwares/auth");
const { server_url } = require("../config");

router.get("/", (ctx, next) => {
    ctx.body = "rest API";
});

router.get("/auth", (ctx, next) => {
    ctx.body = ctx.query;
});

router.get("/user", auth, (ctx, next) => {
    ctx.body = require("../json/user.json");
});

router.get("/user/repos", auth, (ctx, next) => {
    ctx.body = require("../json/repos.json");
});
router.get("/user/starred", auth, (ctx, next) => {
    ctx.body = require("../json/starred.json");
});

const repositories = require("../json/repositories.json");
router.get("/search/repositories", (ctx, next) => {
    // const query = {
    //     q: "react language",
    //     sort: "stars",
    //     order: "desc",
    //     page: "10",
    //     pre_page: "20"
    // };

    let { q, pre_page } = ctx.query;
    pre_page = parseInt(pre_page) || 10;
    let [search, langType] = q.split(" ");
    let items = repositories.items;

    if (langType) {
        let [, language] = langType.split(":");
        if (language) {
            language = language.toLowerCase();
            items = items.filter(
                (t) => t.language && t.language.toLowerCase() === language
            );
        }
    }

    items = _.shuffle(items).slice(0, pre_page);
    items = _.cloneDeep(items).map((item) => {
        item.name = search + "_" + item.name;
        item.full_name = item.full_name + "/" + search;
        return item;
    });

    ctx.body = {
        total_count: pre_page + Math.round(Math.random() * 1000),
        incomplete_results: false,
        items,
    };
});

router.get("/login/oauth/authorize", (ctx, next) => {
    ctx.redirect(server_url + "/auth?code=mockcode");
});

router.post("/login/oauth/access_token", (ctx, next) => {
    console.log("body", ctx.request.body);

    ctx.body = {
        access_token: "mock_access_token",
        token_type: "bearer",
        scope: "user",
    };
});

module.exports = (app) => {
    app.use(router.routes());
};
