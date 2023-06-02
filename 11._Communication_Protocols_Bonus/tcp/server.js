import net from "net";

const HOST = "localhost";
const PORT = 3000;

const server = net.createServer((socket) => {
	console.log("Client connected");

	socket.on("data", (data) => {
		console.log(socket.remoteAddress, socket.remotePort, `Client data: `, data.toString());
		socket.write(`Server reply: Sup, client?`);
	});

	socket.on("close", () => {
		console.log(socket.remoteAddress, socket.remotePort, "Client disconnected");
	});

	socket.on("error", (err) => {
		console.log(err);
	});
});

server.listen(PORT, HOST, () => {
    console.log(`Server listening on ${HOST}:${PORT}`);
});