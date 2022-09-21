import React from 'react';
import { useState } from 'react';
import { gql, useQuery } from '@apollo/client';
import TodoItem from './types/TodoItem';
import TodoListItem from './TodoListItem';
import NewTodoButton from './NewTodoButton';
import NewTodoForm from './NewTodoForm';

// We define another interface for the result of the query wich is the array/list of todos
interface TodoItemsQueryResults {
  todoItems: TodoItem[];
}

//data: result of the query, loading is a boolean to know if the query is loading or not
// we use useQuery where we pass the List of results
// Then we pass it a query where we are going to use the gql macro where we pass the GraphQL document
export const GET_TODO_ITEMS = gql`
  {
    todoItems {
      id
      content
      isCompleted
    }
  }
`;

const TodoList = () => {
  const { data, loading } = useQuery<TodoItemsQueryResults>(GET_TODO_ITEMS);
  const [showForm, setShowForm] = useState(false);

  return (
    <div className='todo_list'>
      <h3 className='todo_list__header'>Todo Items</h3>
      <div className='todo_list__list'>
        {data?.todoItems?.map((item: TodoItem) => (
          <TodoListItem key={item.id} {...item} />
        ))}

        {showForm ? <NewTodoForm /> : null}
      </div>

      <div className='todo_list__space'></div>

      <footer className='todo_list__footer'>
        <NewTodoButton onClick={() => setShowForm(true)} />
      </footer>
    </div>
  );
};

export default TodoList;
