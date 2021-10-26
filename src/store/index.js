import { applyMiddleware, createStore, compose } from "redux";
import reducers from "../redux/index";
import rootSaga from "../middleware/saga";
import createSagaMiddleware from 'redux-saga';


const sagaMiddleware = createSagaMiddleware();
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(reducers, composeEnhancers(applyMiddleware(sagaMiddleware)));
sagaMiddleware.run(rootSaga);

export default store;
