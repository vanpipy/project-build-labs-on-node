import fs from 'node:fs/promises'
import {resolve} from 'node:path'

const recursivePathRead = async (pathSet: string[], index = 0): Promise<string[]> => {
    if (index >= pathSet.length) {
        return pathSet
    }
    const currentPath = pathSet[index]
    const currentStat = await fs.stat(currentPath)
    if (currentStat.isDirectory()) {
        const subs = await fs.readdir(currentPath)
        const subPaths = subs.map((sub) => resolve(__dirname, sub))
        return await recursivePathRead([currentPath, ...subPaths], index + 1)
    } else {
        return await recursivePathRead(pathSet, index + 1)
    }
}

const main = async () => {
    const root = resolve(__dirname)
    const paths = await recursivePathRead([root])
    console.log(paths);
}

main()
