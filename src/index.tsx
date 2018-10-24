import * as React from "react";
import { render } from "react-dom";

const styles: React.CSSProperties = {
  fontFamily: "sans-serif",
  textAlign: "center"
};

const App = () => (
  <div style={styles}>

  </div>
);

render(<App />, document.getElementById("root"));
