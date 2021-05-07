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

router.get("/repos/:owner/:name", (ctx, next) => {
    let { owner = "default", name = "default" } = ctx.params;
    // 中文
    let repos = require("../json/repo.json");
    // let repos = require("../json/repo.json");
    repos.name = name;
    repos.full_name = `${owner}/${name}`;
    repos.owner.login = owner;

    ctx.body = repos;
});

router.get("/repos/:owner/:name/readme", (ctx, next) => {
    ctx.body = require("../json/readme_zh.json");
});
router.get("/repos/:owner/:name/issues", (ctx, next) => {
    let data = require("../json/issues.json");
    let { creator, state, label } = ctx.query;

    if (creator) {
        data = _.shuffle(data);
    }
    if (state) {
        data = _.shuffle(data).slice(0, 10);
        data.forEach((item) => (item.state = state));
    }
    if (label) {
        data = _.shuffle(data).slice(0, 5);
    }

    ctx.body = data;
});
router.get("/repos/:owner/:name/labels", (ctx, next) => {
    ctx.body = require("../json/labels.json");
});

const repositories = require("../json/repos_search.json");
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

router.get("/search/users", (ctx, next) => {
    const { q = "" } = ctx.query;
    let data = require("../json/search.json");
    data.items.forEach((item) => {
        item.login = item.login + "_" + q;
    });
    ctx.body = data;
});

router.get("/login/oauth/authorize", (ctx, next) => {
    ctx.redirect(server_url + "/auth?code=mockcode");
});

router.post("/login/oauth/access_token", (ctx, next) => {
    ctx.body = {
        access_token: "mock_access_token",
        token_type: "bearer",
        scope: "user",
    };
});

module.exports = (app) => {
    app.use(router.routes());
};
