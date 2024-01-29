const ARGS: Record<string, Function> = {
    '-h': displayHelp,
    '-r': reandFile,
}

function displayHelp () {
    console.log('Argument processor', ARGS);
}

function reandFile (filename: string) {
    if (filename) {
        console.log('Reading', filename);
        console.time('read');
        const fs = require('node:fs')
        const stream = fs.createReadStream(filename)
        stream.on('end', () => {
            console.timeEnd('read');
        })
        stream.pipe(process.stdout)
    } else {
        console.error('A file must be provided with the -r option');
        process.exit(1)
    }
}

if (process.argv.length) {
    process.argv.forEach((arg: string, index: number) => {
        const current = ARGS[arg]
        if (current) {
            current.apply(null, process.argv.slice(index + 1, index + 2))
        }
    })
}
