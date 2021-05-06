module.exports = async (ctx, next) => {
    if (!ctx.get("authorization")) {
        ctx.status = 401;
        ctx.body = {
            message: "no authorization",
        };
    } else {
        await next();
    }
};
