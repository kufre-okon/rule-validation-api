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
        return this.res.status(200).json({ message, status: status ? "success" : "error", data });
    }

    /**
     * Send error response to the caller
     * @param {number} statusCode 
     * @param {string} message 
     */
    sendError(statusCode, message) {
        return this.res.status(statusCode).json({ message, status: "error", data: null });
    }


}

module.exports = ApiResponse;