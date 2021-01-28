/*************************************************************************************
 * GENERAL ASSUMPTIONS *
 * 
 * Since it was not explicitly stated, I assumed string validations are case sentitive.
 * Also strict equality is assumed i.e. "0" !== 0
 * 
 */

const express = require('express');
const ApiResponse = require('./utilities/apiresponse.js');
const controller = require("./controllers/home.controller.js");
const { ApplicationError } = require("./utilities/custome-error.js");

const app = express();
const port = process.env.PORT || 5000;

app.use((req, res, next) => {
    express.json({
        verify: (req, res, buffer) => {
            req.rawBody = buffer.toString();
        }
    })(req, res, (err) => {
        if (err) {
            console.log(err);
            new ApiResponse(req, res).sendError(400, "Invalid JSON payload passed.")
        }
        next();
    })
});

app.use(express.urlencoded({
    extended: true
}));

app.post('/validate-rule', controller.validateData)

// catch all
app.get('*', controller.home)

// error handler
app.use((err, req, res, next) => {
    if (err instanceof ApplicationError)
        return new ApiResponse(req, res).sendError(400, err.message);
    console.log(err);
    return new ApiResponse(req, res).sendError(500, `An error occurred while processing your request. !!!`);
})

// Capture all 404 errors
app.use((req, res, next) => {
    new ApiResponse(req, res).sendError(404, 'Unable to find the requested resource!');
});

app.listen(port, () => {
    console.info(`Server started on Port:${port}". \nTo terminate use Ctrl + c`);
});

// for testing
module.exports = app;