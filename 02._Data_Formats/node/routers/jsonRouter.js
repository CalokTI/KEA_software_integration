import { Router } from "express";
const router = Router();

import { readFileSync } from "fs";

router.get("/json", async (req, res) => {
	const jsonFileData = JSON.parse(readFileSync(`../files/me.json`));
	res.send(jsonFileData[0]);
});

export default router;
