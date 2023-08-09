import { type ChatCompletionRequestMessage, Configuration, OpenAIApi } from 'openai'

const configuration = new Configuration({
    apiKey: process.env.OPENAI_SECRET_KEY,
    organization: process.env.OPENAI_ORG
})

const openAIService = new OpenAIApi(configuration)

export {
    openAIService,
    type ChatCompletionRequestMessage
}
