import "./App.css";
import Router from "./Router";
import AudioManager from "./components/AudioManager";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
      <AudioManager />
      <Router />
      <ToastContainer />
    </>
  );
}

export default App;
