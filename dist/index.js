"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.normalizeSeoMeta = void 0;
const opal_tools_sdk_1 = require("@optimizely-opal/opal-tools-sdk");
const v4_1 = require("zod/v4");
// Tool to validate and normalize SEO title & description lengths
exports.normalizeSeoMeta = (0, opal_tools_sdk_1.registerTool)("normalizeSeoMeta", {
    description: "Validate and trim an SEO title (<=60 chars) and description (<=160 chars), cutting the description at the last period when needed.",
    inputSchema: {
        title: v4_1.z.string().describe("Proposed SEO title."),
        description: v4_1.z.string().describe("Proposed SEO meta description generated from page content."),
    },
}, async ({ title, description }) => {
    const MAX_TITLE = 60;
    const MAX_DESCRIPTION = 160;
    // Regex-based length validation
    const titleRegex = new RegExp(`^.{0,${MAX_TITLE}}$`, "s");
    const descriptionRegex = new RegExp(`^.{0,${MAX_DESCRIPTION}}$`, "s");
    let normalizedTitle = title;
    if (!titleRegex.test(title)) {
        // Simple hard cutoff for title; no sentence logic needed
        normalizedTitle = title.slice(0, MAX_TITLE).trim();
    }
    let normalizedDescription = description;
    if (!descriptionRegex.test(description)) {
        normalizedDescription = truncateAtLastPeriod(description, MAX_DESCRIPTION);
        // Fallback to hard cutoff if still too long
        if (!descriptionRegex.test(normalizedDescription)) {
            normalizedDescription = normalizedDescription
                .slice(0, MAX_DESCRIPTION)
                .trim();
        }
    }
    return {
        title: normalizedTitle,
        description: normalizedDescription,
    };
});
function truncateAtLastPeriod(text, maxLength) {
    if (text.length <= maxLength)
        return text;
    const truncated = text.slice(0, maxLength);
    const lastPeriodIndex = truncated.lastIndexOf(".");
    if (lastPeriodIndex > 0) {
        return truncated.slice(0, lastPeriodIndex + 1).trim();
    }
    // If there's no period before the limit, just hard-cut
    return truncated.trim();
}
