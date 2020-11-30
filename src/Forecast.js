import React, {useEffect, useState} from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import styled from "styled-components";
import { connect } from "react-redux";
import {fetchData} from "./redux/actionsCreator"
import TodayForecast from "./TodayForecast"
import FirstDayForecast from "./FirstDayForecast";
import SecondDayForecast from "./SecondDayForecast";

const ForecastStyled = styled.div`
  text-align: center;
`;

const LinkStyled = styled.div`
    a {
        padding: 10px;
        text-decoration: none;
        font-size: 20px;
        color: blue;
    }
    margin: 10px
`;



function Forecast(props) {
    const [inputSearchValue, setInputSearchValue] = useState('');
    const [todayDayName, setTodayDayName] = useState('Today');
    const [firstDayName, setFirstDayName] = useState('');
    const [secondDayName, setSecondDayName] = useState('');


    useEffect(() => {
        setTodayDayName(getDayName(props.weather.forecast.forecastday[0].date))
        setFirstDayName(getDayName(props.weather.forecast.forecastday[1].date))
        setSecondDayName(getDayName(props.weather.forecast.forecastday[2].date))
    },[props.weather])

    const cityWeatherSearch =  () => {
        if (!inputSearchValue) {
            alert("Bad city name");
            return;
        }
        props.fetchData(`https://api.weatherapi.com/v1/forecast.json?key=${process.env.REACT_APP_API_KEY}&q=${inputSearchValue}&days=3`)

    }

    const getDayName = (date) => {
        const nowDate = new Date();
        const forecastDate = new Date(date);
        const options = { weekday: 'long'};
        const nowDateDayName = new Intl.DateTimeFormat('en-US', options).format(nowDate)
        const forecastDateDayName = new Intl.DateTimeFormat('en-US', options).format(forecastDate)

        return forecastDateDayName === nowDateDayName ? "Today" : forecastDateDayName;
    }


    return (
        <Router>
            <ForecastStyled>
                <h1>Weather forecast</h1>
                    <LinkStyled>
                        <Link to="/">Home</Link>
                        <Link to="/today">{todayDayName}</Link>
                        <Link to="/first-day">{firstDayName}</Link>
                        <Link to="/second-day">{secondDayName}</Link>
                    </LinkStyled>
                    <div>
                        <form onSubmit={e => {
                            e.preventDefault();
                            cityWeatherSearch();
                        }}>
                            <input value={inputSearchValue} onChange={e => setInputSearchValue(e.target.value)}/>{" "}
                            <input type="submit" value="Search"/>
                        </form>
                        <span className="error">
                            {props.error && props.error.message}
                        </span>
                    </div>
                    <Switch>
                        <Route path='/today'>
                            <TodayForecast todayDayName={todayDayName}/>
                        </Route>
                        <Route path='/first-day'>
                            <FirstDayForecast firstDayName={firstDayName}/>
                        </Route>
                        <Route path='/second-day'>
                            <SecondDayForecast secondDayName={secondDayName}/>
                        </Route>
                    </Switch>
                    <div>
                        <h2>Current weather</h2>

                        <p className="city-name">{props.weather.location.name}</p>
                        <p>{props.weather.current.temp_c} &#176;C</p>
                        <p>{props.weather.current.condition.text}</p>
                        <img src={props.weather.current.condition.icon} alt="weather-icon"/>

                    </div>
            </ForecastStyled>
        </Router>
    );
}
const mapStateToProps = state => ({
    weather: state.weather,
    error: state.error
});
const mapDispatchToProps = dispatch => ({
    fetchData: (apiUrl) => dispatch(fetchData(apiUrl))
});

export default connect(mapStateToProps, mapDispatchToProps)(Forecast);
