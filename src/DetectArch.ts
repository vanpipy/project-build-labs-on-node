function main () {
    switch (process.arch) {
        case 'x64':
            console.log('x64 arch');
            break;

        case 'ia32':
            console.log('ia32 arch');
            break;

        default:
            throw new Error(`Unsupported  process.arch: ${process.arch}`)
    }
}

main()
