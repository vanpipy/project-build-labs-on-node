import {Writable, WritableOptions} from "stream";

class CountStream extends Writable {
    count!: number

    matcher!: RegExp

    constructor(matcher: string, options?: WritableOptions) {
        super(options)
        this.count = 0
        this.matcher = new RegExp(matcher, 'ig')
    }

    _write(chunk: any): void {
        const content: string = chunk?.toString();
        const matched = content.match(this.matcher);
        if (matched?.length) {
            this.count += matched.length
        }
    }

    end(chunk?: unknown, encoding?: unknown, cb?: unknown): any {
        this.emit('total', this.count)
    }
}

export default CountStream
