import csv
import json
import xmltodict
import yaml
from flask import Flask, jsonify
app = Flask(__name__)


@app.route("/csv")
def get_csv_data():
    
    with open ("../files/me.csv", "r") as csvfile:
        
        reader = csv.reader(csvfile)
        data = []
        columns = next(reader)

        for row in reader:
            row_data = {}
            for i in range(len(columns)):
                #checks if the value is an array and splits it
                value = row[i].split('|') if '|' in row[i] else row[i]

                #checks if the value is not a list
                if not isinstance(value, list):

                    #checks if the value is a number and converts it to int or float
                    if value.isnumeric():
                        value = int(value)
                    elif value.replace('.', '', 1).isdigit():
                        value = float(value)
                
                row_data[columns[i]] = value

            data.append(row_data)

        return jsonify(data[0])
    
@app.route("/json")
def get_json_data():
        
    with open ("../files/me.json", "r") as jsonfile:
            
        data = json.load(jsonfile)
        return jsonify(data[0])
    
@app.route("/txt")
def get_txt_data():
        
    with open ("../files/me.txt", "r") as txtfile:
            
        data_str = txtfile.read()

    data_dict = parse_txt_data(data_str)


    return jsonify(data_dict)

def parse_txt_data(data_str):
    data_dict = {}
    lines = data_str.strip().split("\n")

    for line in lines:
        key, value = line.strip().split(": ")
        
        if "," in value:
            value = value.split(", ")
        elif value.isnumeric():
            if "." in value:
                value = float(value)
            else:
                value = int(value)
        
        data_dict[key] = value

    return data_dict

@app.route("/xml")
def get_xml_data():
        
    with open ("../files/me.xml", "r") as xmlfile:
            
        data = xmltodict.parse(xmlfile.read())
        return jsonify(data)
    
@app.route("/yaml")
def get_yaml_data():
        
    with open ("../files/me.yaml", "r") as yamlfile:
            
        data = yaml.safe_load(yamlfile)
        return jsonify(data)
    

if __name__ == "__main__":
    app.run()
