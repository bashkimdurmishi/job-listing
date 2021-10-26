import {combineReducers} from "redux";
import user from "./user/reducer";
import jobs from "./jobs/reducer";
import applicants from "./applicants/reducer";

const reducers = combineReducers({
    user,
    jobs,
    applicants,
});

export default reducers;