import http from 'node:http'
import fs from 'node:fs'
import zlib from 'node:zlib'

http.createServer((req, res) => {
    const { url } = req
    if (url === '/') {
        res.writeHead(200, { 'Content-Encoding': 'gzip', 'Content-Type': 'text/plain' })
        fs.createReadStream(__dirname + '/StreamHttpServer.ts')
            .pipe(zlib.createGzip())
            .pipe(res)
    }
    if (url === '/error') {
        const notFoundStream = fs.createReadStream('not-found')
        notFoundStream.on('error', (error) => {
            console.trace(error);
            console.error('Stack: ', error.stack);
            console.error('The error raised was: ', error);
        })
    }
}).listen(8080)
