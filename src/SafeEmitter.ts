import EventEmitter from "events";

function complexOperations () {
    const events = new EventEmitter()
    process.nextTick(() => {
        events.emit('success')
    })
    return events
}

const operations = complexOperations()
operations.on('success', () => {
    console.log('success');
})
