import express from "express";
import metaValidateRoute from "./routes/metaValidate";
import { ToolsService, tool, ParameterType } from '@optimizely-opal/opal-tools-sdk';

const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.json());

const toolsService = new ToolsService(app);

tool({
  name: "Meta Title & Description Compliance Tool",
  description: "Checks if meta titles and descriptions comply with SEO best practices.",
})(metaValidateRoute);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Discovery endpoint: http://localhost:${PORT}/discovery`);
});
