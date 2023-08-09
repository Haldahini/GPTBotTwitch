import { Configuration, OpenAIApi } from 'openai'
import { configs } from '@/helpers/config'

const configuration = new Configuration({
    apiKey: configs.openAISecret,
    organization: configs.openAIOrg
})

export const openAIService = new OpenAIApi(configuration)
