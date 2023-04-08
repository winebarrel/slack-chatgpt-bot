# slack-chatgpt-bot

A Slack ChatGPT bot.

## Getting Started

### Setup Slack App

1. [Create Slack App](https://api.slack.com/apps] from an [app manifest](https://github.com/winebarrel/slack-chatgpt-bot/blob/main/manifest.json).
1. Generate App-Level Token.
    * **Information > App-Level Tokens > Generate Token and Scopes**
    * Generate token with `connections:write` scope.
    * Copy Token. (e.g. `xapp-***`)
1. Install to Workspacke.
    * **OAuth & Permissions > OAuth Tokens for Your Workspace > Install to Workspace**
    * Copy Bot User OAuth Token. (e.g. `xoxb-***`)

### Generate OpenAI API key

1. Open https://platform.openai.com/account/api-keys.
1. Click **Create new secret key**.
