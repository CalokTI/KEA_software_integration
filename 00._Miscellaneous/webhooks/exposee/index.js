import express from "express";
import bodyParser from "body-parser";
import { open } from "sqlite";
import sqlite3 from "sqlite3";

const app = express();
const port = process.env.PORT || 3000;

// open database connection
async function openDb() {
	return open({
		filename: "webhooks.db",
		driver: sqlite3.Database,
	});
}

// create webhook table if it does not exist
async function createWebhookTable() {
	const db = await openDb();
	await db.run(`
    CREATE TABLE IF NOT EXISTS webhooks (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      endpoint TEXT NOT NULL UNIQUE,
	  chaos BOOLEAN NOT NULL DEFAULT 0
    )
  `);
	await db.close();
}

createWebhookTable();

// parse JSON and URL-encoded request bodies
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// handle POST request to register a webhook
app.post("/webhooks/register", async (req, res) => {
	const endpoint = req.body.endpoint;
	const chaos = req.body.chaos || false;

	try {
		const db = await openDb();
		await db.run("INSERT INTO webhooks (endpoint, chaos) VALUES (?, ?)", [endpoint, chaos]);
		await db.close();
		console.log(`Webhook registered: ${endpoint}`);
		return res.status(200).send("Webhook registered");
	} catch (err) {
		console.error(err.message);
		return res.status(500).send("Error registering webhook");
	}
});

app.post("/webhooks/update", async (req, res) => {
	const endpoint = req.body.endpoint;
	const chaos = req.body.chaos;

	try {
		const db = await openDb();
		await db.run("UPDATE webhooks SET chaos = ? WHERE endpoint = ?", [chaos, endpoint]);
		await db.close();
		console.log(`Webhook updated: ${endpoint}`);
		return res.status(200).send("Webhook updated");
	} catch (err) {
		console.error(err.message);
		return res.status(500).send("Error updating webhook");
	}
});


// handle POST request to remove a webhook
app.post("/webhooks/remove", async (req, res) => {
	const endpoint = req.body.endpoint;

	try {
		const db = await openDb();
		await db.run("DELETE FROM webhooks WHERE endpoint = ?", [endpoint]);
		await db.close();
		console.log(`Webhook removed: ${endpoint}`);
		return res.status(200).send("Webhook removed");
	} catch (err) {
		console.error(err.message);
		return res.status(500).send("Error removing webhook");
	}
});

setInterval(async () => {
    try {
        const db = await openDb();
        const webhooks = await db.all("SELECT * FROM webhooks WHERE chaos = 0");
        await db.close();
        console.log(`Sending normal webhooks to ${webhooks.length} endpoints`);
        webhooks.forEach(async (webhook) => {
            try {
                await fetch(webhook.endpoint, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        message: "Hello from the server",
                    }),
                });
            } catch (err) {
                console.error(err.message);
            }
        });
    } catch (err) {
        console.error(err.message);
    }
}, 60000);

function getChaosInterval() {
	const min = 1000;
	const max = 60000;
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

let chaosInterval = getChaosInterval();

setInterval(async () => {
	try {
		const db = await openDb();
		const webhooks = await db.all("SELECT * FROM webhooks WHERE chaos = 1");
		await db.close();
		console.log(`Sending chaos webhooks to ${webhooks.length} endpoints`);
		webhooks.forEach(async (webhook) => {
			try {
				await fetch(webhook.endpoint, {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						message: "Hello from the server",
					}),
				});
			} catch (err) {
				console.error(err.message);
			}
		});
	} catch (err) {
		console.error(err.message);
	}
	chaosInterval = getChaosInterval();
}, chaosInterval);


// start server
app.listen(port, () => {
	console.log(`Server listening on port ${port}`);
});
