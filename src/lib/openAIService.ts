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
    const prePromp: string = `#init \n - Tu dois résumer la conversation que te donne l'utilisateur en un maximum de 500 caracteres.\n - L'utilisateur peux aussi mettre un resumer precedent et tu dois l'integrer au resumer.\n - Tu dois garder les informations importantes qui peuvent permettre d'identifier l'utilisateur.\n #rules\n - Tu ne dois écrire que le résumé de la conversation que te passe l'utilisateur.\n`

    const resume = await openAIService.createChatCompletion({
        model: 'gpt-3.5-turbo',
        messages: [
            {
                role: "system",
                content: prePromp
            },
            {
                role: "user",
                content: `${chatMessages.resume.length > 0
                    ? `# Resumé precedemt : ${chatMessages.resume}, `
                    : ``
                }
                # Conversation :
                ${conversationToString(username, chatMessages.messages)}`
            }
        ]
    })

    return resume.data?.choices?.[0]?.message?.content
}

const conversationToString = (username: string, messages: ChatCompletionRequestMessage[]) =>
    messages.reduce((prevMessage, message) =>
            prevMessage + `- ${(message.role === 'system' ? process.env.USERNAME : username)}: ${message.content} \\n `, '')

const converseWithOpenAI = async (username: string, chatMessage: ChatMessage) => {
    const chatCompletion = await openAIService.createChatCompletion({
        model: 'gpt-3.5-turbo',
        max_tokens: 75,
        messages: [
            {
                role: 'system',
                name: process.env.USERNAME,
                content: `${process.env.BOT_PREPROMPTS}, - Tu parle avec ${username}.\\n ${getResumeMessage(chatMessage)}`
            }, ...chatMessage.messages
        ]
    })

    return chatCompletion.data?.choices?.[0]?.message?.content
}

const getResumeMessage = (messages: ChatMessage) => (messages.resume.length > 0)
    ? `- Voici le resumer de ta conversation precedente : ${messages.resume}`
    : ''

export {
    openAIService,
    converseWithOpenAI,
    getResumeOfLastNormalMessages,
    type ChatMessage
}
