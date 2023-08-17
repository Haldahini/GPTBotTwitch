import tmiClient, {type ChatUserstate} from '@/lib/tmiClient'
import {type ChatMessage, converseWithOpenAI, getResumeOfLastNormalMessages} from '@/lib/openAIService'

const usersMessages = new Map<string, ChatMessage>()

export default (target: string, context: ChatUserstate, msg: string, self: boolean): void => {
    if (self) { return }

    const cleanMessage = msg.toLowerCase().replace(/([a-z]+) \1/g, (match, group) => group)
    const asBotMention = cleanMessage.includes(`@${process.env.USERNAME}`)
    const username = context.username ?? ''

    if (!asBotMention || username === '') { return }

    (async () => {

        const lastMessages = usersMessages.get(username) ?? { resume: '', messages: [] }

        // keep only 4 last messages (2 of user messages and 2 bot answers) or get the resume
        if (lastMessages.messages.length > 6) {
            const resume = await getResumeOfLastNormalMessages(username, lastMessages)
            if (resume !== undefined) {
                lastMessages.resume = resume
                lastMessages.messages.splice(0, 6)
            }
        }

        lastMessages.messages.push({ role: 'user', content: cleanMessage })

        const botText = await converseWithOpenAI(username, lastMessages)

        if (botText !== undefined) {
            await tmiClient.say(target, botText)
            lastMessages.messages.push({ role: 'system', content: botText })
            usersMessages.set(username, lastMessages)
        }
    })().catch((e) => {
        console.log(e)
    })
}
