import { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import TodoList from './TodosList';
import cn from 'classnames';

import {
  add,
  getAll,
  remove,
  removeAll,
  update,
  updateAll,
} from '../../assets/todos';

export type Todo = {
  id: string;
  title: string;
  completed: boolean;
};

const Todos: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [title, setTitle] = useState('');
  const loadTodos = () => getAll().then(setTodos);
  const isAllSelected = todos.every((todo) => todo.completed);

  useEffect(() => {
    loadTodos();
  }, []);

  const handleAddTodo = async (title: string) => {
    try {
      const newTodo = await add(title);

      setTodos([...todos, newTodo]);
      setTitle('');
    } catch (error) {
      console.error('Error adding todo:', error);
    }
  };

  const handleDeleteTodo = async (todoId: string) => {
    try {
      await remove(todoId);
      loadTodos();
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  };

  const handleUpdateTodo = async (todoData: Todo) => {
    try {
      await update(todoData);
      loadTodos();
    } catch (error) {
      console.error('Error updating todo:', error);
    }
  };

  const handleToggle = async (checkData: Todo) => {
    try {
      await update(checkData);
      loadTodos();
    } catch (error) {
      console.error('Error updating todo:', error);
    }
  };

  const handleCompletedAllTodos = async (completed: boolean) => {
    try {
      const toUpdate = todos.filter((todo) => todo.completed !== completed);
      await updateAll(toUpdate.map((todo) => ({ ...todo, completed })));
      loadTodos();
    } catch (error) {
      console.error('Error updating completion status:', error);
    }
  };

  const handleToggleAll = () => {
    if (isAllSelected) {
      todos.forEach((todo) => {
        handleCompletedAllTodos(!todo.completed);
      });
    } else {
      todos.forEach((todo) => {
        if (!todo.completed) {
          handleCompletedAllTodos(true);
        }
      });
    }
  };

  const handleClearCompleted = async () => {
    try {
      await removeAll(todos.filter((todo) => todo.completed));
      loadTodos();
    } catch (error) {
      console.error('Error clearing completed todos:', error);
    }
  };

  const handleClearAll = async () => {
    try {
      await removeAll(todos.filter((todo) => todo));
      loadTodos();
    } catch (error) {
      console.error('Error updating clearing status:', error);
    }
  };

  return (
    <div className='container'>
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder='Enter title'
        type='text'
        className='input'
      />
      <button className='button' onClick={() => handleAddTodo(title)}>
        Add Todo
      </button>
      <div className='check__all'>
        <button
          onClick={handleToggleAll}
          className={cn('button', {
            completed__active: isAllSelected && !!todos.length,
          })}
        >
          Check All
        </button>
        <button onClick={handleClearCompleted} className='button'>
          Clear Completed
        </button>
        {!!todos.length && (
          <button onClick={handleClearAll} className='button'>
            Clear All
          </button>
        )}
      </div>

      <div className='users__map'>
        {todos.map((todo: Todo, index: number) => (
          <TodoList
            key={uuidv4()}
            number={index + 1}
            todo={todo}
            onRemove={handleDeleteTodo}
            onUpdate={handleUpdateTodo}
            onCheck={handleToggle}
            todos={todos}
          />
        ))}
      </div>
    </div>
  );
};

export default Todos;
