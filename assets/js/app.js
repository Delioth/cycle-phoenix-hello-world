// Brunch automatically concatenates all files in your
// watched paths. Those paths can be configured at
// config.paths.watched in "brunch-config.js".
//
// However, those files will only be executed if
// explicitly imported. The only exception are files
// in vendor, which are never wrapped in imports and
// therefore are always executed.

// Import dependencies
//
// If you no longer want to use a dependency, remember
// to also remove its path from "config.paths.watched".
import "phoenix_html"

// Import local files
//
// Local files can be imported directly using relative
// paths "./socket" or full ones "web/static/js/socket".

// import socket from "./socket"
import app from './cycle/main'
import {run} from "@cycle/run"
import {makeDOMDriver} from "@cycle/dom"
import makeSockDriver from './cycle/driver/phoenix-socket-cycle-driver'

function main(sources) {
  return app(sources)
}
console.log("hello, world")

let socketDriver = makeSockDriver("/socket", "numbers:numbers", "1")

run(main, {
  DOM: makeDOMDriver('#newApp'),
  sock: socketDriver
})
