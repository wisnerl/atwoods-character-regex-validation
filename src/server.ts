import express from "express";
import { ToolsService } from "@optimizely-opal/opal-tools-sdk";

// Import tool definitions so they register with the ToolsService
import "./index";

const app = express();

// Parse JSON request bodies
app.use(express.json());

// Initialize the Tools service with this Express app
new ToolsService(app);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  // Render expects the process to bind to process.env.PORT
  // and keep running; simple console log for debugging.
  console.log(`Opal tools service listening on port ${port}`);
});
