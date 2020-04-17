import React, { Component } from "react";
import {Form, Button, Message} from 'semantic-ui-react'
import axios from 'axios';

class Register extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      email: "",
      password: "",
      password2: "",
      zipCode: "",
      errors: {},
      success: false
    
    };
  }
onChange = e => {
    this.setState({ [e.target.id]: e.target.value, errors: {}, formError: false });
  };

onSubmit = e => {

this.setState({isLoading: true, success: false});

const newUser = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2,
      zipCode: this.state.zipCode
    };

    axios.post('/user/register', newUser)
    .then((response) => {
     if (response.status === 200)
       this.setState({isLoading: false, formSuccess: true, formError: false, errors: ""});
    })
    .catch((error) => {
      this.setState({isLoading: false})
      console.log(error.response.data);
      this.setState({errors: error.response.data, formError: true, formSuccess: false})
    });
  };

render() {
    const { errors, formError, isLoading, formSuccess} = this.state;
return (
        <div className="w3-row w3-center" >
          <div className=" w3-container">
          <Form error={formError} loading={isLoading} success={formSuccess} autoComplete="on">
                <Form.Field>
                    <Form.Input required={true} 
                    label="Name"
                    onChange={this.onChange}
                    value={this.state.name}
                    error={errors.name}
                    id="name"
                    type="text"
                    className="w3-input"
                    autoComplete="name"
                    />
                </Form.Field>
                <Form.Field>
                  <Form.Input required={true} 
                  label="Email"
                  onChange={this.onChange}
                  value={this.state.email}
                  error={errors.email}
                  id="email"
                  type="email" 
                  autoComplete="email"
                  />
                </Form.Field>
              <Form.Field >
                <Form.Input 
                label="ZipCode"
                required={true}
                onChange={this.onChange}
                value={this.state.zipCode}
                error={errors.zipCode}
                id="zipCode"
                type="number"
                className="w3-input"
                autoComplete="postal-code"
                />
              </Form.Field>

              <Form.Field>
                <Form.Input 
                  label="Password"
                  required={true}
                   onChange={this.onChange}
                  value={this.state.password}
                  error={errors.password}
                  id="password"
                  type="password"
                  className="w3-input"
                  autoComplete="new-password"/>
              </Form.Field>
              <Form.Field>
                <Form.Input 
                  label="Confirm Password"
                  required={true}
                   onChange={this.onChange}
                  value={this.state.password2}
                  error={errors.password2}
                  id="password2"
                  type="password"
                  className="w3-input"
                  autoComplete="new-password"/>
              </Form.Field>
              <Message
                      success
                      header='Form Completed'
                      content="You're all signed up for the Weather Summary Email"
                    />
              <Button type='submit' style={{
                    width: "150px",
                    borderRadius: "3px",
                    letterSpacing: "1.5px",
                    marginTop: "1rem"
                  }}
                  className="w3-btn w3-btn-large"
                  onClick={this.onSubmit}>Submit</Button>
                  
            </Form>
          </div>
        </div>
    );
  }
}
export default Register;