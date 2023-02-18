import MainRouter from "./routes/MainRouter";
import { Provider } from "react-redux";
import { store } from "./redux/store";

export default function App() {
  return (
    <Provider store={store}>
      <MainRouter />
    </Provider>
  );
}
