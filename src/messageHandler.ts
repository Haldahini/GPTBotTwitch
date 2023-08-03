import tmiClient from '@/tmiClient'
import { openAIApi } from '@/openAI'
import type { ChatUserstate } from 'tmi.js'
import { configs } from '@/helpers/config'
import { type ChatCompletionRequestMessage } from 'openai'

const usersMessages = new Map<string, ChatCompletionRequestMessage[]>()

export default (target: string, context: ChatUserstate, msg: string, self: boolean): void => {
    if (self) { return }

    const cleanMessage = msg.toLowerCase().replace(/([a-z]+) \1/g, (match, group) => group)
    const asBotMention = cleanMessage.includes(`@${configs.username}`)
    const username = context.username ?? ''

    if (!asBotMention || username === '') { return }
    const lastMessages = usersMessages.get(username) ?? []
    lastMessages.push({ role: 'user', content: cleanMessage })

    if (lastMessages.length > 6) { lastMessages.splice(0, 2) }

    (async () => {
        const chatCompletion = await openAIApi.createChatCompletion({
            model: 'gpt-3.5-turbo',
            max_tokens: 75,
            messages: [
                {
                    role: 'system',
                    name: configs.username,
                    content: `${configs.prePrompt}`
                }, ...lastMessages]
        })

        const botText = chatCompletion.data?.choices?.[0]?.message?.content

        if (botText !== undefined) {
            await tmiClient.say(target, botText)
            lastMessages.push({ role: 'system', content: botText })
            usersMessages.set(username, lastMessages)
        }
    })().catch((e) => {
        console.log(e)
    })
}
