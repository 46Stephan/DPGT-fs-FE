import { Provider } from "react-redux";
import { store } from "./config/store";
import { PaginaPrincipal } from "./components/PaginaPrincipal";

function App() {
  return (
    <>
      <Provider store={store}>
        <PaginaPrincipal />
      </Provider>
    </>
  );
}

export default App;
