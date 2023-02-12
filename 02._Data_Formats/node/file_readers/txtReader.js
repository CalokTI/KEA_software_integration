//Read text file and convert the data to an js object
import fs from "fs";

class TxtReader {
	constructor(filePath) {
		this.filePath = filePath;
	}

	read() {
		return new Promise((resolve, reject) => {
			fs.readFile(this.filePath, "utf-8", (error, data) => {
				if (error) {
					reject(error);
				} else {
					resolve(data);
				}
			});
		});
	}
}

async function txtReader(filePath) {
	const txtReader = new TxtReader(filePath);
	const txtData = await txtReader.read();
	const lines = txtData.split("\n");
	const objectData = {};

    //Split each line by colon and trim whitespace
	lines.forEach((line) => {
		const keyValue = line.split(":");
		const key = keyValue[0].trim();

        //Split values by comma and trim whitespace
		let values = keyValue[1]
			.trim()
			.split(",")
			.map((value) => value.trim());

        //Convert values to numbers if possible
		values = values.map((value) => {
			const number = Number(value);
			return isNaN(number) ? value : number;
		});

        //If there is only one value, then don't use an array
		objectData[key] = values.length > 1 ? values : values[0];
	});

	return objectData;
}

export default txtReader;
