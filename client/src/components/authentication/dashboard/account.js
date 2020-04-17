import React, { Component } from 'react';
import {Redirect} from 'react-router-dom';
import { Button, Icon, Modal, Input, Form, Message} from 'semantic-ui-react';
import Axios from 'axios';



class Delete extends Component {
  state = { open: false,
  success: false,
  error_password : false,
  redirect: false
  }

  open = () => this.setState({ open: true })
  close = () => this.setState({ open: false })

  onSubmit = () => {
    Axios.delete('/user/deleteAccount')
    .then((result) => {
      this.setState({error_password: false, success: true})
      setTimeout(() => {
        this.setState({error_password: false, success: false, open: false, redirect: true})
      } , 3000);
    })
    .catch((error) => {

      if (error.response.status === 401) {
        this.setState({redirect: true});
      }
      else {

          var temp = error.response.data.password;
        this.setState({error_password: true, error_response: temp})
        setTimeout(() => {
          this.setState({error_password: false, success: false, open: false})
        } , 3000);
        console.log(error);

      }
    });
   
  }


  render() {
    const { open, success, error_password, error_response } = this.state

    if(this.state.redirect) {
      return <Redirect to={{
        pathname: "/login",
        state: {msg: "Need to Re-Authenticate to Delete Account"}
      }} />
    }

    return (
      <Modal
        open={open}
        onOpen={this.open}
        onClose={this.close}
        size='small'
        closeOnEscape={false}
        closeOnDimmerClick={false }
        trigger={
          <Button floated='left' color='red' icon>
            Delete <Icon name='right chevron' />
          </Button>
        }
      >
        <Modal.Header>Deletion of Account</Modal.Header>
          <Modal.Content>
            Are you sure you want to delete your account?
            <Form error={error_password} success={success}>
                
              <Message
                style={{whiteSpace: 'pre-line'}}
                error
                header='Action Forbidden'
                content={error_response}
              />
              <Message
                success
                header='Successfully deleted'
                content="You will be redirected to login page in 3 seconds"
              />
           </Form>
          </Modal.Content>
        <Modal.Actions>
          <Button floated='left' content="Cancel" color='blue' onClick={this.close}/>
  
          <Button icon='check' content='Delete' onClick={this.onSubmit} />
        </Modal.Actions>
      </Modal>
    )
  }
}

class Password extends Component {
  state = { open: false,
  success: false,
  error_password : false,
  error_response: "",
  password: '',
  password2: '', 
  redirect: false}

  open = () => this.setState({ open: true })
  close = () => this.setState({ open: false })

  onSubmitEmail = () => {
    var temp = this.state.password;
    var temp2 = this.state.password2
   
    Axios.post('/user/updatePassword', {password: temp,
      password2: temp2})
    .then((result) => {
      this.setState({error_password: false, success: true})
      setTimeout(() => {
        this.setState({error_password: false, success: false, open: false})
      } , 3000);
    })
    .catch((error) => {
      if (error.response.status === 401) {
        this.setState({redirect: true});
      }
      else {
        var temp = error.response.data.password;
        this.setState({error_password: true, error_response: temp})
        console.log(error);

      }

    });
   
  }

  onChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };

  


  render() {
    const { open, success, error_password, error_response } = this.state
    if(this.state.redirect) {
      return <Redirect to={{
        pathname: "/login",
        state: {msg: "Need to Re-Authenticate to change password"}
      }} />
    }

    return (
      <Modal
        open={open}
        onOpen={this.open}
        onClose={this.close}
        size='small'
        trigger={
          <Button primary icon>
            Change Password <Icon name='right chevron' />
          </Button>
        }
      >
        <Modal.Header>Changing Password</Modal.Header>
          <Modal.Content>
            
            <Form error={error_password} success={success}>
                <Form.Field >
                  <label>Enter new Password</label>
                  <input id='password' type='password' placeholder='New Password' onChange={this.onChange} autocomplete="new-password"/>
                </Form.Field>
                <Form.Field >
                  <label>Confirm new Password</label>
                  <input id='password2' type='password' placeholder='Confirm Password' onChange={this.onChange} autocomplete="new-password"/>
                </Form.Field>
            <Message
              style={{whiteSpace: 'pre-line'}}
              error
              header='Action Forbidden'
              content={error_response}
            />
            <Message
              success
              header='Successful Update'
              content="Password changed"
            />
           </Form>
          </Modal.Content>
        <Modal.Actions>
          <Button icon='check' content='Submit New Email' onClick={this.onSubmitEmail} />
        </Modal.Actions>
      </Modal>
    )
  }
}

class Accounts extends Component {

  constructor(props) {
    super(props);
    this.state = {
     
    };
  }
  
componentDidMount() {
  this.setState({email: this.props.email, name: this.props.email})
}

componentWillReceiveProps(nextProps) {
  this.setState({email: nextProps.user.email, name: nextProps.user.name}) 
}

  render(){
    return (
      <Modal closeIcon size="large" trigger={<Button style={{margin: 10}}  fluid><Icon name='user' /> Account</Button>}>
        <Modal.Header><Icon name='user' />Account Information</Modal.Header>
        <Modal.Content>
          <Form>
            <Form.Field >
              <label>Name</label>
              <Input  defaultValue={this.state.name} readOnly/>
            </Form.Field>
            <Form.Field>
              <label>Email</label>
              <Input defaultValue={this.state.email} readOnly/>
            </Form.Field>
          </Form>
        </Modal.Content>
        <Modal.Actions>
          <Password />
          <Delete />
        </Modal.Actions>
      </Modal>
    )
  }
      
};

export default Accounts
