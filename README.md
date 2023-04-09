# slack-chatgpt-bot

A Slack ChatGPT bot.

![](https://user-images.githubusercontent.com/117768/230710474-07b058e8-b655-414a-9a5a-b7e3d5ee283f.png)

## Getting Started

### Setup Slack App

1. [Create Slack App](https://api.slack.com/apps) from an [app manifest](https://github.com/winebarrel/slack-chatgpt-bot/blob/main/manifest.json).
1. Generate App-Level Token.
    * **Basic Information > App-Level Tokens > Generate Token and Scopes**
    * Generate token with `connections:write` scope.
    * Copy Token. (e.g. `xapp-***`)
1. Install to Workspacke.
    * **OAuth & Permissions > OAuth Tokens for Your Workspace > Install to Workspace**
    * Copy Bot User OAuth Token. (e.g. `xoxb-***`)

### Generate OpenAI API key

1. Open https://platform.openai.com/account/api-keys.
1. Click **Create new secret key**.

### Create .env

1. Copy [`.env.sample`](https://github.com/winebarrel/slack-chatgpt-bot/blob/main/.env.sample) to `.env`.
1. Update `.env`.

### Start bot

```
npm i
npm start
```

## Update system message

You can change the behavior of the bot by entering the following message:

```
@bot system (bot behavior e.g. "You are a helpful assistant.")
```

![](https://user-images.githubusercontent.com/117768/230777530-066f2627-a100-4a46-b4ed-0572b0b4bc9e.png)

