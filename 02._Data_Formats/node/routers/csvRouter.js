import csvReader from "../file_readers/csvReader.js";
import { Router } from "express";
const router = Router();

router.get("/csv", async (req, res) => {
    const csvFileData = await csvReader(`../files/me.csv`);
	res.send(csvFileData[0]);
});

export default router;
