import UDP from "dgram";

const server = UDP.createSocket("udp4");

const HOST = "localhost";
const PORT = 3000;

server.on("listening", () => {
	const address = server.address();
	console.log(`Server listening on ${address.address}:${address.port}`);
});

server.on("message", (message, remote) => {
	console.log(remote.address, remote.port, remote.size, `Client data: `, message.toString());

	const response = Buffer.from(`Hello, client!`);

	server.send(response, 0, response.length, remote.port, remote.address, (err, bytes) => {
		if (err) console.error(err);
		else console.log(`Response successfully sent to ${remote.address}:${remote.port}`);
	});
});

server.bind(PORT, HOST);