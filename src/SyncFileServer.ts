import fs from 'node:fs'
import http from 'node:http'

// A bad spot
http.createServer((req, res) => {
    fs.readFileSync('./file.txt')
    res.end('200')
}).listen(3000)
