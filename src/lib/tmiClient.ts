import * as tmi from 'tmi.js'

if (!process.env.USERNAME || !process.env.OAUTH_TOKEN)
    import('dotenv/config')

export default new tmi.Client({
    options: { debug: true },
    identity: {
        username: process.env.USERNAME,
        password: process.env.OAUTH_TOKEN
    },
    channels: [
        'haldahini' // or your channel obviously
    ]
})

export type ChatUserstate = tmi.ChatUserstate
