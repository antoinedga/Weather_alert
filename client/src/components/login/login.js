import React, { Component } from "react";
import { Redirect, Link } from "react-router-dom";
import axios from 'axios';
import {
  Button,
  Form, Message
} from 'semantic-ui-react'

class Login extends Component {

  constructor(props) {
    super(props);
    console.log(this.props);
    console.log(this.props.location.state);
    this.state = {
      email: "",
      password: "",
      error_s: false,
      msg: "",
      auth: false,
      isloading: false
    };
  }


  componentDidMount() { 
    // var temp = this.props.location.state.msg;
    // var location = this.props.location.state.logged;

    // if (location) {
    //   this.setState({msg: temp, success_status: true})
    // }

    // else if (temp) {
    //   this.setState({msg: temp, error_s: true })
    // }

  }

componentWillReceiveProps(nextProps) {
  console.log(nextProps);
}


onChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };

onSubmit = e => {
    // e.preventDefault();
this.setState({isloading: true});
const userData = {
      email: this.state.email,
      password: this.state.password
    };

    axios.post('/user/login', userData)
      .then((response) => {
       if (response.status === 200)
          this.setState({auth: true});
      })
      .catch((error) => {
        console.log(error);
        if (error.response.status === 401) {
          this.setState({msg: "INCORRECT CREDENTIAL", error_s: true, isloading: false})
        }
          
        if (error.response.status === 404)
          this.setState({msg: "NO ACCOUNT UNDER THAT EMAIL", error_s: true, isloading: false})
      });
      

  };

render() {
    const { error_s, msg, isloading, success_status } = this.state;
return (this.state.auth) ? <Redirect to="/dashboard"/>:(
<div className="w3-container " style={{width: '100vw', margin: 'auto', height: '100vh'}}>
  <Form loading={isloading} error={error_s} success={success_status} style={{width: '45vw', margin: 'auto'}} className="w3-panel w3-card-4 w3-text-blue w3-padding-64">
    <Form.Field required>
      <label>Email</label>
      <input
          className="w3-input"      
          onChange={this.onChange}
          value={this.state.email}
          id="email"
          type="email"
          autocomplete="email"
      />
    </Form.Field>
    <Form.Field required>
      <label>Password</label>
      <input
          className="w3-input"
          onChange={this.onChange}
          value={this.state.password}
          id="password"
          type="password"
          autocomplete="current-password"
      />
    </Form.Field>
    <Form.Field>
    <Button type='submit' onClick={() => this.onSubmit()}>Login</Button>
    <Button floated='right' ><Link to='/register'>Register</Link></Button>
    </Form.Field>
    <Message
      error
      header='Action Forbidden'
      content={msg}
    />
    <Message
      success
      header='Success'
      content={msg}
    />
  </Form>
</div>
    );
  }
}
export default Login;
