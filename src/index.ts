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

app.listen(PORT, () => {
  console.log(`Meta Compliance Tool running on port ${PORT}`);
});
