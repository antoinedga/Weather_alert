import React from 'react';

function msToTime(duration) {
var temp = new Date(duration * 1000);
  return   + "\n"+temp.getHours() + ":" + ( "0" + temp.getMinutes());
}

function weatherCard(props) {

  return (
    <div className="w3-card w3-col l2 m3 s4 w3-margin">
      <header className="w3-container w3-blue">
        <h1 className="w3-right">{msToTime(props.cast.time)}</h1>
      </header>

      <div className="w3-container">
        <div className="w3-center w3-xxlarge">{Math.round(props.cast.temperature)}<span>&#8457;</span></div>
      </div>

      <footer className="w3-container w3-blue w3-large">
        <span className="w3-left">precipProbability:{(props.cast.precipProbability * 100) + "%"}</span>
      </footer>
    </div>
  );
}

export default weatherCard;
