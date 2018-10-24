import * as React from "react";
import Scene from "./canvas";

class TypedLines extends React.Component {
  canvas: HTMLDivElement | null;
  updateFrame: (time: number) => void;

  componentDidMount() {
    this.calculateResize();
    window.addEventListener("resize", this.calculateResize);
  }

  calculateResize = () => {
    if (!this.canvas) {
      return;
    }
    const width = window.innerWidth;
    const height = window.innerHeight;
    const { update } = Scene(this.canvas, { height, width });
    this.updateFrame = update;
    requestAnimationFrame(this.renderFrame);
  };

  renderFrame = (time: number) => {
    requestAnimationFrame(this.renderFrame);
    this.updateFrame(time);
  };

  render() {
    return <div ref={ref => (this.canvas = ref)} />;
  }
}

export default TypedLines;
