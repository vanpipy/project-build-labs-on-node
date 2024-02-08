import stream from 'node:stream'
import fs from 'node:fs'

class CSVParser extends stream.Transform {
    value!: string

    values!: string[]

    line!:number

    headers!: string[]

    constructor() {
        super()
        this.value = ''
        this.values = []
        this.line = 0
        this.headers = []
    }

    addValue() {
        if (this.line === 0) {
            this.headers.push(this.value)
        } else {
            this.values.push(this.value)
        }
        this.value = ''
    }

    toObject() {
        return this.headers.reduce((obj: any, header, index) => {
            obj[header] = this.values[index]
            return obj
        }, {})
    }

    _transform(chunk: any, _encoding: BufferEncoding, callback: stream.TransformCallback): void {
        const chunkData = chunk.toString()
        for (let i = 0; i < chunkData.length; i++) {
            const c = chunkData.charAt(i)
            if (c === ',') {
                this.addValue()
            } else if (c === '\n') {
                this.addValue()
                if (this.line > 0) {
                    this.push(JSON.stringify(this.toObject()))
                }
                this.values = []
                this.line += 1
            } else {
                this.value += c
            }
        }
        callback()
    }
}

const parser = new CSVParser();
fs.createReadStream(__dirname + '../sample.csv')
    .pipe(parser)
    .pipe(process.stdout);
