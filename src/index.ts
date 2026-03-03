import express from "express";
import { ToolsService, tool, ParameterType } from "@optimizely-opal/opal-tools-sdk";

const app = express();
const PORT = process.env.PORT || 3000;
const TITLE_LIMIT = 60;
const DESCRIPTION_LIMIT = 160;
app.use(express.json());

const toolsService = new ToolsService(app);

interface MetaInput {
  title: string;
  description: string;
}

function smartTrim(text: string, limit: number): { value: string; modified: boolean } {
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

export function processMeta(parameters: MetaInput) {
  const processedTitle = smartTrim(parameters.title, TITLE_LIMIT);
  const processedDescription = smartTrim(parameters.description, DESCRIPTION_LIMIT);
  console.log(`Old Title: "${parameters.title}" (${parameters.title?.length} chars)`);
  console.log(`Old Description: "${parameters.description}" (${parameters.description?.length} chars)`);
  console.log(`Processed Title: "${processedTitle.value}" (${processedTitle.value?.length} chars)`);
  console.log(`Processed Description: "${processedDescription.value}" (${processedDescription.value?.length} chars)`);

  const titleLength = processedTitle.value?.length;
  const descriptionLength = processedDescription.value?.length;

  const isCompliant =
    titleLength <= TITLE_LIMIT &&
    descriptionLength <= DESCRIPTION_LIMIT;

  if (!isCompliant) {
    console.warn("Meta compliance issues detected:");
  }

  let result = {
    title: processedTitle.value,
    description: processedDescription.value,
  }

  return result;
}

tool({
  name: "atwoods_meta_compliance_checker",
  description: "Checks if meta titles and descriptions comply with SEO best practices.",
  parameters: [
    {
      name: "title",
      type: ParameterType.String,
      description: "Meta title (max ~60 chars)",
      required: true,
    },
    {
      name: "description",
      type: ParameterType.String,
      description: "Meta description (max ~160 chars)",
      required: true,
    },
  ],
})(processMeta);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Discovery endpoint: http://localhost:${PORT}/discovery`);
});
