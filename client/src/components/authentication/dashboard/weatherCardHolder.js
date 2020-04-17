import React from  'react';
import Weathercard from './weatherCard.js';
import mySvg from './Spinner-1s-200px.svg';
import '../../../css/dashboard.css';


export default class weatherCardHolder extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        error: null,
        isLoaded: false,
        items: []
      };
    }

    static getDerivedStateFromProps(nextProps, state) {

      return {items: nextProps.hours, isLoaded : true}
    }
  
  
    render() {
      const style = {
        marginLeft: '25%',
        marginRight: '40px'
      }
      const { error, isLoaded, items } = this.state;
      if (error) {
        return <div>Error: {error.message}</div>;
      } 
      else if (!isLoaded) {
        return <div className="w3-container-fluid" style={style}>
                  <div className="w3-row w3-center">
                    <img src={mySvg} alt="loading"/>
                  </div>
               </div>;
            
      } else {
        return (
          <div className="w3-container" style={{marginTop: 30}} id="showcase">
            <div className="scrollmenu w3-row-padding">
              
                {items.map((item, index) =>{
                    return <Weathercard cast={item} key={index}/>
                  })}
          </div>
        </div>
        );
      }
    }
  }