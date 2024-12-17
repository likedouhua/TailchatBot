const Ajv = require('ajv');
const ajv = new Ajv();

const jenkinsSchema = require('../schemas/jenkinsSchema');
const redmineSchema = require('../schemas/redmineSchema');

const jenkinsValidator = ajv.compile(jenkinsSchema);
const redmineValidator = ajv.compile(redmineSchema);

module.exports = { jenkinsValidator, redmineValidator };