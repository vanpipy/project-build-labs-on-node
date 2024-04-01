import fs from 'node:fs'
import os from 'node:os'
import {resolve} from 'node:path'
import tls from 'node:tls'

const options = {
    key: fs.readFileSync(resolve(__dirname, '../client.pem')),
    cert: fs.readFileSync(resolve(__dirname, '../client-cert.pem')),
    ca: fs.readFileSync(resolve(__dirname, '../server-cert.pem')),
    servername: os.hostname(),
}

const clearTextStream = tls.connect(8000, options, () => {
    const authorized = clearTextStream.authorized ? 'authorized' : 'unauthorized'
    console.log(`Connect ${authorized}`);
    process.stdin.pipe(clearTextStream)
})

clearTextStream.setEncoding('utf8')

clearTextStream.on('data', (data) => {
    console.log(data);
})
