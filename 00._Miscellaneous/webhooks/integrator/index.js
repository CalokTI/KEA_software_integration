import express from "express";

const app = express();
const port = process.env.PORT || 3001;

app.post("/intervalendpoint", (req, res) => {
    console.log("Interval endpoint called");
    res.status(200).send("Interval endpoint called");
});

app.post("/chaosendpoint", (req, res) => {
    console.log("Chaos endpoint called");
    res.status(200).send("Chaos endpoint called");
});

// start server
app.listen(port, () => {
	console.log(`Server listening on port ${port}`);
});
