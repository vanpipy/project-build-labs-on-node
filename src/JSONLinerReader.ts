import stream from 'node:stream'
import util from 'node:util'
import fs from 'node:fs'
import path from 'node:path'

class JSONLinerReader extends stream.Readable {
    source!: stream.Readable

    foundLineEnd!: boolean

    buffer!: string

    constructor(source: stream.Readable) {
        super()
        this.source = source
        this.foundLineEnd = false
        this.buffer = ''
        this.source.on('readable', () => {
            const chunk = this.read()
            console.log('Each chunk: ', chunk.toString());
        })
    }

    _read(_size: number): void {
        if (this.buffer.length === 0) {
            const chunk = this.source.read()
            if (chunk) {
                this.buffer += chunk
            }
        }
        const lineIndex = this.buffer.indexOf('\n')
        if (lineIndex > -1) {
            const line = this.buffer.slice(0, lineIndex)
            console.log('Line: ', line);
            const result = JSON.parse(line)
            this.buffer = this.buffer.slice(lineIndex + 1)
            this.emit('object', result)
            this.push(util.inspect(result))
        } else {
            this.buffer = this.buffer.slice(0)
        }
    }
}

const source = fs.createReadStream(path.join(__dirname, '../json-lines.txt'), { encoding: 'utf8' })
const jsonLinerReader = new JSONLinerReader(source)
jsonLinerReader.on('object', (obj) => {
    console.log('pos: ', obj.position, '- letter: ', obj.letter);
})
