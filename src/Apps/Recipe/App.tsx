import { Provider } from "react-redux";
import { store } from "./store";
import View from "./View";
const App = () => {
  return (
    <Provider store={store}>
      <h1>Todo App</h1>
      <View />
    </Provider>
  );
};

export default App;
