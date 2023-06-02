import net from "net";

const HOST = "localhost";
const PORT = 3000;

const client = new net.Socket();

client.connect(PORT, HOST, () => {
	console.log(`Client connected to ${HOST}:${PORT}`);
	client.write("Hello, server!");
});

client.on("data", (data) => {
	console.log(`Server data: `, data.toString());
	client.destroy();
});

client.on("close", () => {
	console.log("Client disconnected");
});

client.on("error", (err) => {
	console.log(err);
});
