import { Buffer } from 'node:buffer'
import {readFile} from "fs";
import path from "path";

readFile(path.resolve(__dirname, '../errors-file.log'), (err, data) => {
    if (err) {
        console.error(err);
        return
    }
    console.log(data.toString());
    console.log(data.toString('ascii'));
})

const user = 'johhy'
const passwd = 'c-bad'
const authstring = `${user}:${passwd}`
const buf = Buffer.from(authstring)
const encoded = buf.toString('base64')
console.log(authstring, buf, encoded);
