import * as tmi from 'tmi.js'
import * as process from "process";

export default new tmi.Client({
    options: { debug: process.env.DEBUG === 'true' },
    identity: {
        username: process.env.USERNAME,
        password: process.env.OAUTH_TOKEN
    },
    channels: [
        'haldahini' // or your channel obviously
    ]
})

export type ChatUserstate = tmi.ChatUserstate
