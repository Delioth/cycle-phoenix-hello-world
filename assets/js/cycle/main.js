import xs from 'xstream'
import {div, input, p} from '@cycle/dom'
import Snabbdom from 'snabbdom-pragma'

function app(sources) {
  const incoming$ = sources.sock

  // Use single socket stream like different streams by filtering on ops
  const incoming_squared$ = incoming$
    .filter(resp => resp.response.op == "square")
  const incoming_added$ = incoming$
    .filter(resp => resp.response.op == "add")

  // Listen to only some events
  incoming_squared$.addListener({
    next: incoming => {
      console.log("IN SQUARED: ", incoming)
    }
  })

  // But also listen differently to others
  incoming_added$.addListener({
    next: incoming => {
      console.log("IN ADDED:", incoming)
    }
  })

  // setup a perpetual stream of one type
  const outgoing_square$ = xs.periodic(1000)
    .map(i => i % 5) // pass 0-1-2-3-4-0-1-2-3-4-...
    .map(i => i + 1) // 1-2-3-4-5-1-...
    .map(i => {return {event_type: "numbers:square", payload: i}})

  // And listen to its output
  outgoing_square$.addListener({
    next: outgoing => {
      console.log(outgoing)
    }
  })

  // While also sending another, different stream
  const outgoing_add$ = xs.periodic(100)
   .map(i => i % 9)
   .map(i => i + 1)
   .map(i => [i, i])
   .map(arr => {return {event_type: "numbers:add", payload: arr}})

  // And listening to its output
  outgoing_add$.addListener({
    next: outgoing => {
      console.log(outgoing)
    }
  })

  // And then we merge the two streams, for funsises
  const outgoing$ = xs.merge(outgoing_square$, outgoing_add$)

  const sinks = {
    DOM: sources.DOM.select('input').events('change')
      .map(ev => ev.target.checked)
      .startWith(false)
      .map(toggled =>
        <div>
          <input type='checkbox'/> Toggle something else jsx!
          <p>{toggled ? "HELLO" : "OFF"}</p>
        </div>
      ),
    sock: outgoing$
  }

  console.log("APP initialized")

  return sinks
}

export default app
