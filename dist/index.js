"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
const MAX_TITLE = 60;
const MAX_DESCRIPTION = 160;
// Discovery endpoint
app.get("/.well-known/opal-tools.json", (req, res) => {
    res.json({
        tools: [
            {
                name: "normalizeSeoMeta",
                description: "Validate and trim an SEO title (<=60 chars) and description (<=160 chars).",
                input_schema: {
                    type: "object",
                    properties: {
                        title: { type: "string" },
                        description: { type: "string" }
                    },
                    required: ["title", "description"]
                }
            }
        ]
    });
});
// Tool execution endpoint
app.post("/tools/normalizeSeoMeta", (req, res) => {
    const { title, description } = req.body;
    const normalizedTitle = title.slice(0, MAX_TITLE).trim();
    const normalizedDescription = description.slice(0, MAX_DESCRIPTION).trim();
    res.json({
        title: normalizedTitle,
        description: normalizedDescription
    });
});
// Health check (optional but helpful)
app.get("/", (req, res) => {
    res.json({ status: "SEO tool server running" });
});
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
