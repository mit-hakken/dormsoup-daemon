import fetchEmailsAndExtractEvents from "./emailToEvents.js";
import addTagsToEvents from "./eventToTags.js";
import { loadEmbeddings } from "./vectordb.js";

export default async function main() {
  await loadEmbeddings();

  while (true) {
    const lookbackDays = 30;
    console.log(`[${new Date().toISOString()}] Start pulling and parsing emails:`);
    const oldLog = console.log;
    console.log = (...args) => oldLog("  ", ...args);
    await fetchEmailsAndExtractEvents(lookbackDays);
    await addTagsToEvents(lookbackDays);
    console.log = oldLog;
    await new Promise((resolve) => setTimeout(resolve, 1000 * 60));
  }
}

await main();
