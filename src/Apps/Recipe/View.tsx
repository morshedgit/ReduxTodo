import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Todo, AppState, DISPATCH_ACTION } from "./store";
import {
  addTodo,
  removeTodo,
  updateTodo,
  setLoading,
  setError,
  addTodos
} from "./actions";
import { addTodoService, getTodosService } from "./services";

const TodoList: React.FC = () => {
  const [newTodoTitle, setNewTodoTitle] = useState("");
  const todos = useSelector((state: AppState) => state.data);
  const loading = useSelector((state: AppState) => state.loading);
  const error = useSelector((state: AppState) => state.error);
  const dispatch = useDispatch();

  useEffect(() => {
    const init = async () => {
      try {
        const todos = (await getTodosService()) as Todo[];
        console.log(todos);
        addTodos(todos);
      } catch (error) {
        dispatch(setError(new Error("Fetch_Error")));
      }
    };
    init();
  }, []);

  const handleAddTodo = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const todo: Todo = { id: "1", title: newTodoTitle, done: false };
      const { id, title, done } = await addTodoService(todo);
      dispatch(addTodo(todo));
      setNewTodoTitle("");
    } catch (error) {
      dispatch(setError(new Error("ADD_ERROR")));
    }
  };

  const handleUpdateTodo = (todo: Todo) => {
    todo.done = !todo.done;
    dispatch(updateTodo(todo));
  };

  const handleRemoveTodo = (todo: Todo) => {
    dispatch(removeTodo(todo));
  };

  useEffect(() => {
    console.log({ data: todos });
  }, [todos]);

  return (
    <div>
      {loading && <p>Loading...</p>}
      {error && <p>An error occurred while loading todos</p>}
      <form onSubmit={handleAddTodo}>
        <input
          type="text"
          value={newTodoTitle}
          onChange={(event) => setNewTodoTitle(event.target.value)}
        />
        <button type="submit">Add Todo</button>
      </form>
      <ul>
        {todos.map((todo) => (
          <li key={todo.title} className="flex gap-4">
            <input
              type="checkbox"
              checked={todo.done}
              onChange={() => handleUpdateTodo(todo)}
            />
            {todo.title}
            <button onClick={() => handleRemoveTodo(todo)}>Remove</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
