import { type ChatCompletionRequestMessage, Configuration, OpenAIApi } from 'openai'
import * as process from 'process'

interface ChatMessage {
    resume: string
    messages: ChatCompletionRequestMessage[]
}

const configuration = new Configuration({
    apiKey: process.env.OPENAI_SECRET_KEY,
    organization: process.env.OPENAI_ORG
})

const openAIService = new OpenAIApi(configuration)

const getResumeOfLastNormalMessages = async (username: string, chatMessages: ChatMessage): Promise<string | undefined> => {
    const prePrompt: string = process.env.BOT_RESUME_PREPROMPTS

    const resume = await openAIService.createChatCompletion({
        model: 'gpt-3.5-turbo',
        messages: [
            {
                role: 'system',
                content: prePrompt
            },
            {
                role: 'user',
                content: `${chatMessages.resume.length > 0
                    ? `# Resumé precedent : ${chatMessages.resume}, `
                    : ''
                }
                # Conversation :
                ${conversationToString(username, chatMessages.messages)}`
            }
        ]
    })

    return resume.data?.choices?.[0]?.message?.content
}

const conversationToString = (username: string, messages: ChatCompletionRequestMessage[]): string =>
    messages.reduce((prevMessage, message) =>
        `${prevMessage} - ${(message.role === 'system' ? process.env.USERNAME : username)}: ${message.content ?? ''} \\n `, '')

const converseWithOpenAI = async (username: string, chatMessage: ChatMessage): Promise<string | undefined> => {
    const chatCompletion = await openAIService.createChatCompletion({
        model: 'gpt-3.5-turbo',
        max_tokens: 75,
        messages: [
            {
                role: 'system',
                name: process.env.USERNAME,
                content: `${process.env.BOT_PREPROMPTS}, - Tu parles avec ${username}.\\n ${getResumeMessage(chatMessage)}`
            }, ...chatMessage.messages
        ]
    })

    return chatCompletion.data?.choices?.[0]?.message?.content
}

const getResumeMessage = (messages: ChatMessage): string => (messages.resume.length > 0)
    ? `- Voici le resumer de ta conversation precedente : ${messages.resume}`
    : ''

export {
    openAIService,
    converseWithOpenAI,
    getResumeOfLastNormalMessages,
    type ChatMessage
}
