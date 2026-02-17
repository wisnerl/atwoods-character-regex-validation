"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const opal_tools_sdk_1 = require("@optimizely-opal/opal-tools-sdk");
// Import tool definitions so they register with the ToolsService
require("./index");
const app = (0, express_1.default)();
// Parse JSON request bodies
app.use(express_1.default.json());
// Initialize the Tools service with this Express app
new opal_tools_sdk_1.ToolsService(app);
const port = process.env.PORT || 3000;
app.listen(port, () => {
    // Render expects the process to bind to process.env.PORT
    // and keep running; simple console log for debugging.
    console.log(`Opal tools service listening on port ${port}`);
});
