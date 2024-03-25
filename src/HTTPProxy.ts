import http from 'node:http'
import url from 'node:url'

http.createServer((req, res) => {
    console.log('Starting request', req.url);
    const uri = url.parse(req.url as string)
    const options = { ...uri, headers: req.headers }
    const proxyRequest = http.request(options, (proxyResponse) => {
        proxyResponse.on('data', (data) => {
            console.log(`ProxyReponse length: ${data.length}`);
            res.write(data, 'binary')
        })
        proxyResponse.on('end', () => {
            console.log('Proxied request ended');
            res.end()
        })
        const { statusCode = 200, headers } = proxyResponse
        res.writeHead(statusCode, headers)
    })
    req.on('data', (chunk) => {
        console.log(`In request with ${chunk.length}`);
        proxyRequest.write(chunk, 'binary')
    })
    req.on('end', () => {
        console.log('Original request ended');
        proxyRequest.end()
    })
}).listen(8080, () => {
    console.log('Proxy server is listening at 8080');
})
