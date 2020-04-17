import React from  'react';
import Cookies from 'universal-cookie';
import { Redirect } from 'react-router-dom';
import WeatherDeck from './weatherCardHolder';
import ModalHours from './modalCongiHours';
import MinuteChart from './minuteChart';
import Account from './account';
import axios from 'axios';
import {Button} from 'semantic-ui-react';
import '../../../css/dashboard.css';

const cook = new Cookies();
export default class dashboard extends React.Component {

    constructor(props) {
      super(props);

    this.state = {
      forAccount: null,
      hourly: [],
      minutely: [],
      auth: (cook.get('access_token')) ? true: false
    }
  }
  
    componentDidMount() {

      // checks to see if a token exist, if it doesn't then it doesn't get userInformation
      // redundent but for security just in case
      if(cook.get('access_token')) {
        axios.get('/user/accountInfo').then((result) => {
          var temp = {
            name: result.data.name,
            email: result.data.email
          }

          // to set the states for account info and is authenticated
          this.setState({forAccount: temp, auth: true});
          this.weatherForecast(); // to call to get the initial data, will refresh with set interval
          // set Interval
          // will refresh every 15 minutes
          this.interval = setInterval(() => { console.log("refresh")
            this.weatherForecast() }, 900000);
  
        }).catch((err) => {
          console.log(err);
         
         if (err.response.status === 401)
          this.setState({forAccount: null, auth: false});
  
        });
    }
  }
  
  componentWillUnmount() {
    // Clear the interval right before component unmount
    clearInterval(this.interval);
}
  // api to get forecast for minutely and hourly
  weatherForecast() {

    axios.get('/api/weather/forecast')
      .then(result => {return result})
      .then(
        (result) => {

          this.setState({
          isLoaded: true,
          hourly: result.data.hour,
          minutely: result.data.minute
          });
        }).catch((error) => {
          console.log(error);

          if (error.response.status === 401)
            this.setState({forAccount: null, auth: false});

        }
      );
    }


    onLogOut() {
      cook.remove('access_token');
      console.log("logout called");
      this.setState({ loggedOut: true});
    }

     w3_open() {
      document.getElementById("mySidebar").style.display = "block";
      document.getElementById("myOverlay").style.display = "block";
    }
    
     w3_close() {
      document.getElementById("mySidebar").style.display = "none";
      document.getElementById("myOverlay").style.display = "none";
    }

    
    render() {

    const {forAccount, hourly, minutely, auth, loggedOut} = this.state;
      // if someone tries to access the account prior, to signing in, safety net just in case due to the privateRouter I created
      if (!auth) {
        return (<Redirect to={{
          pathname: "/login",
          state: {msg: "Need to sign in before accessing dashboard"}
        }}/>)
        
      } // Successfully logged out with redirect and msg
      else if (loggedOut) {
        return (<Redirect to={{
          pathname: "/login",
          state: {msg: "logged out Successfully"}
        }}/>)
        
      } // if cookie expires while log in and check on next refresh
      else if( (cook.get('access_token') === null ||  cook.get('access_token') === undefined))
        return <Redirect to={{
          pathname: "/login",
          state: {msg: "Need to Re-Authenticate to access dashboard again"}
        }} />;
      else
        return (
    <div>
        <nav className="w3-sidebar w3-blue w3-collapse w3-top w3-large w3-padding" style={{zIndex: 3, width: 300, fontWeight: 'bold'}} id="mySidebar"><br/>
        
            <button onClick={this.w3_close} className="w3-button w3-hide-large w3-display-topleft" style={{width: '100%', fontSize: 22}}>Close Menu</button>
            <div className="w3-container">
                <h3 className="w3-padding-64"><b>Weather<br/>Summary<br/>Email</b></h3>
            </div>
            <div className="w3-bar-block">
              <Button style={{margin: 10}} fluid onClick={() => this.onLogOut()}>Logout</Button>
              <ModalHours/>
              <Account user={forAccount}/>
            </div>

        </nav>

          <header className="w3-container w3-top w3-hide-large w3-blue w3-xlarge w3-padding">
              <button  className="w3-button w3-blue w3-margin-right" onClick={this.w3_open}>☰</button>
              <span>Weather Summary Email</span>
          </header>

          <div className="w3-overlay w3-hide-large" onClick={this.w3_close} style={{cursor:"pointer"}} title="close side menu" id="myOverlay"></div>


            <div className="w3-main" style={{marginLeft: 340, marginRight: 40}}>
                <WeatherDeck hours={hourly}/>
                <MinuteChart minutely={minutely}/>
            </div>
        
      </div>
      
        );
      }
    }
