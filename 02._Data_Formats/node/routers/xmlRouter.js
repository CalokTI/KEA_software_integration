import xmlReader from "../file_readers/xmlReader.js";
import { Router } from "express";
const router = Router();

router.get("/xml", async (req, res) => {
	const xmlFileData = await xmlReader(`../files/me.xml`);
	res.send(xmlFileData.me);
});

export default router;
