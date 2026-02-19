import express from "express";
import { ToolsService, tool, ParameterType } from '@optimizely-opal/opal-tools-sdk';

const app = express();
const PORT = process.env.PORT || 3000;
const TITLE_LIMIT = 60;
const DESCRIPTION_LIMIT = 160;
app.use(express.json());

const toolsService = new ToolsService(app);

tool({
  name: "Meta Title & Description Compliance Tool",
  description: "Checks if meta titles and descriptions comply with SEO best practices.",
})(processMeta);

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

function processMeta(title: string, description: string) {
  const processedTitle = smartTrim(title, TITLE_LIMIT);
  const processedDescription = smartTrim(description, DESCRIPTION_LIMIT);

  const titleLength = processedTitle.value.length;
  const descriptionLength = processedDescription.value.length;

  const isCompliant =
    titleLength <= TITLE_LIMIT &&
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
