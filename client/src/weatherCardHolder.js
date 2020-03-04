import React from  'react';
import Weathercard from './weatherCard.js';
import mySvg from './Spinner-1s-200px.svg';


export default class weatherCardHolder extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        error: null,
        isLoaded: false,
        items: []
      };
    }
  
    componentDidMount() {
      fetch('https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/45c728b209f56c190b3e3f3078aa6812/53.3498,-6.2603?exclude=currently,flags,minutely')
        .then(res => {return res.json();})
        .then(
          (result) => {
            console.log(result.hourly);
  
            this.setState({
            isLoaded: true,
            items: result.hourly.data.slice(24)
            });
          },
          // Note: it's important to handle errors here
          // instead of a catch() block so that we don't swallow
          // exceptions from actual bugs in components.
          (error) => {
            console.log(error);
          }
        )
    }
  
    render() {
      const { error, isLoaded, items } = this.state;
      if (error) {
        return <div>Error: {error.message}</div>;
      } 
      else if (!isLoaded) {
        return <div>
                 <img src={mySvg} />
             </div>;
      } else {
        return (
          <div className="scrollmenu">
            <div className="w3-container-fluid">
            {items.map((item) =>{
                return <Weathercard cast={item}/>
               })}
            </div>
        </div>
        );
      }
    }
  }