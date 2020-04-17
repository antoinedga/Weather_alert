import React from  'react';
import { Link } from "react-router-dom";

export default class landingPage extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        error: null,
        isLoaded: false,
      };
    }

 myFunction() {
  var x = document.getElementById("navDemo");
  if (x.className.indexOf("w3-show") === -1) {
    x.className += " w3-show";
  } else { 
    x.className = x.className.replace(" w3-show", "");
  }
}

  
    componentDidMount() {
  
        this.setState({
        isLoaded: true,
        });
    
    }
  
    render() {
      const { error, isLoaded} = this.state;
      if (error) {
        return <div>Error: {error.message}</div>;
      } 
      else if (!isLoaded) {
        return <div>
                
             </div>;
      } else {
        return (
<div>
           
    <div className="w3-top">
      <div className="w3-bar w3-blue w3-card w3-left-align w3-large">
        <button className="w3-bar-item w3-button w3-hide-medium w3-hide-large w3-right w3-padding-large w3-hover-white w3-large w3-blue"  onClick={this.myFunction} title="Toggle Navigation Menu"><i className="fa fa-bars"></i></button>
        <Link to='/login' className="w3-bar-item w3-button w3-hide-small w3-padding-large w3-hover-white">Login</Link>
        <Link to="register" className="w3-bar-item w3-button w3-hide-small w3-padding-large w3-hover-white">Register</Link>
      </div>

      <div id="navDemo" className="w3-bar-block w3-white w3-hide w3-hide-large w3-hide-medium w3-large">
        <Link to="login" className="w3-bar-item w3-button w3-padding-large">Login</Link>
        <Link to="register" className="w3-bar-item w3-button w3-padding-large">Register</Link>

      </div>
    </div>


    <header className="w3-container w3-blue w3-center" style={{padding: "128px 24px"}}>
      <h1 className="w3-margin w3-jumbo">Weather Summary Email</h1>
      <h3 className="w3-padding-64  w3-margin-top">Click the Register to get started!</h3>
    </header>


    <div className="w3-row-padding w3-padding-64 w3-container">
      <div className="w3-content">
        <div className="w3-twothird">
          <h1>Purpose</h1>

          <p className="w3-text-grey">The purpose of this Application is to send you a summary of the weather at a particular hour of the day before leaving your office or home. You can Opt in to as many Hours throughout the day as you please with the additional feature</p>
        </div>

        <div className="w3-third w3-center">
          <i className="fa fa-anchor w3-padding-64 w3-text-red"></i>
        </div>
      </div>
    </div>


        <footer className="w3-container w3-padding-64 w3-center w3-opacity">  
          <div className="w3-xlarge w3-padding-32">
            <i className="fa fa-facebook-official w3-hover-opacity"></i>
        </div>
        <p>Powered by <a href="https://www.w3schools.com/w3css/default.asp" rel="noopener noreferrer" target="_blank">w3.css</a></p>
        <p>Powered by <a href="https://www.darksky.net/dev" rel="noopener noreferrer" target="_blank">DarkSky</a></p>
        </footer>

</div>
        );
      }
    }
  };