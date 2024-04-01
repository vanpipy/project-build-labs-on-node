import cp from 'node:child_process'

cp.execFile('echo', ['hello', 'world'], (err, stdout, stderr) => {
    if (err) {
        console.error(err);
    }
    console.log('stdout', stdout);
    console.log('stderr', stderr);
})
