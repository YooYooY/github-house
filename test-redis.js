const Redis = require("ioredis");

const redis = new Redis({
  port: 6379,
  password: '',
})

;(async ()=>{
    // const keys = await redis.keys("*");
    // await redis.set("cc", 123);
    // console.log(keys);
    
    let cc = await redis.get("cc");
    console.log(cc);
})()