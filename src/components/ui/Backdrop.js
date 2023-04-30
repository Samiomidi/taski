import React from "react";
import ReactDOM from "react-dom";
import classes from "./Backdrop.module.css";
function Backdrop(props) {
  return ReactDOM.createPortal(
    <div className="backdrop" onClick={props.onClick}>
      {props.children}
    </div>,
    document.getElementById("backdrop")
  );
}

export default Backdrop;
