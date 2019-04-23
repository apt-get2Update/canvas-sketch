import React from "react";
import { configure, shallow } from "enzyme";
import App from "../../component/App";
import Adapter from "enzyme-adapter-react-16";
configure({ adapter: new Adapter() });

describe("Should mount without Error", () => {
  const component = shallow(<App />);
  it("renders without error", () => {
    expect(component).toMatchSnapshot();
  });
  it("always renders a div", () => {
    expect(component.find("div").length).toBeGreaterThan(0);
  });
});
