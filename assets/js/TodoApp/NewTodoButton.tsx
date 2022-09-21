import React from 'react';
import { AiOutlinePlus } from 'react-icons/ai';
import { IconContext } from 'react-icons';

interface Props {
  onClick(): void;
}

const NewTodoButton = ({ onClick }: Props) => {
  return (
    <button className='new_todo_button' onClick={onClick}>
      <IconContext.Provider
        value={{
          size: '20px',
          style: {
            color: 'black',
            background: 'salmon',
            border: '1px solid salmon',
            borderRadius: '50%',
            overflow: 'hidden',
            display: 'inline-flex',
            justifyContent: 'center',
            alignItems: 'center',
            marginRight: '12px',
          },
        }}
      >
        <AiOutlinePlus />
      </IconContext.Provider>
      New Todo
    </button>
  );
};

export default NewTodoButton;
