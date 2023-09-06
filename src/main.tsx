import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { store } from "@/store.ts";
import { Provider } from "react-redux";

const savedTheme = JSON.parse(localStorage.getItem("theme") || `[]`);

if (savedTheme.length === 0) {
  localStorage.setItem("theme", JSON.stringify("dark"));
}

savedTheme === "light"
  ? document.documentElement.classList.remove("dark")
  : document.documentElement.classList.add("dark");
  
ReactDOM.createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>,
);
