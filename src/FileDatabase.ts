import EventEmitter from "node:events";
import {WriteStream, createReadStream, createWriteStream} from "node:fs";

class FileDatabase extends EventEmitter {
    config!: { path: string }
    records!: Record<string, string>;
    writeStream!: WriteStream

    constructor(config: { path: string }) {
        super()
        this.config = config
        this.writeStream = createWriteStream(config.path, {
            encoding: 'utf8',
            flags: 'a',
        })
        this.records = {}
    }

    load() {
        const readStream = createReadStream(this.config.path, { encoding: 'utf8' })
        let data = ''
        readStream.on('readable', () => {
            data += readStream.read()
            const records = data.split('\n')
            data = records.pop() as string
            for (let i = 0, len = records.length; i < len; i++) {
                try {
                    const record = JSON.parse(records[i]);
                    const { key, value } = record;
                    if (value === null) {
                        delete this.records[key]
                    } else {
                        this.records[key] = value
                    }
                } catch (_) {
                    this.emit('error', 'found invalid record: ', records[i])
                }
            }
        })
        readStream.on('end', () => {
            this.emit('load')
        })
    }

    get(key: string) {
        const value = this.records[key]
        this.emit('get', `get data ${key}: ${value}`)
        return value
    }

    set(key: string, value: string | null, cb: () => void) {
        if (value === null) {
            this.emit('set', `remove data ${key}: ${value}`)
            delete this.records[key]
        } else {
            this.records[key] = value
            this.emit('set', `set data ${key}: ${value}`)
            const toWrite = JSON.stringify({ key, value }) + '\n';
            this.writeStream.write(toWrite, cb)
        }
    }

    del(key: string, cb: () => void) {
        this.emit('del', `remove data ${key}`)
        return this.set(key, null, cb)
    }
}

const database = new FileDatabase({ path: './data.db' });

database.on('load', () => {
    console.log('database loaded');

    database.on('error', (err) => {
        console.log(`Error: ${err}`);
    })

    database.on('get', (log) => {
        console.log(log);
    })

    database.on('set', (log) => {
        console.log(log);
    })

    database.on('del', (log) => {
        console.log(log);
    })

    database.set('a2', 'b2', () => {
        console.log('set key a2 with value b2');
    })

    database.set('a3', 'b3', () => {
        console.log('set key a3 with value b3');
    })

    const v = database.get('a0');
    console.log(`key a0 has value ${v}`);
})

database.load()
