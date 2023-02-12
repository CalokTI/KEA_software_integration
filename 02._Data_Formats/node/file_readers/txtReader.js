//Read text file and convert the data to an js object
import fs from "fs";

async function txtReader(filePath) {
	return new Promise((resolve, reject) => {
		fs.readFile(filePath, "utf-8", (error, data) => {
			if (error) {
				reject(error);
			} else {
				const lines = data.split("\n");
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

				resolve(objectData);
			}
		});
	});
}

export default txtReader;
