import yamlReader from "../file_readers/yamlReader.js";
import { Router } from "express";
const router = Router();

router.get("/yaml", async (req, res) => {
	const yamlFileData = yamlReader(`../files/me.yaml`);
	res.send(yamlFileData);
});

export default router;
