import * as dotenv from "dotenv";
dotenv.config();

import { App, LogLevel } from "@slack/bolt";
import { converse, AI_MODEL } from "./chat";

const app = new App({
  logLevel: process.env.LOG_LEVEL
    ? LogLevel[process.env.LOG_LEVEL as keyof typeof LogLevel]
    : LogLevel.INFO,
  socketMode: true,
  token: process.env.SLACK_BOT_TOKEN,
  appToken: process.env.SLACK_APP_TOKEN,
});

app.event("app_mention", async (message) => {
  const { event, context, say } = message;
  const text = event.text
    .replace(new RegExp(`^<@${context.botUserId}[^>]*?>`), "")
    .trim();

  if (!text) {
    return;
  }

  try {
    await converse(message, text);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (e: any) {
    const errMsg = e?.response?.data?.error?.message || e?.message || e;
    say(`😵 ${errMsg}`);
    console.log(e);
  }
});

(async () => {
  await app.start();
  console.log(`🤖 bot started (model: ${AI_MODEL})`);
})();
