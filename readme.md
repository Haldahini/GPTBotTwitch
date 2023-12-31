# Twitch Chatbot using TMI.js and  OpenAI GPT

This is a Twitch chatbot that uses TMI.js for Twitch chat interaction and GPT OpenAI for generating responses based on user prompts.

---
## Installation
Clone the repository:
```
git clone https://github.com/haldahini/GPTBotTwitch.git
cd GPTBotTwitch
```
Install dependencies using npm or yarn:
```
npm install
# or
yarn install
```

---
## Configuration 

Create a `.env` file based on the `.env.example` :

- `USERNAME` : Make sure to replace 'USERNAME' with your actual bot's Twitch username.
- `DEBUG` : Set to `true` for tmi.js debug
- `OAUTH_TOKEN` : Your [Twitch OAuth Token](https://dev.twitch.tv/docs/authentication/getting-tokens-oauth/#authorization-code-grant-flow).
- `OPENAI_ORG` : Your OpenAI Organization ID
- `OPENAI_SECRET_KEY` :
You need to have access to the GPT OpenAI API. Obtain an API key from OpenAI
- `BOT_PREPROMPTS` :
Enter the pre-prompt text for your robot. Its personality or whatever you want, what you expect from it.
- `BOT_RESUME_PREPROMPTS` :
Enter the pre-prompt for resuming the last conversations. That give more context for the bot.

---
## Usage

Build and run the `index.js`
```
npm run build
npm run start
```

---

## How the Bot Works

The bot listens to incoming messages in the Twitch chat and responds whenever it is mentioned using @your-bot-username. Here's how the main logic works:

    The bot listens to incoming messages from Twitch chat using TMI.js.
    When a message is received, it checks if it contains a mention to the bot's username.
    If a mention is found, it then sends the user's message as a prompt to the GPT OpenAI API, along with a system message indicating that the bot should respond to the mentioned user.
    The GPT OpenAI API generates a response based on the user's message and the system message.
    The bot receives the response from the GPT OpenAI API and sends it back to the Twitch chat as a message.

The GPT model used for generating responses is 'gpt-3.5-turbo', and the maximum number of tokens used in the response is set to 75.

Please note that the response generated by the GPT model might not always be appropriate or accurate. It's important to moderate and verify the bot's responses to ensure a positive user experience.

---
## License

This project is licensed under the MIT License - see the LICENSE file for details.
Acknowledgments

---
## Note

This README was generated by ChatGPT, feel free to do any pull-request you want.
