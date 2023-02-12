import YAML from "yamljs";

function yamlReader(filePath) {
    const yamlData = YAML.load(filePath);
    return yamlData;
}

export default yamlReader;