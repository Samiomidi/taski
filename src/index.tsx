import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  // When developing "StrictMode" causes an error in droppable. To avoid this you should turn it off
  // <React.StrictMode>
  <App />
  // </React.StrictMode>
);
