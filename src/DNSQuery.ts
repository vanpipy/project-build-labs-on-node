import dns from 'node:dns'

dns.resolve('www.manning.com', (err, addr) => {
    if (err) {
        console.error(err);
    }
    console.log(`Address ${addr}`);
})
