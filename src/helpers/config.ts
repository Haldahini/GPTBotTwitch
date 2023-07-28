import 'dotenv/config'

export const configs = {
    username: process.env.USERNAME ?? '',
    oauthToken: process.env.OAUTH_TOKEN ?? '',
    openAISecret: process.env.OPENAI_SECRET_KEY ?? '',
    openAIOrg: process.env.OPENAI_ORG ?? '',
    prePrompt: process.env.BOT_PREPROMPTS ?? ''
}
