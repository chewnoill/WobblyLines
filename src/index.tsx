import * as React from "react";
import { render } from "react-dom";
import Lines from "./Lines";

const styles: React.CSSProperties = {
  fontFamily: "sans-serif",
  textAlign: "center"
};

const App = () => (
  <div style={styles}>
    <Lines />
  </div>
);

render(<App />, document.getElementById("root"));
