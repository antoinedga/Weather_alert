import React from  'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import { Checkbox } from 'semantic-ui-react'

var status= [];
for (var i = 0; i < 24;i++)
    status.splice(i, 0, false);
    // the form for opt in hours for the modal
export default class hour_side extends React.Component {
  
    constructor(props) {
      super(props);
    
      this.state = {hours_opt: [...status]}

      this.checkboxChangeHandler = this.checkboxChangeHandler.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }


    componentDidMount() {

      axios.get('/api/hours/user_hour').then((result) => {
            var opt_temp = result.users_opt;
            for( var i = 0; i < opt_temp.length; i++) {
                status[opt_temp[i]] = true;
            }
            this.setState({hours_opt: [...status]})
            console.log(result);    
          
            }).catch((error) => {
              console.log(status);
            console.log(error);
            this.setState({hours_opt: [...status]});
          });
    }
  
    checkboxChangeHandler = (event: React.FormEvent<HTMLInputElement>, data) => {
        const index = data.name;
        status[index] = !status[index];
        
        this.setState({ hours_opt : [...status]});
        console.log(status); // It is giving undefined here
      };
  
     handleSubmit(event) {
    event.preventDefault();
     var hourOptIn = [];
     for( var i = 0; i < 24; i++) {
        if(this.state.hours_opt[i] === true)
            hourOptIn.push(i);
     }
     console.log(hourOptIn);
    }
  
   
  render() {
    console.log(this.state.hours_opt);
    return (
      <div>
        <form className="w3-row">

        {this.state.hours_opt.map((value, index) => {
        return <Checkbox
        label={(((index) % 24) + ":00") + ((index < 12) ? "am" : "pm")}
        name={index}
        className="w3-col l4 w3-padding"
        toggle
        checked={this.state.hours_opt[index]}
        onChange={this.checkboxChangeHandler}
      />
        })}
        
        </form>
      </div>
    );
  }
}