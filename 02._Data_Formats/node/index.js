import { opendirSync, readFileSync } from "fs";
import path from "path";
import csvReader from "./file_readers/csvReader.js";
import txtReader from "./file_readers/txtReader.js";
import xmlReader from "./file_readers/xmlReader.js";
import yamlReader from "./file_readers/yamlReader.js";

const dir = opendirSync("../files");
for await (const entry of dir) {
	if (path.extname(entry.name) === ".csv") {
		const csvFileData = await csvReader(`../files/${entry.name}`);
		console.log("csv:", csvFileData[0]);
	}
	if (path.extname(entry.name) === ".json") {
		const jsonFileData = JSON.parse(readFileSync(`../files/${entry.name}`));
		console.log("json", jsonFileData[0]);
	}
	if (path.extname(entry.name) === ".txt") {
		const txtFileData = await txtReader(`../files/${entry.name}`);
		console.log("txt:", txtFileData);
	}
	if (path.extname(entry.name) === ".xml") {
		const xmlFileData = await xmlReader(`../files/${entry.name}`);
		console.log("xml:", xmlFileData.me);
	}
	if (path.extname(entry.name) === ".yaml") {
		const yamlFileData = yamlReader(`../files/${entry.name}`);
		console.log("ymal:", yamlFileData);
	}
}
