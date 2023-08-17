import 'dotenv/config'
import tmiClient from './lib/tmiClient'
import messageHandler from './messageHandler'

tmiClient
    .connect()
    .then(() => {
        tmiClient.on('message', messageHandler)
    })
    .catch((e) => {
        console.log(e)
    })
