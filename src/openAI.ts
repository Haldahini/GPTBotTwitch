import { configs } from '@/helpers/config'
import { Configuration, OpenAIApi } from 'openai'

const configuration = new Configuration({
    apiKey: configs.openAISecret,
    organization: configs.openAIOrg
})

export const openAIApi = new OpenAIApi(configuration)
