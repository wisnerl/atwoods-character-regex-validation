"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const opal_tools_sdk_1 = require("@optimizely-opal/opal-tools-sdk");
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3000;
const TITLE_LIMIT = 60;
const DESCRIPTION_LIMIT = 160;
app.use(express_1.default.json());
const toolsService = new opal_tools_sdk_1.ToolsService(app);
(0, opal_tools_sdk_1.tool)({
    name: "Meta Title & Description Compliance Tool",
    description: "Checks if meta titles and descriptions comply with SEO best practices.",
})(processMeta);
function smartTrim(text, limit) {
    if (text.length <= limit) {
        return { value: text, modified: false };
    }
    const truncated = text.slice(0, limit);
    // Try to cut at last sentence-ending punctuation
    const lastSentenceMatch = truncated.match(/.*[.!?](?=\s|$)/);
    if (lastSentenceMatch) {
        return { value: lastSentenceMatch[0].trim(), modified: true };
    }
    // Fallback: cut at last full word
    const lastSpaceIndex = truncated.lastIndexOf(" ");
    if (lastSpaceIndex > 0) {
        return {
            value: truncated.slice(0, lastSpaceIndex).trim(),
            modified: true
        };
    }
    // Final fallback: hard cut
    return { value: truncated.trim(), modified: true };
}
function processMeta(title, description) {
    const processedTitle = smartTrim(title, TITLE_LIMIT);
    const processedDescription = smartTrim(description, DESCRIPTION_LIMIT);
    const titleLength = processedTitle.value.length;
    const descriptionLength = processedDescription.value.length;
    const isCompliant = titleLength <= TITLE_LIMIT &&
        descriptionLength <= DESCRIPTION_LIMIT;
    return {
        title: processedTitle.value,
        description: processedDescription.value,
        titleLength,
        descriptionLength,
        titleModified: processedTitle.modified,
        descriptionModified: processedDescription.modified,
        isCompliant
    };
}
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`Discovery endpoint: http://localhost:${PORT}/discovery`);
});
