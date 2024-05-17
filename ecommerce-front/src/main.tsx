import ReactDOM from "react-dom/client";
import "bootstrap/dist/css/bootstrap.css";
import AppRouter from "./routes/AppRouter";
import { Provider } from "react-redux";
import { persistor, store } from "./store";
import "@services/api/axios";
import "@styles/global.css";
import { PersistGate } from "redux-persist/integration/react";
ReactDOM.createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <AppRouter />
    </PersistGate>
  </Provider>
);
