import { Configuration, OpenAIApi } from 'openai'
import { configs } from '@/helpers/config'

if (!process.env.OPENAI_SECRET_KEY || !process.env.OPENAI_ORG)
    import('dotenv/config')

const configuration = new Configuration({
    apiKey: process.env.OPENAI_SECRET_KEY,
    organization: process.env.OPENAI_ORG
})

export const openAIService = new OpenAIApi(configuration)
