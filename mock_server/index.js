const Koa = require('koa');
const app = new Koa();
const cors = require('@koa/cors');
const koaBody = require('koa-body');
const IndexRouter = require("./routers");

app.use(cors());
app.use(koaBody({
    multipart:true
}));

app.use(async (ctx,next)=>{
    console.log("URL => ",ctx.url);
    await next();
});

IndexRouter(app);

app.use(async (ctx,next)=>{
    ctx.status = 404;
    ctx.body = "not Found";
})

app.listen(3001,()=>{
    console.log("serving on http://localhost:3001");
});