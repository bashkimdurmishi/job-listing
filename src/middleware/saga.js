import { all } from 'redux-saga/effects'
import authSaga from "../redux/user/saga";
import jobsSaga from '../redux/jobs/saga';
import applicantsSaga from '../redux/applicants/saga';

export default function* rootSaga() {
    yield all([
        authSaga(),
        jobsSaga(),
        applicantsSaga(),
    ])
}