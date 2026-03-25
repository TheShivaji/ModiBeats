import dotenv from "dotenv";
dotenv.config()

import Redis from "ioredis"

export const redis = new Redis({
    host: process.env.REDIS_HOST,
    port: Number(process.env.REDIS_PORT),
    password: process.env.REDIS_PASSWORD
})
console.log("DEBUG:", process.env.REDIS_HOST, process.env.REDIS_PORT);

redis.on("connect", () => {
    console.log("Redis connected")
})

redis.on("error", (err) => {
    console.error("Redis error:", err)
})