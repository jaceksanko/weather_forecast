import React from "react";
import {connect} from "react-redux";

function FirstDayForecast(props) {
    const forecastObject = props.weather.forecast.forecastday[1]

    return <div>
        <h2>{props.firstDayName} forecast</h2>

        <p className="city-name">{props.weather.location.name}</p>
        <p>{forecastObject.day.avgtemp_c} &#176;C</p>
        <div>
            <p>{forecastObject.day.condition.text}</p>
            <img src={forecastObject.day.condition.icon} alt="weather-icon"/>
        </div>
    </div>
}

const mapStateToProps = state => ({
    weather: state.weather
});


export default connect(mapStateToProps)(FirstDayForecast);