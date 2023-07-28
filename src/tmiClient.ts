import * as tmi from 'tmi.js'
import { configs } from '@/helpers/config'

export default new tmi.Client({
    options: { debug: true },
    identity: {
        username: configs.username,
        password: configs.oauthToken
    },
    channels: [
        'haldahini' // or your channel obviously
    ]
})
