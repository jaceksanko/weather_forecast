export const GET_WEATHER_START = 'GET_WEATHER_START';
export const GET_WEATHER_DONE = 'GET_WEATHER_DONE';
export const GET_WEATHER_ERROR = 'GET_WEATHER_ERROR';

export const getWeatherStart = () => ({
    type: GET_WEATHER_START
})

export const getWeatherDone = (data) => ({
    type: GET_WEATHER_DONE,
    payload: data
})

export const getWeatherError = (error) => ({
    type: GET_WEATHER_ERROR,
    payload: error
})

export const fetchData = (apiUrl = `http://api.weatherapi.com/v1/forecast.json?key=${process.env.API_KEY}&q=Warszawa&days=3`) => {
    return dispatch => {
        dispatch(getWeatherStart());
        fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                data.error ? dispatch(getWeatherError(data)) : dispatch(getWeatherDone(data));
            })
            .catch(error => {
                dispatch(getWeatherError(error));
            })
    }
}