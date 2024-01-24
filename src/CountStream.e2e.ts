import http from 'http'
import CountStream from './CountStream.ts'

const main = () => {
    const counter = new CountStream('301')
    http.get('http://www.manning.com', (res) => {
        res.pipe(counter)
    })
    counter.on('total', (count) => {
        console.log('Matched: ', count);
    })
}

main()
