import EventEmitter from "events";

class MediaDevice {
    public play(track: string) {
        console.log('playing with ', track);
    }

    public stop() {
        console.log('stop');
    }
}

class MusicPlayer extends EventEmitter {
    playing!: boolean;

    constructor() {
        super()
        this.playing = false
    }
}

const audioDevice = new MediaDevice()
const player = new MusicPlayer()

const onPlay = (track: string) => {
    player.playing = true
    audioDevice.play(track)
}

const onStop = () => {
    player.playing = false
    audioDevice.stop()
}

player.on('play', onPlay)

player.on('stop', onStop)

player.on('error', (err) => {
    console.error('Error: ', err);
})

player.emit('play', 'The Roots - The Fire')

setTimeout(() => {
    player.emit('stop')
    player.removeListener('stop', onStop)
    player.emit('stop')
    player.removeAllListeners()
    player.emit('play', 'The Roots - The Fire')
}, 3000)
