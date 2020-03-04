import React from 'react';
import ReactDOM from 'react-dom';
import Nav from './navbar';
import App from './App';
import WeatherCardHolder from './weatherCardHolder.js';
import WeatherCard from './weatherCard';
import * as serviceWorker from './serviceWorker';



ReactDOM.render(
<div>
<Nav />
<WeatherCardHolder/>
</div>
, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
