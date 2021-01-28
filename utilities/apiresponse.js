/**
 * Handle and format the response according to JSEND pattern
 */
class ApiResponse {
    /**
     * 
     * @param {Request} req 
     * @param {Response} res 
     */
    constructor(req, res) {
        this.req = req;
        this.res = res;
    }

    /**
     * Send the response to the caller
     * @param {String} mesage 
     * @param {boolean} status 
     * @param {any} data 
     */
    sendJson(message, status, data) {
        let statusCode = status ? 200 : 400;
        return this.res.status(statusCode).json({ message, status: status ? "success" : "error", data });
    }

    /**
     * Send error response to the caller
     * @param {number} statusCode 
     * @param {string} message 
     */
    sendError(statusCode, message) {
        return this.res.status(statusCode).json({ message, status: "error", data: null });
    }

    /**
     * Send validation response to the caller
     * @param {boolean} isValidated 
     * @param {string} fullFieldName 
     * @param {any} fieldValue 
     * @param {string} condition 
     * @param {any} conditionValue 
     */
    sendValidationResponse(isValidated, fullFieldName, fieldValue, condition, conditionValue) {
        let data = {
            "validation": {
                "error": !isValidated,
                "field": fullFieldName,
                "field_value": fieldValue,
                "condition": condition,
                "condition_value": conditionValue
            }
        }
        let msg = `field ${fullFieldName} ${(isValidated?'successfully validated':'failed validation')}.`;
        return this.sendJson(msg, isValidated, data)
    }

}

module.exports = ApiResponse;