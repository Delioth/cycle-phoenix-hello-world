# Hello, World!

This project is a toy example of a full stack web application which is all written with functional programming.

* Cycle.js is a functional frontend framework which supports pure data-flows, and isolates side-effects to explicit drivers whose sole purpose is to create side-effects.
* Elixir is a fast backend framework with Ruby-like syntax built on the Erlang VM, with the Phoenix framework assisting in bringing web functionality to the language.

# Running the project or forks

To start your Phoenix server:

  * Install dependencies with `mix deps.get`
  * Create and migrate your database with `mix ecto.create && mix ecto.migrate`
  * Install Node.js and Cycle dependencies with `cd assets && npm install`
  * Start Phoenix endpoint with `mix phx.server`

Now you can visit [`localhost:4000`](http://localhost:4000) from your browser.

As of right now, this project requires a Postgresql instance running on the default port for `ecto.create` to run correctly. The instance is not used, and will be phased out.
