defmodule TodoListWeb.Api.Schema do
  use Absinthe.Schema
  alias TodoList.Todos

  # Here we define our object
  object :todo_item do
    # ID!
    field(:id, non_null(:id))
    field(:content, non_null(:string))

    field :is_completed, non_null(:boolean) do
      # Here we have a fn where we pass the object completed at field that cant be null
      resolve(fn %{completed_at: completed_at}, _, _ ->
        {:ok, !is_nil(completed_at)}
      end)
    end
  end

  # Here we have a mutation to create this items and returns a boolean
  mutation do
    field :create_todo_item, :todo_item do
      # It accepts a simple text, and it has to be a non nullable string
      arg(:content, non_null(:string))

      resolve(fn %{content: content}, _ ->
        # We create the item with the content
        Todos.create_item(%{content: content})
      end)
    end

    # Here we toggle the state of the todo item (not completed => completed / completed => not completed)
    # return the todo_item
    field :toggle_todo_item, :todo_item do
      # Accpets id as argument
      arg(:id, non_null(:id))

      # we resolve that by toggling the todo item using the id
      resolve(fn %{id: item_id}, _ ->
        Todos.toggle_item_by_id(item_id)
      end)
    end

    # Here we create a mutation that updates the items content
    field :update_todo_item, :todo_item do
      # Accpets id as argument
      arg(:id, non_null(:id))
      # Accepts content as argument
      arg(:content, non_null(:string))

      resolve(fn %{id: id, content: content}, _ ->
        todo = Todos.get_item!(id)
        Todos.update_item(todo, %{content: content})
      end)
    end

    # Here we have a delete mutation to... delete the item
    field :delete_todo_item, :boolean do
      arg(:id, non_null(:id))

      resolve(fn %{id: id}, _ ->
        todo = Todos.get_item!(id)
        Todos.delete_item(todo)
        {:ok, true}
      end)
    end
  end

  # Here we have a querry where if we input the word 'Hello' it will return as resolved "Hello World!"
  query do
    field :hello, :string do
      resolve(fn _, _ ->
        {:ok, "Hello World!"}
      end)
    end

    # Here we have a querry that fetches all of the items in the DB (all the to-dos)
    # we fetch the todo_items that its a non_nullable list of todo_items
    # [TodoItem!]! => GraphQL
    field :todo_items, non_null(list_of(:todo_item)) do
      resolve(fn _, _ ->
        {:ok, Todos.list_items()}
      end)
    end
  end
end
