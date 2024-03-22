import assert from 'node:assert';
import net from 'node:net'

let clients = 0;
let expectedAssertion = 2;

const server = net.createServer((client) => {
    clients += 1
    const clientId = clients;
    client.write('377375042377373001', 'binary')
    console.log('Client connected ', clientId);
    client.on('end', () => {
        console.log('Server disconnected ');
        client.unref()
    })
    client.on('data', (data) => {
        const text = data.toString();
        process.stdout.write(text)
        client.write(text)
    })
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

function runTest (_expectedId: number, done: () => void) {
    const client = net.connect(8000)
    client.on('data', (data) => {
        assert.equal(data.toString(), '377375042377373001')
        expectedAssertion -= 1
        client.end()
    })
    client.on('end', done)
}
