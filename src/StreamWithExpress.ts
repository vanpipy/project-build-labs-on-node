import stream from 'node:stream'
import util from 'node:util'
import express from 'express'

class StatStream extends stream.Readable {
    private limit!: number;

    constructor(limit = 10) {
        super()
        this.limit = limit
    }

    _read(_size: number): void {
        if (this.limit === 0) {
            this.push('')
        } else {
            const stat = util.inspect(process.memoryUsage())
            this.push(stat)
            this.push('\n')
            this.limit -= 1
        }
    }
}

const app = express()

app.get('/', (_req, res) => {
    const currentMemoryStat = new StatStream()
    currentMemoryStat.pipe(res)
})

app.listen(8080)
