import { Router } from "express";
import { z } from "zod";
import { processMeta } from "../utils/metaProcessor";

const router = Router();

const metaSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1)
});

router.post("/", (req, res) => {
  const parsed = metaSchema.safeParse(req.body);

  if (!parsed.success) {
    return res.status(400).json({
      error: "Invalid request",
      details: parsed.error.format()
    });
  }

  const result = processMeta(
    parsed.data.title,
    parsed.data.description
  );

  res.json(result);
});

export default router;
