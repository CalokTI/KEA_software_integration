import txtReader from "../file_readers/txtReader.js";
import { Router } from "express";
const router = Router();

router.get("/txt", async (req, res) => {
	const txtFileData = await txtReader(`../files/me.txt`);
	res.send(txtFileData);
});

export default router;
