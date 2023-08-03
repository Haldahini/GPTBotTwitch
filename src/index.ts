import 'dotenv/config'
import tmiClient from '@/tmiClient'
import messageHandler from '@/messageHandler'

async function main() {
    try {
        await tmiClient.connect()
        tmiClient.on('message', messageHandler)
    } catch (error) {
        console.log(error)
    }
}

main()
