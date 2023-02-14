import {
  AddAction,
  RemoveAction,
  UpdateAction,
  SetLoadingAction,
  SetErrorAction,
  Todo,
  DISPATCH_ACTION,
  Action,
  BatchAddAction
} from "./store";

// Add a todo
export const addTodo = (todo: Todo): AddAction => {
  return {
    type: DISPATCH_ACTION.ADD,
    payload: todo
  };
};
// Add a todos
export const addTodos = (todos: Todo[]): BatchAddAction => {
  return {
    type: DISPATCH_ACTION.BATCH_ADD,
    payload: todos
  };
};

// Remove a todo
export const removeTodo = (todo: Todo): RemoveAction => {
  return {
    type: DISPATCH_ACTION.REMOVE,
    payload: todo
  };
};

// Update a todo
export const updateTodo = (todo: Todo): UpdateAction => {
  return {
    type: DISPATCH_ACTION.UPDATE,
    payload: todo
  };
};

// Set loading state
export const setLoading = (loading: boolean): SetLoadingAction => {
  return {
    type: DISPATCH_ACTION.SET_LOADING,
    payload: loading
  };
};

// Set error state
export const setError = (error?: Error): SetErrorAction => {
  return {
    type: DISPATCH_ACTION.SET_ERROR,
    payload: error
  };
};
