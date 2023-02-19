import express from "express";
const app = express();

import csvRouter from "./routers/csvRouter.js";
app.use(csvRouter);
import jsonRouter from "./routers/jsonRouter.js";
app.use(jsonRouter);
import txtRouter from "./routers/txtRouter.js";
app.use(txtRouter);
import xmlRouter from "./routers/xmlRouter.js";
app.use(xmlRouter);
import yamlRouter from "./routers/yamlRouter.js";
app.use(yamlRouter);

const port = 3000;
app.listen(port, () => {
	console.log(`Server is running on port ${port}`);
});