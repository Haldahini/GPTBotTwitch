import { type ChatCompletionRequestMessage, Configuration, OpenAIApi } from 'openai'
import * as process from "process";

type ChatMessage = {
    resume: string
    messages: ChatCompletionRequestMessage[]
}

const configuration = new Configuration({
    apiKey: process.env.OPENAI_SECRET_KEY,
    organization: process.env.OPENAI_ORG
})

const openAIService = new OpenAIApi(configuration)

const getResumeOfLastNormalMessages = async (username: string, chatMessages: ChatMessage) => {
    const resume = await openAIService.createCompletion({
        model: 'gpt-3.5-turbo',
        max_tokens: 75,
        prompt: `En tant que ${process.env.USERNAME}, resume de la conversation suivante en un maximum de 500 caracteres.
        ${chatMessages.resume.length > 0 ? `- Resumer precedemt : ${chatMessages.resume}, `: ``} - Conversation :
        ${conversationToString(username, chatMessages.messages)}`
    })

    return resume.data?.choices?.[0]?.text
}

const conversationToString = (username: string, messages: ChatCompletionRequestMessage[]) =>
    messages.reduce((prevMessage, message) =>
            prevMessage + `> ${(message.role === 'system' ? process.env.USERNAME : username)}: ${message.content} ;`, '')


const converseWithOpenAI = async (username: string, chatMessage: ChatMessage) => {
    const chatCompletion = await openAIService.createChatCompletion({
        model: 'gpt-3.5-turbo',
        max_tokens: 75,
        messages: [
            {
                role: 'system',
                name: process.env.USERNAME,
                content: `
                    ${process.env.BOT_PREPROMPTS}, 
                    - Tu parle avec ${username}.
                    ${getResumeMessage(chatMessage)}
                `
            }, ...chatMessage.messages
        ]
    })

    return chatCompletion.data?.choices?.[0]?.message?.content
}

const getResumeMessage = (messages: ChatMessage) => (messages.resume.length > 0)
    ? `- Voici le resumer de ta conversation : ${messages.resume}`
    : ''

export {
    openAIService,
    converseWithOpenAI,
    getResumeOfLastNormalMessages,
    type ChatMessage
}
