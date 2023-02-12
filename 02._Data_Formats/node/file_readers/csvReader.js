import fs from "fs";
import { parse } from "csv-parse";

class CsvReader {
	constructor(filePath) {
		this.filePath = filePath;
		this.data = [];
	}

	read() {
		return new Promise((resolve, reject) => {
			fs.createReadStream(this.filePath)
				.pipe(parse({ columns: true }))
				.on("data", (data) => {
					this.data.push(data);
				})
				.on("end", () => {
					console.log("Finished reading CSV file.");
					resolve(this.data);
				})
				.on("error", (error) => {
					reject(error);
				});
		});
	}
}

async function csvReader(filePath) {
	const csvReader = new CsvReader(filePath);
	const csvData = await csvReader.read();
	return csvData;
}

export default csvReader;
