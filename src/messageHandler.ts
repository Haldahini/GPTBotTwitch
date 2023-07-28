import tmiClient from '@/tmiClient'
import { openAIApi } from '@/openAI'
import type { ChatUserstate } from 'tmi.js'
import { configs } from '@/helpers/config'

export default (target: string, context: ChatUserstate, msg: string, self: boolean): void => {
    if (self) { return }
    const asBotMention = msg.toLowerCase().includes(`@${configs.username}`)
    const username = context.username ?? ''
    if (!asBotMention || username === '') { return }

    (async () => {
        const chatCompletion = await openAIApi.createChatCompletion({
            model: 'gpt-3.5-turbo',
            max_tokens: 75,
            messages: [
                {
                    role: 'system',
                    content: `${configs.prePrompt} Tu dois repondre à : @${username}`
                },
                { role: 'user', content: msg }
            ]
        })

        const botText = chatCompletion.data?.choices?.[0]?.message?.content

        if (botText !== undefined) {
            await tmiClient.say(target, botText)
        }
    })().catch((e) => {
        console.log(e)
    })
}
