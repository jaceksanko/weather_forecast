import {
    GET_WEATHER_START,
    GET_WEATHER_DONE,
    GET_WEATHER_ERROR
} from "./actionsCreator";

const rootReducer = (state, action) => {
    switch (action.type) {
        case GET_WEATHER_START:
            return {
                ...state,
                isLoading: true,
            }
        case GET_WEATHER_DONE:
            return {
                ...state,
                isLoading: false,
                weather: action.payload,
                error: null
        }
        case GET_WEATHER_ERROR:
            return {
                ...state,
                isLoading: false,
                isError: true,
                error: action.payload.error
            }
        default:
            return state
    }
}


export default rootReducer;