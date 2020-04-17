import React from 'react';
import { Button,Modal, Icon, Checkbox, Portal, Header, Segment,} from 'semantic-ui-react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';

var init_status= [];

// offical component for configure hours, hours_side.js was a testing ground
for (var i = 0; i < 24;i++)
    init_status.splice(i, 0, false);
    
 class HoursCheckBox extends React.Component {

    constructor(props) {
      super(props);

        this.state = {
            current_status: [...init_status],
            prev_hours: [],
            showModal: false,
            open: false,
            STATUS_ERROR: false
        }
        
        this.checkboxChangeHandler = this.checkboxChangeHandler.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
  

    componentDidMount() {
        axios.get('/api/hours/user_hour').then((result) => {
            var opt_temp = result.data.users_opt.hours;
            return opt_temp;
        }).then((data) => {

            for( var i = 0; i < data.length; i++) {
                init_status[data[i]] = true;
            }

            this.setState({
                current_status: [...init_status],
                prev_hours: [...init_status],
                showModal: false,
            });

        }).catch((error) => {
            console.log(error);
        });
    }


    checkboxChangeHandler = (event: React.FormEvent<HTMLInputElement>, data) => {
        const index = data.name;
        var temp = this.state.current_status
        temp[index] = !temp[index];
        
        this.setState({ current_status : temp });
      };

    closeModal = () => {
        this.setState({ showModal: false, current_status: this.state.prev_hours })
      }
  
      handleOpen = () => {
        this.setState({ open: true })
      }
    
      handleClose = () => {
        this.setState({ open: false })
      }
  
    handleSubmit(event) {
        
    event.preventDefault();
     var hourOptIn = [];
     var temp = this.state.current_status;
     for( var i = 0; i < 24; i++) {
        if(temp[i] === true)
            hourOptIn.push(i);
     }
     
     axios.put('/api/hours/update_hours', {hours_opt: hourOptIn})
     .then((result) => {
         this.setState({showModal: false, current_status: temp, open: true, STATUS_ERROR: true});
        console.log(result);
     }).catch((err) => {
       if (err.response.status === 401) {
          this.setState({redirect: true})
        }
        this.setState({showModal: false, current_status: temp, open: true, STATUS_ERROR: false});
        console.log(err);
     });

    }
   
  render() {
    const { current_status,
        showModal, open, STATUS_ERROR 
      } = this.state;
      
      if (this.state.redirect) {
        return <Redirect to={{
          pathname: "/login",
          state: {msg: "Need to Re-Authenticate to access dashboard again"}
        }} />
      }
    return (
    <div>   
            <Modal closeIcon className="dash_button" closeOnEscape={false} 
            onClose={this.closeModal} open={showModal}  closeOnDimmerClick={false} trigger={<Button style={{margin: 10}} fluid onClick={() => this.setState({ showModal: true })}><Icon className='plus' />Edit Hours</Button>}>
                
            <Modal.Header>Hours to be notified</Modal.Header>
            <Modal.Content>
            
            <Modal.Description className="w3-row">
            {current_status.map((value, index) => {
                return <Checkbox key={index}
                label={(((index) % 24) + ":00") + ((index < 12) ? "am" : "pm")}
                name={index + ""}
                className="w3-col l4 m4 s4 w3-padding"
                toggle
                checked={value}
                onChange={this.checkboxChangeHandler}
            />
                })}
            </Modal.Description>
            </Modal.Content>
            <Modal.Actions>
            <Button color='red' onClick={this.closeModal}>
                <Icon name='remove' /> Cancel
            </Button>
            <Button color='green' onClick={this.handleSubmit}>
                <Icon name='checkmark' />Save
            </Button>
            </Modal.Actions>
        </Modal>
        <Portal
            
            onOpen={this.handleOpen}
            onClose={this.handleClose}
            open={open}
          >
            <Segment
              style={{
                left: '40%',
                position: 'fixed',
                top: '50%',
                zIndex: 1000,
              }}
            >
              <Header>{(STATUS_ERROR) ? 'Successfully Updated' : 'ERROR IN UPDATE, PLEASE TRY AGAIN LATER'} </Header>
            </Segment>
        </Portal>

  </div> 
    );
  }
}

export default HoursCheckBox;