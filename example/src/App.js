import React, { Component } from "react";
import styles from "./style/App.module.scss";
import Sketch, { TOOL } from "canvas-sketch";

class App extends Component {
  state = {
    drawInput: [],
    tool: TOOL.PENCIL,
    color: "#234494"
  };

  updateToolInfo = data => {
    this.setState({ drawInput: data });
  };

  render() {
    const { color, tool, drawInput } = this.state;
    return (
      <div className={styles.container}>
        <div className={styles.toolsPanel}>
          <div className='col-12'>
            <div className='mt1 col-12 align-center'>
              <div>Color</div>
              <input
                type='color'
                className='mx-auto color-picker'
                name='colorPicker'
                title='Color Picker'
                value={color}
                onChange={e => this.setState({ color: e.target.value })}
              />
            </div>

            <div className='mt1 col-12 align-center'>
              <div>Clear</div>
              <button onClick={() => this.sketch.eraseAll()}>Erase</button>
            </div>

            <div className='mt1 col-12 align-center'>
              <div>UN DO</div>
              <button onClick={() => this.sketch.unDo()}>{`<-`}</button>
            </div>
            <div className='mt1 col-12 align-center'>
              <div>RE DO</div>
              <button onClick={() => this.sketch.reDo()}>{`->`}</button>
            </div>
          </div>
        </div>
        <div className={styles.sketch}>
          <Sketch
            ref={e => (this.sketch = e)}
            tool={tool}
            color={color}
            drawInput={drawInput}
            updateToolInfo={this.updateToolInfo}
          />
        </div>
      </div>
    );
  }
}

export default App;
