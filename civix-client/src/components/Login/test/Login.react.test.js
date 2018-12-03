import React from 'react';
import Login from '../Login.js';
import { shallow, mount, render } from 'enzyme';
import renderer from 'react-test-renderer';
import { Button, Form, FormGroup, Input, Alert } from "reactstrap";
import PropTypes from 'prop-types';
describe('Login Component', () => {
  it('should render without throwing an error', () => {
    const myMock = jest.fn();
    const wrapper = shallow(<FormGroup className="form-group">
      <Input
        className="form-control"
        type="text"
        name="username"
        required
        placeholder="Username"
      />
    </FormGroup>);
    expect(wrapper.type()).toBe('div');
   })
   it('should respond to change event and change the state of the Login Component', () => {
     const wrapper = shallow(<Login/>)
     wrapper.find('#password').simulate('change', {target: {name: 'password', value: 'cats'}})
     expect(wrapper.state('password')).toEqual('cats')
    })

})
