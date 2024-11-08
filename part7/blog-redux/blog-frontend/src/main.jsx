import ReactDOM from "react-dom/client";
import App from "./App";
import { Provider } from "react-redux";
import { store } from "./store";
import { BrowserRouter as Router } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Router future={{ v7_relativeSplatPath: true, v7_startTransition: true }}>
    <Provider store={store}>
      <App />
    </Provider>
  </Router>,
);
