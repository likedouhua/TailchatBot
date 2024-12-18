const path = require('path');
const fs = require('fs');

const sDataPath = __dirname;

function hasData(sModule, sFileName) {
    const sModulePath = path.join(sDataPath, sModule);
    if (!fs.existsSync(sModulePath)) {
        return false;
    }

    const sFilePath = path.join(sModulePath, sFileName);
    return fs.existsSync(sFilePath);
}

function getData(sModule, sFileName) {
    const sModulePath = path.join(sDataPath, sModule);
    if (!fs.existsSync(sModulePath)) {
        fs.mkdirSync(sModulePath);
    }

    const sFilePath = path.join(sModulePath, sFileName);
    if (!fs.existsSync(sFilePath)) {
        return;
    }
    try {
        const fs = require('fs');
        const sData = fs.readFileSync(sFilePath, 'utf8');
        var oData = JSON.parse(sData);
        return oData;
    } catch (error) {
        console.error(error);
    }
}

function removeData(sModule, sFileName) {
    const sModulePath = path.join(sDataPath, sModule);
    if (!fs.existsSync(sModulePath)) {
        return;
    }

    const sFilePath = path.join(sModulePath, sFileName);
    if (fs.existsSync(sFilePath)) {
        fs.unlinkSync(sFilePath);
    }
}

function saveData(sModule, sFileName, oJSON) {
    const sModulePath = path.join(sDataPath, sModule);
    if (!fs.existsSync(sModulePath)) {
        fs.mkdirSync(sModulePath);
    }

    const sFilePath = path.join(sModulePath, sFileName);
    const sJSON = JSON.stringify(oJSON, null, 2);
    try {
        const fs = require('fs');
        fs.writeFileSync(sFilePath, sJSON);
    } catch (error) {
        console.error(error);
    }
}

module.exports = {
    hasData,
    getData,
    removeData,
    saveData,
}