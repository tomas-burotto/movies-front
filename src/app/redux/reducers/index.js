import { combineReducers } from 'redux'
import authReducer from './authReducer'


// Se pueden agregar más reducers aquí:
export const rootReducer = combineReducers({
    auth: authReducer,
})