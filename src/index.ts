import express from "express";
import cors from "cors";
import metaValidateRoute from "./routes/metaValidate";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get("/", (_, res) => {
  res.json({
    service: "Meta Title & Description Compliance Tool",
    status: "running"
  });
});

app.use("/meta-validate", metaValidateRoute);

app.get("/discovery", (_req, res) => {
  res.json({
    functions: [
      {
        name: "meta_validate",
        description:
          "Validate and normalize an SEO title (<=60 chars) and description (<=160 chars), trimming description at the last period.",
        endpoint: "/meta-validate",
        http_method: "POST",
        parameters: [
          {
            name: "title",
            description: "Proposed SEO title.",
            required: true,
            type: "string",
          },
          {
            name: "description",
            description: "Proposed SEO meta description.",
            required: true,
            type: "string",
          },
        ],
      },
    ],
  });
});

app.listen(PORT, () => {
  console.log(`Meta Compliance Tool running on port ${PORT}`);
});
