import fs from "fs";
import csv from "csvtojson";

function csvReader(csvFilePath) {
	return new Promise((resolve, reject) => {
		fs.readFile(csvFilePath, "utf-8", (err, data) => {
			if (err) {
				reject(err);
				return;
			}

			csv({
				noheader: false,
				output: "json",
				colParser: {
					"age": "number",
					"hobbies":function(item){
						return item.split("|");
					}
				},
			})
				.fromString(data)
				.then((jsObject) => {
					resolve(jsObject);
				})
				.catch((error) => {
					reject(error);
				});
		});
	});
}

export default csvReader;