import ReactDOM from "react-dom";

function Backdrop(props) {
  return ReactDOM.createPortal(
    <div className="backdrop" onClick={props.onClick}>
      {props.children}
    </div>,
    document.getElementById("backdrop")
  );
}

export default Backdrop;
