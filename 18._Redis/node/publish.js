import Redis from "ioredis";

const redis = new Redis({
	port: 6379,
	host: "localhost",
});

const channel = "truxa";

setInterval(() => {
	redis.publish(channel, "Hello world!");
}, 5000);