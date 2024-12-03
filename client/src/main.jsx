import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import ShopContextProvider from "./context/ShopContext.jsx";
import { AuthProvider } from "./context/AuthProvider.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <ShopContextProvider>
    <AuthProvider>
      <App />
      <ToastContainer
        autoClose={1600}
        position="bottom-left"
        style={{ width: "330px" }}
      />
    </AuthProvider>
  </ShopContextProvider>
);
