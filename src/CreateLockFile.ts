import fs from 'node:fs'

fs.open('config.lock', 'wx', (err) => {
    if (err) {
        console.error(err);
        return
    }
})
