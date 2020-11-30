import React, {useEffect, useState} from "react";
import {
    BrowserRouter as Router,

} from "react-router-dom";
import styled from "styled-components";
import { connect } from "react-redux";
import {fetchData} from "./redux/actionsCreator"
import Forecast from "./Forecast";

const AppStyled = styled.div`
  text-align: center;
`;

function App(props) {
    useEffect(() => {
        props.fetchData()
    }, [])
  return (
      <Router>
        <AppStyled>
            {props.weather && <Forecast/>}
        </AppStyled>
      </Router>
  );
}
const mapStateToProps = state => ({
    weather: state.weather
});

const mapDispatchToProps = dispatch => ({
    fetchData: (apiUrl) => dispatch(fetchData(apiUrl))
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
