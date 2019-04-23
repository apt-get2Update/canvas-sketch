import React from "react";
import PropTypes from "prop-types";
import { TOOL } from "./constants";

export default class Sketch extends React.Component {
  constructor(props) {
    super(props);
    this.down = { x: "", y: "" };
    this.pencil = {};
    this.ctx = {};
    this.canvas = {};
    this.toolEnable = false;
    this.tempInput = [];
  }

  static defaultProps = {
    width: window.innerWidth * 0.9,
    height: window.innerHeight,
    updateToolInfo: () => {}
  };

  static propTypes = {
    drawInput: PropTypes.array,
    updateToolInfo: PropTypes.func,
    color: PropTypes.string,
    tool: PropTypes.string,
    width: PropTypes.number,
    height: PropTypes.number
  };

  //initial rendering in the lines in UI
  componentDidMount() {
    this.canvas = document.getElementById("canvas");
    this.ctx = this.canvas.getContext("2d");
    const { drawInput } = this.props;
    const pencilTools = drawInput.filter(tool => tool.toolType === TOOL.PENCIL);

    pencilTools.forEach(tool => {
      for (let i = 0; i < tool.x.length - 1; i++) {
        this.renderLine(
          tool.x[i],
          tool.y[i],
          tool.x[i + 1],
          tool.y[i + 1],
          tool.color
        );
      }
    });
  }

  //clear canvas context
  componentWillUnmount() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  //every update of the component will be clear canvas and redraw it
  componentDidUpdate() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    const { drawInput } = this.props;
    const pencilTools = drawInput.filter(tool => tool.toolType === TOOL.PENCIL);
    pencilTools.forEach(tool => {
      for (let i = 0; i < tool.x.length - 1; i++) {
        this.renderLine(
          tool.x[i],
          tool.y[i],
          tool.x[i + 1],
          tool.y[i + 1],
          tool.color
        );
      }
    });
  }

  unDo() {
    const { drawInput, updateToolInfo } = this.props;
    if (drawInput.length > 0) {
      this.tempInput.push(drawInput[drawInput.length - 1]);
      const data =
        drawInput.lenght === 1 ? [] : drawInput.slice(0, drawInput.length - 2);
      updateToolInfo(data);
    }
  }

  reDo() {
    const { drawInput, updateToolInfo } = this.props;
    if (this.tempInput.length > 0) {
      const data = this.tempInput.pop();
      updateToolInfo([...drawInput, data]);
    }
  }
  eraseAll = () => {
    const { drawInput, updateToolInfo } = this.props;
    this.tempInput.concat(drawInput);
    updateToolInfo([]);
  };

  renderLine(x1, y1, x2, y2, color) {
    this.ctx.strokeStyle = color;
    this.ctx.globalCompositeOperation = "source-over";
    this.ctx.beginPath();
    this.ctx.moveTo(x1, y1);
    this.ctx.lineTo(x2, y2);
    this.ctx.lineWidth = 2;
    this.ctx.lineCap = "round";
    this.ctx.lineJoin = "round";
    this.ctx.stroke();
  }

  onMouseMove(e) {
    let canvas = document.getElementById("canvas");
    if (this.toolEnable) {
      let context = canvas.getContext("2d");
      context.globalCompositeOperation = "source-over";
      context.beginPath();
      context.moveTo(this.down.x, this.down.y);
      context.lineTo(
        e.clientX - canvas.getBoundingClientRect().left,
        e.clientY - canvas.getBoundingClientRect().top
      );
      context.strokeStyle = this.props.color;
      context.lineWidth = 2;
      context.lineCap = "round";
      context.lineJoin = "round";
      context.stroke();
      this.down.x = e.clientX - canvas.getBoundingClientRect().left;
      this.down.y = e.clientY - canvas.getBoundingClientRect().top;
      this.pencil.x.push(e.clientX - canvas.getBoundingClientRect().left);
      this.pencil.y.push(e.clientY - canvas.getBoundingClientRect().top);
    }
  }

  onMouseDown(e) {
    const { drawInput, updateToolInfo, color, tool } = this.props;
    const tempTool = {
      toolType: "",
      x: [],
      y: [],
      textContent: "",
      color: ""
    };
    this.toolEnable = true;
    const canvas = document.getElementById("canvas");
    this.down.x = e.clientX - canvas.getBoundingClientRect().left;
    this.down.y = e.clientY - canvas.getBoundingClientRect().top;

    if (tool === TOOL.PENCIL) {
      this.ctx = canvas.getContext("2d");
      this.ctx.fillStyle = color;
      tempTool.toolType = tool;
      tempTool.x.push(this.down.x);
      tempTool.y.push(this.down.y);
      tempTool.color = color;
      this.pencil = tempTool;
    }
    updateToolInfo([...drawInput, tempTool]);
  }

  updateToolInfo(e) {
    e.preventDefault();
    const { drawInput, updateToolInfo } = this.props;
    if (this.toolEnable) {
      updateToolInfo([...drawInput, this.pencil]);
    }
    this.pencil = {};
    this.toolEnable = false;
  }

  render() {
    const { width, height } = this.props;
    return (
      <canvas
        id='canvas'
        width={width}
        height={height}
        ref={el => (this.canvas = el)}
        onMouseMove={e => this.onMouseMove(e)}
        onMouseDown={e => this.onMouseDown(e)}
        onMouseLeave={e => this.updateToolInfo(e)}
        onMouseUp={e => this.updateToolInfo(e)}
      >
        This is not supported
      </canvas>
    );
  }
}
