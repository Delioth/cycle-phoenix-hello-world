defmodule HelloWeb.NumbersChannel do
  use Phoenix.Channel

  def join("numbers:numbers", _, socket) do
    {:ok, socket}
  end

  def handle_in("numbers:square", value, socket) do
    {:reply, {:ok, %{:op => "square", :value => value * value}}, socket}
  end

  def handle_in("numbers:add", [a,b], socket) do
    {:reply, {:ok, %{:op => "add", :value => a + b}}, socket}
  end

end
