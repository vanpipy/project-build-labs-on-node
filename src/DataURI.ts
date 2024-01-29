import {readFile, writeFile} from "node:fs/promises";
import path from "node:path";

async function main () {
    const imagePath = path.resolve(__dirname, '../demo.jpg')
    const mine = 'image/jpg'
    const encoding = 'base64'
    const data = await readFile(imagePath)
    const encoded = Buffer.from(data).toString('base64')
    const uri = `data:${mine};charset=utf8;${encoding},${encoded}`
    console.log(uri);
    await writeFile('demo.origin.jpg', Buffer.from(data))
    await writeFile('demo.base64.jpg', Buffer.from(encoded, encoding))
}

main()
