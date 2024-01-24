import assert from "assert";
import CountStream from "./CountStream";
import {createReadStream} from "fs";

const counter = new CountStream('example')
let passed = 0

counter.on('total', (count) => {
    assert.equal(count, 1)
    passed++
})

createReadStream(__filename).pipe(counter)

process.on('exit', () => {
    console.log('Assertion state: ', passed);
})
