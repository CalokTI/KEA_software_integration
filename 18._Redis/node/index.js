import Redis from "ioredis";

const redis = new Redis({
	port: 6379,
	host: "localhost",
});

const channel = "truxa";

redis.subscribe(channel, (err, count) => {
	if (err) {
		throw new Error(err);
	}
	console.log(`Subscribed to ${count} channel. Listening for updates on the ${channel} channel.`);
});

redis.on("message", (channel, message) => {
	console.log(`Message received. Channel: ${channel}. Message: ${message}`);
});

//redis.quit();
