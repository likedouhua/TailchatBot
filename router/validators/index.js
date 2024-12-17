const Ajv = require('ajv');
const ajv = new Ajv();

const addFormats = require('ajv-formats'); // 引入 ajv-formats
addFormats(ajv); // 将格式添加到 ajv 实例



const jenkinsSchema = require('../schemas/jenkinsSchema');
const redmineSchema = require('../schemas/redmineSchema');

const jenkinsValidator = ajv.compile(jenkinsSchema);
const redmineValidator = ajv.compile(redmineSchema);

module.exports = { jenkinsValidator, redmineValidator };