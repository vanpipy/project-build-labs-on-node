import http from 'node:http'
import https from 'node:https'
import url from 'node:url'

class Request {
    maxRedirects = 10
    redirects = 0
    error!: Error

    get(href: string, callback: (err: Error, res: http.IncomingMessage) => void) {
        const uri = url.parse(href)
        const { host, path } = uri
        const options = { host, path }
        const httpGet = uri.protocol === 'http:' ? http.get : https.get
        console.log('GET: ', href);
        httpGet(options, (response) => {
            const { statusCode = 200 } = response
            console.log(`Response ${host} with code ${statusCode}`);
            if (statusCode >= 300 && statusCode < 400) {
                if (this.redirects >= this.maxRedirects) {
                    this.error = new Error(`Too many redirects for: ${href}`)
                } else {
                    this.redirects += 1
                    href = url.resolve(host as string, response.headers.location as string)
                    return this.get(href, callback)
                }
            }
            response.url = href
            response.headers['REDIRECTS'] = String(this.redirects)
            response.on('data', (data) => {
                console.log(`Got data, length ${data.length}`);
            })
            response.on('end', () => {
                console.log('Connection ended');
                callback(this.error, response)
            })
        })
    }
}

const req = new Request()
req.get('https://bing.com/', (err, res) => {
    if (err) {
        console.error(err);
    } else {
        console.log(`Fetch URL: ${res.url} with ${res.headers['REDIRECTS']} redirects`);
        process.exit(0)
    }
})
