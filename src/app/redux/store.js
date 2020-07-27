import { createStore, applyMiddleware } from 'redux'
import thunk from  'redux-thunk'
import { createLogger } from 'redux-logger'
import { rootReducer } from './reducers'

const logger = createLogger()

function GuardarLocalStorage(state) {
    try {
      //console.log(state);
      const serializedState = JSON.stringify(state);
      //console.log("Aquí todo bien");
      localStorage.setItem("state", serializedState);
    } catch (e) {
      //console.log("Hay un error D:");
      console.log(e);
    }
}
function CargarLocalStorage() {
    try {
      const serializedState = localStorage.getItem("state")
      if (serializedState === null) return undefined
      return JSON.parse(serializedState)
    } catch (e) {
      console.log(e)
      return undefined
    }
}
const persistedState = CargarLocalStorage()

const store = createStore(
    rootReducer,persistedState,
    applyMiddleware(
        thunk,
        logger
    )
);

store.subscribe(() => GuardarLocalStorage(store.getState()))


export default store;