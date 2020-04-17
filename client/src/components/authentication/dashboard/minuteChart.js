import React from 'react';
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Legend, Tooltip
  } from 'recharts';
import mySvg from './Spinner-1s-200px.svg';


export default class Minutely extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            minuteData: null
            };
    }
    // for when a new update to the props occur to update the minute Chart
    componentWillReceiveProps(nextProps) {
        this.setState({minuteData: nextProps.minutely}) 
      }

    render() {
        const data = this.state.minuteData;
        const style = {
            height: '45vh',
          }
        // to have it not in military time
        var time = new Date();
        var minute = time.getMinutes();
        time = time.getHours()
        if (time > 12)
          time -= 12;
        
        // loading screen
        if (data === null) {
            return <div className="w3-container-fluid">
                      <div className="w3-row w3-center">
                        <img src={mySvg} alt="loading"/>
                      </div>
                   </div>;
                
          } else {
            // actual component
                return (
                    <div className="w3-padding-64 w3-container" style={style}>
                      <span><h1 style={{fontSize: '3.2vw'}}>Chance of Rain for the next hour</h1></span>
                        <p style={{fontSize: '2.5vw'}}>
                          Minute by Minute of chance of rain from <br/>
                          {time + ':' + minute} to {(time + 1)+ ':' + minute}
                        </p>
                        <div className="w3-row-padding" style={{height: '50vh'}}>
                            <ResponsiveContainer>
                                <LineChart data={data}>
                                    <Legend />
                                    <Tooltip/>
                                    <Line type="monotone" dataKey="precipProbability" stroke="#8884d8" />
                                    <CartesianGrid stroke="#ccc" />
                                    <XAxis interval={14}/>
                                    <YAxis dataKey="precipProbability" domain={[0,1]}/>
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                  </div>
                    
                )
        
        }
    }
} 