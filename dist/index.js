'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var React = _interopDefault(require('react'));
var PropTypes = _interopDefault(require('prop-types'));

var TOOL = {
  PENCIL: "pencil",
  ERASE: "erase",
  TEXT: "text"
};

var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

var createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();

var inherits = function (subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
};

var possibleConstructorReturn = function (self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && (typeof call === "object" || typeof call === "function") ? call : self;
};

var toConsumableArray = function (arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];

    return arr2;
  } else {
    return Array.from(arr);
  }
};

var Sketch = function (_React$Component) {
  inherits(Sketch, _React$Component);

  function Sketch(props) {
    classCallCheck(this, Sketch);

    var _this = possibleConstructorReturn(this, (Sketch.__proto__ || Object.getPrototypeOf(Sketch)).call(this, props));

    _this.eraseAll = function () {
      var _this$props = _this.props,
          drawInput = _this$props.drawInput,
          updateToolInfo = _this$props.updateToolInfo;

      _this.tempInput.concat(drawInput);
      updateToolInfo([]);
    };

    _this.down = { x: "", y: "" };
    _this.pencil = {};
    _this.ctx = {};
    _this.canvas = {};
    _this.toolEnable = false;
    _this.tempInput = [];
    return _this;
  }

  createClass(Sketch, [{
    key: "componentDidMount",


    //initial rendering in the lines in UI
    value: function componentDidMount() {
      var _this2 = this;

      this.canvas = document.getElementById("canvas");
      this.ctx = this.canvas.getContext("2d");
      var drawInput = this.props.drawInput;

      var pencilTools = drawInput.filter(function (tool) {
        return tool.toolType === TOOL.PENCIL;
      });

      pencilTools.forEach(function (tool) {
        for (var i = 0; i < tool.x.length - 1; i++) {
          _this2.renderLine(tool.x[i], tool.y[i], tool.x[i + 1], tool.y[i + 1], tool.color);
        }
      });
    }

    //clear canvas context

  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    //every update of the component will be clear canvas and redraw it

  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate() {
      var _this3 = this;

      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      var drawInput = this.props.drawInput;

      var pencilTools = drawInput.filter(function (tool) {
        return tool.toolType === TOOL.PENCIL;
      });
      pencilTools.forEach(function (tool) {
        for (var i = 0; i < tool.x.length - 1; i++) {
          _this3.renderLine(tool.x[i], tool.y[i], tool.x[i + 1], tool.y[i + 1], tool.color);
        }
      });
    }
  }, {
    key: "unDo",
    value: function unDo() {
      var _props = this.props,
          drawInput = _props.drawInput,
          updateToolInfo = _props.updateToolInfo;

      if (drawInput.length > 0) {
        this.tempInput.push(drawInput[drawInput.length - 1]);
        var data = drawInput.lenght === 1 ? [] : drawInput.slice(0, drawInput.length - 2);
        updateToolInfo(data);
      }
    }
  }, {
    key: "reDo",
    value: function reDo() {
      var _props2 = this.props,
          drawInput = _props2.drawInput,
          updateToolInfo = _props2.updateToolInfo;

      if (this.tempInput.length > 0) {
        var data = this.tempInput.pop();
        updateToolInfo([].concat(toConsumableArray(drawInput), [data]));
      }
    }
  }, {
    key: "renderLine",
    value: function renderLine(x1, y1, x2, y2, color) {
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
  }, {
    key: "onMouseMove",
    value: function onMouseMove(e) {
      var canvas = document.getElementById("canvas");
      if (this.toolEnable) {
        var context = canvas.getContext("2d");
        context.globalCompositeOperation = "source-over";
        context.beginPath();
        context.moveTo(this.down.x, this.down.y);
        context.lineTo(e.clientX - canvas.getBoundingClientRect().left, e.clientY - canvas.getBoundingClientRect().top);
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
  }, {
    key: "onMouseDown",
    value: function onMouseDown(e) {
      var _props3 = this.props,
          drawInput = _props3.drawInput,
          updateToolInfo = _props3.updateToolInfo,
          color = _props3.color,
          tool = _props3.tool;

      var tempTool = {
        toolType: "",
        x: [],
        y: [],
        textContent: "",
        color: ""
      };
      this.toolEnable = true;
      var canvas = document.getElementById("canvas");
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
      updateToolInfo([].concat(toConsumableArray(drawInput), [tempTool]));
    }
  }, {
    key: "updateToolInfo",
    value: function updateToolInfo(e) {
      e.preventDefault();
      var _props4 = this.props,
          drawInput = _props4.drawInput,
          updateToolInfo = _props4.updateToolInfo;

      if (this.toolEnable) {
        updateToolInfo([].concat(toConsumableArray(drawInput), [this.pencil]));
      }
      this.pencil = {};
      this.toolEnable = false;
    }
  }, {
    key: "render",
    value: function render() {
      var _this4 = this;

      var _props5 = this.props,
          width = _props5.width,
          height = _props5.height;

      return React.createElement(
        "canvas",
        {
          id: "canvas",
          width: width,
          height: height,
          ref: function ref(el) {
            return _this4.canvas = el;
          },
          onMouseMove: function onMouseMove(e) {
            return _this4.onMouseMove(e);
          },
          onMouseDown: function onMouseDown(e) {
            return _this4.onMouseDown(e);
          },
          onMouseLeave: function onMouseLeave(e) {
            return _this4.updateToolInfo(e);
          },
          onMouseUp: function onMouseUp(e) {
            return _this4.updateToolInfo(e);
          }
        },
        "This is not supported"
      );
    }
  }]);
  return Sketch;
}(React.Component);

Sketch.defaultProps = {
  width: window.innerWidth * 0.9,
  height: window.innerHeight,
  updateToolInfo: function updateToolInfo() {}
};
Sketch.propTypes = {
  drawInput: PropTypes.array,
  updateToolInfo: PropTypes.func,
  color: PropTypes.string,
  tool: PropTypes.string,
  width: PropTypes.number,
  height: PropTypes.number
};

exports.TOOL = TOOL;
exports.default = Sketch;
//# sourceMappingURL=index.js.map
