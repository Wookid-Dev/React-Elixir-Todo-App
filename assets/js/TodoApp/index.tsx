import React from 'react';
import client from './client';
import { ApolloProvider } from '@apollo/react-hooks';
import TodoList from './TodoList';

// We need to wrap the app is because that way we can acccess the client
// no matter how deep we are plus it allows to pass props
const TodoApp = () => {
  return (
    <ApolloProvider client={client}>
      <TodoList />
    </ApolloProvider>
  );
};

export default TodoApp;
