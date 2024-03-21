import assert from 'node:assert';
import net from 'node:net'

let clients = 0;
let expectedAssertion = 2;

const server = net.createServer((client) => {
    clients += 1
    const clientId = clients;
    console.log('Client connected ', clientId);

    client.on('end', () => {
        console.log('Client disconnected ', clientId);
    })

    client.write(`Welcome client ${clientId} \r\n`)
    client.pipe(client)
})

server.listen(8000, () => {
    console.log('Server started on port 8000');

    runTest(1, () => {
        runTest(2, () => {
            console.log('Tests finished');
            assert.equal(0, expectedAssertion)
            server.close()
        })
    })
})

function runTest (expectedId: number, done: () => void) {
    const client = net.connect(8000)
    client.on('data', (data) => {
        const expected = `Welcome client ${expectedId} \r\n`
        assert.equal(data.toString(), expected)
        expectedAssertion -= 1
        client.end()
    })
    client.on('end', done)
}
