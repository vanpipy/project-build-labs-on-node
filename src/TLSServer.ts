import fs from 'node:fs'
import {resolve} from 'node:path'
import tls from 'node:tls'

const options = {
    key: fs.readFileSync(resolve(__dirname, '../server.pem')),
    cert: fs.readFileSync(resolve(__dirname, '../server-cert.pem')),
    ca: fs.readFileSync(resolve(__dirname, '../client-cert.pem')),
    requestCert: true,
}

const server = tls.createServer(options, (clearTextStream) => {
    const authorized = clearTextStream.authorized ? 'authorized' : 'unauthorized'
    console.log(`Connect ${authorized}`);
    clearTextStream.write('Welcome!\n')
    clearTextStream.setEncoding('utf8')
    clearTextStream.pipe(clearTextStream)
})

server.listen(8000, () => {
    console.log('Server is listening at 8000');
})
