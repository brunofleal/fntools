const fs = require("fs");
const path = require("path");

// Create logs directory if it doesn't exist
const logsDir = path.join(__dirname, "..", "logs");
if (!fs.existsSync(logsDir)) {
    fs.mkdirSync(logsDir, { recursive: true });
}

// Helper function to write to log file
const writeToLog = (message, writeToConsole) => {
    const logFile = path.join(
        logsDir,
        `error-${new Date().toISOString().split("T")[0]}.log`
    );
    const timestamp = new Date().toISOString();
    const logMessage = `[${timestamp}] ${message}\n`;

    fs.appendFileSync(logFile, logMessage, "utf8");
    if (writeToConsole) {
        console.error(message);
    }
};

const errorHandler = (err, req, res, next) => {
    writeToLog("=== ERROR OCCURRED ===", true);
    writeToLog("Timestamp: " + new Date().toISOString(), true);
    writeToLog("Request: " + req.method + " " + req.path, true);
    writeToLog("Query params: " + JSON.stringify(req.query, null, 2));
    writeToLog("Request body: " + JSON.stringify(req.body, null, 2));
    writeToLog("Error name: " + err.name, true);
    writeToLog("Error message: " + err.message, true);

    let statusCode = 500;
    let errorMessage = "Internal server error";
    let errorDetails = {};

    // Handle different types of errors
    if (err.name === "ValidationError") {
        writeToLog("=== MONGOOSE VALIDATION ERROR ===");
        statusCode = 400;
        errorMessage = "Validation failed";

        const validationErrors = {};
        Object.keys(err.errors).forEach((key) => {
            validationErrors[key] = err.errors[key].message;
            writeToLog(`  Field '${key}': ${err.errors[key].message}`);
            writeToLog(`  Value: ${JSON.stringify(err.errors[key].value)}`);
            writeToLog(`  Path: ${err.errors[key].path}`);
        });
        errorDetails = { validationErrors };
    } else if (err.code === 11000) {
        writeToLog("=== DUPLICATE KEY ERROR ===");
        statusCode = 400;
        errorMessage = "Duplicate entry found";

        const duplicateField = Object.keys(err.keyPattern || {})[0];
        const duplicateValue = err.keyValue
            ? err.keyValue[duplicateField]
            : "unknown";

        writeToLog("Duplicate field: " + duplicateField);
        writeToLog("Duplicate value: " + duplicateValue);
        writeToLog("Key pattern: " + JSON.stringify(err.keyPattern));

        errorDetails = {
            field: duplicateField,
            value: duplicateValue,
            message: `${duplicateField} '${duplicateValue}' already exists`,
        };
    } else if (err.name === "CastError") {
        writeToLog("=== CAST ERROR (Invalid ID/Type) ===");
        statusCode = 400;
        errorMessage = "Invalid data format";

        writeToLog("Cast error path: " + err.path);
        writeToLog("Cast error value: " + err.value);
        writeToLog("Cast error kind: " + err.kind);

        errorDetails = {
            field: err.path,
            value: err.value,
            expectedType: err.kind,
            message: `Invalid ${err.kind} format for field '${err.path}'`,
        };
    } else if (err.name === "MongoServerError" || err.name === "MongoError") {
        writeToLog("=== MONGODB SERVER ERROR ===");
        writeToLog("MongoDB error code: " + err.code);
        writeToLog("MongoDB error codeName: " + err.codeName);
        statusCode = 400;
        errorMessage = "Validation failed";

        const validationErrors = {};
        Object.keys(err.errors).forEach((key) => {
            validationErrors[key] = err.errors[key].message;
            console.error(`  Field '${key}': ${err.errors[key].message}`);
            console.error(`  Value: ${JSON.stringify(err.errors[key].value)}`);
            console.error(`  Path: ${err.errors[key].path}`);
        });
        errorDetails = { validationErrors };
    } else if (err.code === 11000) {
        console.error("=== DUPLICATE KEY ERROR ===");
        statusCode = 400;
        errorMessage = "Duplicate entry found";

        const duplicateField = Object.keys(err.keyPattern || {})[0];
        const duplicateValue = err.keyValue
            ? err.keyValue[duplicateField]
            : "unknown";

        console.error("Duplicate field:", duplicateField);
        console.error("Duplicate value:", duplicateValue);
        console.error("Key pattern:", err.keyPattern);

        errorDetails = {
            field: duplicateField,
            value: duplicateValue,
            message: `${duplicateField} '${duplicateValue}' already exists`,
        };
    } else if (err.name === "CastError") {
        console.error("=== CAST ERROR (Invalid ID/Type) ===");
        statusCode = 400;
        errorMessage = "Invalid data format";

        console.error("Cast error path:", err.path);
        console.error("Cast error value:", err.value);
        console.error("Cast error kind:", err.kind);

        errorDetails = {
            field: err.path,
            value: err.value,
            expectedType: err.kind,
            message: `Invalid ${err.kind} format for field '${err.path}'`,
        };
    } else if (err.name === "MongoServerError" || err.name === "MongoError") {
        console.error("=== MONGODB SERVER ERROR ===");
        console.error("MongoDB error code:", err.code);
        console.error("MongoDB error codeName:", err.codeName);

        // Handle specific MongoDB error codes
        switch (err.code) {
            case 2:
                statusCode = 400;
                errorMessage = "Invalid data format (BadValue)";
                writeToLog("BadValue error - check data types in request");
                writeToLog("Error details: " + (err.errmsg || err.message));
                errorDetails = {
                    mongoCode: err.code,
                    mongoCodeName: err.codeName,
                    message: "Invalid data type or format provided",
                    hint: "Check that all fields match expected data types",
                };
                break;

            case 121:
                statusCode = 400;
                errorMessage = "Document validation failed";
                errorDetails = {
                    mongoCode: err.code,
                    message: "Document does not match schema validation rules",
                };
                break;

            default:
                statusCode = 500;
                errorMessage = "Database operation failed";
                errorDetails = {
                    mongoCode: err.code,
                    mongoCodeName: err.codeName,
                };
        }
    } else if (err.name === "JsonWebTokenError") {
        writeToLog("=== JWT ERROR ===");
        statusCode = 401;
        errorMessage = "Invalid authentication token";
    } else if (err.status) {
        statusCode = err.status;
        errorMessage = err.message;
    }

    // Log the full error stack in development
    if (process.env.NODE_ENV === "development") {
        writeToLog("Error stack: " + err.stack);
        writeToLog("Full error object: " + JSON.stringify(err, null, 2));
    }

    writeToLog("=== END ERROR ===");

    // Send response
    const response = {
        success: false,
        message: errorMessage,
        ...(Object.keys(errorDetails).length > 0 && { details: errorDetails }),
    };

    // Include full error in development
    if (process.env.NODE_ENV === "development") {
        response.debug = {
            name: err.name,
            message: err.message,
            stack: err.stack,
        };
    }

    return res.status(statusCode).json(response);
};

module.exports = errorHandler;
