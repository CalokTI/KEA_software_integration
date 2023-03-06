import express from "express";
const app = express();

app.get("/date", (req, res) => {
    res.send(new Date());
});

app.get("/datefromfastapi", async (req, res) => {
    const response = await fetch("http://127.0.0.1:8000/date");
    const date = await response.json();
    res.send(date);
});

const port = 8080;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});