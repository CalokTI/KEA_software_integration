import fs from "fs";
import { XMLParser } from "fast-xml-parser";

async function xmlReader(filePath) {
	return new Promise((resolve, reject) => {
		fs.readFile(filePath, "utf-8", (error, data) => {
			if (error) {
				reject(error);
				return;
			}

			const parser = new XMLParser();
			const jsObject = parser.parse(data);

			resolve(jsObject);
		});
	});
}

export default xmlReader;
