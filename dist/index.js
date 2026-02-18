"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const metaValidate_1 = __importDefault(require("./routes/metaValidate"));
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3000;
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.get("/", (_, res) => {
    res.json({
        service: "Meta Title & Description Compliance Tool",
        status: "running"
    });
});
app.use("/meta-validate", metaValidate_1.default);
app.listen(PORT, () => {
    console.log(`Meta Compliance Tool running on port ${PORT}`);
});
