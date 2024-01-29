console.log(1, __dirname);
console.log(2, __filename);

process.stdin.resume()
process.stdin.setEncoding('utf8')

process.stdin.on('data', (chunk: Buffer & string) => {
    process.stdout.write(chunk)
    process.stdout.write(chunk.toString())
    process.stdout.write(chunk.toUpperCase())
})

process.stdin.on('end', () => {
    process.exit(0)
})

const NAME = 'alex'
const user = { name: NAME }

console.log('Hello');
console.log('Hello %s', NAME);
console.log('Hello: ', NAME);
console.log('Hello: %j', user);

console.error('Error, bad user: ', user);
