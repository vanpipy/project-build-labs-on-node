import dgram, {Socket} from 'node:dgram'
import {ReadStream, createReadStream} from 'node:fs'

class Client {
    remoteIP: string;
    socket!: Socket
    stream!: ReadStream

    constructor(remoteIP: string) {
        this.remoteIP = remoteIP
        this.socket = dgram.createSocket('udp4')
        this.stream = createReadStream(__filename)
        this.stream.on('readable', () => {
            this.sendData()
        })
    }

    sendData() {
        const message = this.stream.read(16)
        if (!message) {
            return this.socket.unref()
        }
        this.socket.send(message, 0, message.length, 41230, this.remoteIP, () => {
            this.sendData()
        })
    }
}

class Server {
    socket!: Socket

    constructor() {
        this.socket = dgram.createSocket('udp4')
        this.socket.on('message', (msg, info) => {
            process.stdout.write(msg.toString())
            console.log(info);
        })
        this.socket.on('listening', () => {
            console.log('Server ready ', this.socket.address());
        })
        this.socket.bind(41230)
    }
}

if (process.argv[2] === 'client') {
    new Client(process.argv[3])
} else {
    new Server()
}
