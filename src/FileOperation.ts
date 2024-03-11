import fs from 'node:fs';
import { Buffer } from 'node:buffer';
import assert from 'assert';

const fd = fs.openSync('./file.txt', 'w+');
const writeBuf = Buffer.from('some data to write')
fs.writeFileSync(fd, writeBuf)

const readBuf = Buffer.alloc(writeBuf.length);
fs.readSync(fd, readBuf, 0, writeBuf.length, 0)
assert.equal(writeBuf.toString(), readBuf.toString())

fs.closeSync(fd)

const readable = fs.createReadStream('./file.txt', { encoding: 'utf-8' })
const writeable = fs.createWriteStream('./copy.txt', { encoding: 'utf-8' })
readable.pipe(writeable)

fs.readFile('./file.txt', (err, buf) => {
    if (err) {
        console.error(err);
        return
    }
    console.log(buf.toString());
})
