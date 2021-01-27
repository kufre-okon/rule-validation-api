const express = require('express');
const ApiResponse = require('./utilities/apiresponse.js');
const { helper } = require("./utilities/helper.js");

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

app.post('/validate-rule', (req, res) => {
    const { rule, data } = {...req.body };
    if (rule === undefined)
        return new ApiResponse(req, res).sendError(400, "rule is required.");
    if (data === undefined)
        return new ApiResponse(req, res).sendError(400, "data is required.");

    if (!(Array.isArray(data) || helper.isValidJson(data) || helper.isString(data)))
        return new ApiResponse(req, res).sendError(400, "data should be an array or json or string.");
    if (!helper.isObject(rule))
        return new ApiResponse(req, res).sendError(400, "rule should be an object.");

    const { field, condition, condition_value } = {...rule };
    // validate rule fields
    if (field === undefined)
        return new ApiResponse(req, res).sendError(400, "field is required.");
    if (condition === undefined)
        return new ApiResponse(req, res).sendError(400, "condition is required.");
    if (condition_value === undefined)
        return new ApiResponse(req, res).sendError(400, "condition_value is required.");

    // get rule.field nesting objects


    return res.status(200).json("testing");
})

// catch all
app.get('*', (req, res) => {
    new ApiResponse(req, res).sendJson("My Rule-Validation API", true, {
        "name": "Kufre Effiong Okon",
        "github": "@kufre-okon",
        "email": "kufreeffiong34@gmail.com",
        "mobile": "07065657658",
        "twitter": "@kufreokon24"
    })
})

// error handler
app.use((err, req, res, next) => {
    console.log(req);
    return new ApiResponse(req, res).sendError(500, `Server Error!!!`);
})

app.listen(port, () => {
    console.info(`Server started on Port:${port}". \nTo terminate use Ctrl + c`);
});