import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import cardUnicodes from "./cardUnicodes";

function Card(props) {
  return <div className="card">\{cardUnicodes[props.value]};</div>;
}

ReactDOM.render(<Card value="2" />, document.getElementById("root"));
