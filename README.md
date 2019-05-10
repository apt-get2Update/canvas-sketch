[![./docs/](./docs/Virdhi_Logo.svg)](http://www.virdhitechlab.in)

# [React canvas sketch](https://www.npmjs.com/package/@vhitech/canvas-sketch)

The project provides a react library, that helps build a free hand drawing board on top of HTML5 Canvas. 

![Sample Screen shot](./docs/demo-screenshot.png) 

Check out are **[Demo App](https://fir-view-e11aa.firebaseapp.com/)**


## Installation

For Yarn users

`yarn @vhitech/canvas-sketch`

For npm users

`npm i @vhitech/canvas-sketch`


## Usage

You can Import the library as shown below

```
import Sketch, { TOOL } from "@vhitech/canvas-sketch";
``` 

Maintain state variable to track the coordinates of the drawing

```
state = {
    drawInput: []
}

updateToolInfo = data => {
    this.setState({ drawInput: data });
};
  
```

Pass the state to Sketch. 
```
<div className={styles.sketch}>
  <Sketch
    ref={e => (this.sketch = e)}
    tool={TOOL.PENCIL}
    color="#234494"
    drawInput={drawInput}
    updateToolInfo={this.updateToolInfo}
  />
</div>

```

This would embed a HTML5 Canvas on which you will be able to draw. 
Check out our [example code](./example/src/App.js)

