import {Socket} from 'phoenix'
import {adapt} from '@cycle/run/lib/adapt'
import xs from 'xstream'

function makeSockDriver(mount, channel, peerId) {
  let socket = new Socket(mount, {params: {token: 5}})
  socket.connect()

  let theChannel = socket.channel(channel, {token: 10})
  theChannel.join()

  function sockDriver(outgoing$) {
    outgoing$.addListener({
      next: outgoing => {
        console.log("payload pushing ", outgoing.payload, " to ", outgoing.event_type)
        theChannel.push(outgoing.event_type, outgoing.payload, 500)
      }
    })

    const incoming$ = xs.create({
      start: listener => {
        theChannel.on("phx_reply", (message) => {
          listener.next(message)
        })
      },
      stop: () => {}
    })

    return adapt(incoming$)
  }

  return sockDriver
}

export default makeSockDriver
