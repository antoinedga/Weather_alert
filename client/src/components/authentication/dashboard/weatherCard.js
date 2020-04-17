import React from 'react';
import '../../../css/weatherCard.css'

function msToTime(duration) {

  var temp = new Date(duration * 1000);
  var hour = temp.getHours();
  var time_day = true;

  if (hour > 12) {
    time_day = false;
    hour = hour - 12;
  }
  if( hour === 12)
      time_day = false;

  if (hour === 0) {
    hour = 12;
    time_day = true;
  }
 

  return ((hour + ":00") + ((time_day) ? "am" : "pm"));
}

function weatherCard(props) {

  return (
    
    <div className="w3-container-fluid w3-col l3 m4 s6 w3-padding">
      <div className="w3-card">
            <header className="w3-container w3-padding w3-blue">
              <h1 className="w3-right">{msToTime(props.cast.time)}</h1>
            </header>

            <div className="w3-container w3-center temp">
              {Math.round(props.cast.temperature)}<span>&#8457;</span>
            </div>

            <footer className="w3-container w3-padding w3-blue">
              <p>precip Probability<br/>{(Math.round(props.cast.precipProbability * 100)) + "%"}</p>
            </footer>
      </div>
    </div>

  );
}

export default weatherCard;
