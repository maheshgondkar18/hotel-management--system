import React from "react";
import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import Login from "../components/login";

Enzyme.configure({adapter: new Adapter() });

describe("<LogIn />", () => {
    let wrapper;
    const setState = jest.fn();
    const useStateSpy = jest.spyOn(React, "useState")
    useStateSpy.mockImplementation((init) => [init, setState]);

    beforeEach(() => {
        wrapper = Enzyme.mount(Enzyme.shallow(<NewPost=== />).get(0))
    });

    afterEach(() => {
        jest.clearAllMocks();
    });