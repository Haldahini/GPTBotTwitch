import { type ChatCompletionRequestMessage, Configuration, OpenAIApi } from 'openai'

if (!process.env.OPENAI_SECRET_KEY || !process.env.OPENAI_ORG) { import('dotenv/config') }

const configuration = new Configuration({
    apiKey: process.env.OPENAI_SECRET_KEY,
    organization: process.env.OPENAI_ORG
})

const openAIApi = new OpenAIApi(configuration)

export {
    openAIApi,
    type ChatCompletionRequestMessage
}
