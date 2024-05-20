import { useState } from 'react';
import { Todo } from './Todos';
import cn from 'classnames';

interface TodoListProps {
  number: number;
  todo: Todo;
  onRemove: (_: string) => void;
  onUpdate: (_: Todo) => void;
  onCheck: (_: Todo) => void;
  todos: Todo[];
}

const TodoList: React.FC<TodoListProps> = ({
  todo,
  number,
  onRemove,
  onUpdate,
  onCheck,
  todos,
}) => {
  const [isChanged, setIsChanged] = useState(false);
  const [changedTitle, setChangedTitle] = useState(todo.title);

  const handleUpdate = (title: string) => {
    const updateTodo = {
      title,
      id: todo.id,
      completed: todo.completed,
    };

    onUpdate(updateTodo);
    setIsChanged(false);
  };

  const handleIsCahackedUpdate = (id: string) => {
    const updatedTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo,
    );
    const updateCheck = updatedTodos.find((todo) => todo.id === id);

    if (updateCheck) {
      onCheck(updateCheck);
    }
  };
  return (
    <div className='container'>
      {!isChanged ? (
        <div className='user-list__item'>
          <div className='user-list__info'>
            <span className='user-list__number'> {number}.</span>
            <span
              className={cn('completed', { completed__active: todo.completed })}
              onClick={() => handleIsCahackedUpdate(todo.id)}
            ></span>
            <span className='user-list__name'> {todo.title}</span>
          </div>
          <div className='user-list__buttons'>
            <button className='button' onClick={() => onRemove(todo.id)}>
              Delete
            </button>
            <button className='button' onClick={() => setIsChanged(!isChanged)}>
              Change
            </button>
          </div>
        </div>
      ) : (
        <div>
          <input
            value={changedTitle}
            className='input'
            type='text'
            onChange={(event) => setChangedTitle(event.target.value)}
          />
          <button className='button' onClick={() => handleUpdate(changedTitle)}>
            Save
          </button>
          <button className='button' onClick={() => setIsChanged(false)}>
            Cancel
          </button>
        </div>
      )}
    </div>
  );
};

export default TodoList;
