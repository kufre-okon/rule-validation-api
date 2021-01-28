const { helper } = require("../utilities/helper.js");
const ApiResponse = require('../utilities/apiresponse.js');
const DataValidator = require("../utilities/data-validator.js");

module.exports = {
    home: (req, res) => {
        const api = new ApiResponse(req, res);
        return api.sendJson("My Rule-Validation API", true, {
            "name": "Kufre Effiong Okon",
            "github": "@kufre-okon",
            "email": "kufreeffiong34@gmail.com",
            "mobile": "07065657658",
            "twitter": "@kufreokon24"
        })
    },
    validateData: (req, res) => {
        const api = new ApiResponse(req, res);
        const { rule, data } = {...req.body };
        if (rule === undefined)
            return api.sendError(400, "rule is required.");
        if (data === undefined)
            return api.sendError(400, "data is required.");

        if (!helper.isObject(rule))
            return api.sendError(400, "rule should be an object.");

        const { field, condition, condition_value } = {...rule };
        // validate rule fields
        if (helper.empty(field))
            return api.sendError(400, "field is required.");
        if (helper.empty(condition))
            return api.sendError(400, "condition is required.");
        if (helper.empty(condition_value))
            return api.sendError(400, "condition_value is required.");

        // get rule.field nested objects
        let fieldLevels = field.split('.');
        if (data[fieldLevels[0]] === undefined)
            return api.sendError(400, `field ${fieldLevels[0]} is missing from data.`);
        if (fieldLevels.length > 1 && data[fieldLevels[0]][fieldLevels[1]] === undefined)
            return api.sendError(400, `field ${fieldLevels[1]} is missing from data.`);

        // validation starts
        let validationStatus = false,
            fieldValue;
        if (fieldLevels.length === 1) {
            fieldValue = data[fieldLevels[0]];
            validationStatus = DataValidator.validate(fieldValue, condition, condition_value);
        } else {
            fieldValue = data[fieldLevels[0]][fieldLevels[1]];
            validationStatus = DataValidator.validate(data[fieldLevels[0]][fieldLevels[1]], condition, condition_value);
        }
        return api.sendValidationResponse(validationStatus, field, fieldValue, condition, condition_value);
    }
}