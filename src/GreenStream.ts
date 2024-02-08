import stream from 'node:stream'

class GreenStream extends stream.Writable {
    constructor(options?: any) {
        super(options)
    }

    _write(chunk: any, encoding: BufferEncoding, callback: (error?: Error | null | undefined) => void): void {
        process.stdout.write('\u001b[32m' + chunk + '\u001b[39m')
        callback()
    }
}

const greenStream = new GreenStream
process.stdin.pipe(greenStream)
