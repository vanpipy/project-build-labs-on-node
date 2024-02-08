import stream from 'node:stream'

class HungryStream extends stream.Duplex {
    waiting!: boolean

    constructor(options?: any) {
        super(options)
        this.waiting = false
    }

    _read(_size: number): void {
        if (!this.waiting) {
            this.push('Feed me data >')
            this.waiting = true
        }
    }

    _write(chunk: any, _encoding: BufferEncoding, callback: (error?: Error | null | undefined) => void): void {
        process.stdout.write('\u001b[32m' + chunk + '\u001b[39m')
        callback()
    }
}

const hungryStream = new HungryStream
process.stdin.pipe(hungryStream).pipe(process.stdout)
