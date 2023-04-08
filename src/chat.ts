import { AllMiddlewareArgs, SlackEventMiddlewareArgs } from "@slack/bolt";
import { Configuration, OpenAIApi, ChatCompletionRequestMessage } from "openai";

export type Message = SlackEventMiddlewareArgs<"app_mention"> &
  AllMiddlewareArgs;

const openai = new OpenAIApi(
  new Configuration({ apiKey: process.env.OPENAI_API_KEY })
);

const AI_MODEL = "gpt-3.5-turbo";

async function retrieveThread(
  { client, event, context }: Message,
  conversations: ChatCompletionRequestMessage[]
) {
  const ms = await client.conversations
    .replies({
      channel: event.channel,
      ts: event.thread_ts!, // eslint-disable-line @typescript-eslint/no-non-null-assertion
    })
    .then((res) => res.messages || []);

  for (const m of ms) {
    const text = m.text?.trim();

    if (!text) {
      continue;
    }

    if (m.bot_id == context.botId) {
      conversations.push({
        role: "assistant",
        content: text,
      });
    } else {
      const md = text.match(/^<@${context.botUserId}[^>]*?>[\s\n]+(.+)/is);

      if (md) {
        conversations.push({
          role: "user",
          content: md[1],
        });
      }
    }
  }
}

export async function converse(message: Message, text: string) {
  const { say, event } = message;
  const conversations: ChatCompletionRequestMessage[] = [];

  if (event.thread_ts) {
    await retrieveThread(message, conversations);
  }

  conversations.push({
    role: "user",
    content: text,
  });

  const res = await openai.createChatCompletion({
    model: AI_MODEL,
    messages: conversations,
  });

  const aiMsg = res.data.choices[0].message;
  const reply = aiMsg?.content.trim() || "😵‍💫";

  say({
    text: reply,
    channel: event.channel,
    thread_ts: event.ts,
    reply_broadcast: conversations.length < 2,
  });
}
