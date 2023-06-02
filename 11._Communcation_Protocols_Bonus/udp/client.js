import UDP from "dgram";

const client = UDP.createSocket("udp4");

const HOST = "localhost";
const PORT = 3000;

client.on("message", (message, remote) => {
	console.log("server:", remote);
	console.log("message", message.toString());
});

const packet = Buffer.from("Hello, server!");

client.send(packet, 0, packet.length, PORT, HOST, (err, bytes) => {
	if (err) console.error(err);
	else console.log(`Client sent packet with ${bytes} bytes`);
});
