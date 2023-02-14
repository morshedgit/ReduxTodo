import { createStore } from "redux";

export const enum DISPATCH_ACTION {
  ADD = "ADD",
  BATCH_ADD = "BATCH_ADD",
  REMOVE = "REMOVE",
  UPDATE = "UPDATE",
  SET_LOADING = "SET_LOADING",
  SET_ERROR = "SET_ERROR"
}

export type Todo = {
  id: string;
  title: string;
  done: boolean;
};

export type AppState = {
  data: Todo[];
  loading: boolean;
  error?: Error;
};

export type AddAction = {
  type: DISPATCH_ACTION.ADD;
  payload: Todo;
};
export type BatchAddAction = {
  type: DISPATCH_ACTION.BATCH_ADD;
  payload: Todo[];
};
export type RemoveAction = {
  type: DISPATCH_ACTION.REMOVE;
  payload: Todo;
};
export type UpdateAction = {
  type: DISPATCH_ACTION.UPDATE;
  payload: Todo;
};
export type SetLoadingAction = {
  type: DISPATCH_ACTION.SET_LOADING;
  payload: boolean;
};
export type SetErrorAction = {
  type: DISPATCH_ACTION.SET_ERROR;
  payload?: Error;
};

export type Action =
  | AddAction
  | BatchAddAction
  | RemoveAction
  | UpdateAction
  | SetLoadingAction
  | SetErrorAction;

const initialState: AppState = {
  data: [],
  loading: false
};

const reducer = (state: AppState = initialState, action: Action) => {
  switch (action.type) {
    case DISPATCH_ACTION.ADD:
      return { ...state, data: [...state.data, action.payload] };
    case DISPATCH_ACTION.BATCH_ADD:
      debugger;
      return { ...state, data: [...state.data, ...action.payload] };
    case DISPATCH_ACTION.REMOVE:
      return {
        ...state,
        data: state.data.filter((todo) => todo.id !== action.payload.id)
      };
    case DISPATCH_ACTION.UPDATE:
      return {
        ...state,
        data: state.data.map((todo) =>
          todo.id === action.payload.id ? { ...todo, ...action.payload } : todo
        )
      };
    case DISPATCH_ACTION.SET_ERROR:
      return { ...state, error: action.payload };
    case DISPATCH_ACTION.SET_LOADING:
      return { ...state, loading: action.payload };
    default:
      return state;
  }
};

export const store = createStore(reducer);
