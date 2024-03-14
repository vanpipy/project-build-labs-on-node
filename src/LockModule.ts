import fs from 'node:fs'

const LOCKDIR = 'config.lock'
let hasLock = false

export const lock = (callback: (err?: Error) => void) => {
    if (hasLock) {
        return
    }
    fs.mkdir(LOCKDIR, (err) => {
        if (err) {
            return callback(err)
        }
        fs.writeFile(`${LOCKDIR}/${process.pid}`, '', (err) => {
            if (err) {
                console.error(err);
            }
            hasLock = true
            return callback()
        })
    })
}

export const unlock = (callback: (err?: Error) => void) => {
    if (!hasLock) {
        return callback()
    }
    fs.unlink(`${LOCKDIR}/${process.pid}`, (err) => {
        if (err) {
            return callback(err)
        }
        fs.rmdir(LOCKDIR, (err) => {
            if (err) {
                return callback(err)
            }
            hasLock = false
            return callback()
        })
    })
};

process.on('exit', () => {
    if (hasLock) {
        fs.unlinkSync(`${LOCKDIR}/${process.pid}`)
        fs.rmdirSync(LOCKDIR)
        console.log('removed lock');
    }
})
