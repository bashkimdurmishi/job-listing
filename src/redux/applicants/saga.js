import axios from "axios";
import { takeEvery, fork, put, all, call } from "redux-saga/effects";

import {
  CREATE_JOB,
  EDIT_JOB,
  EDIT_USER,
  FILTER_JOBS,
  LOAD_JOBS,
  LOAD_JOB_APPLICANTS,
  REMOVE_JOB,
} from "../action_types";

const baseUrl = "http://localhost:5000/";

const instance = axios.create({
  baseURL: baseUrl,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

function getJobApplicants(jobId) {
  return new Promise((resolve, reject) => {
    instance
      .get(`jobs/${jobId}?_embed=applications`)
      .then((response) => {
        if (response.status >= 200 || response.status <= 299) {
          resolve(response.data);
          return response.data;
        }
      })
      .catch((err) => {
        reject(_handleError(err));
      });
  });
}

function _handleError(error) {
  return error.message;
}

function* loadJobApplicants({ payload }) {
  try {
    const response = yield call(getJobApplicants, payload);
    yield put({
      type: LOAD_JOB_APPLICANTS.concat("_SUCCESS"),
      payload: response,
    });
  } catch (error) {
    console.log(error);
    yield put({ type: LOAD_JOB_APPLICANTS.concat("_FAILURE") });
  }
}

export function* watchLoadJobApplicants() {
  yield takeEvery(LOAD_JOB_APPLICANTS, loadJobApplicants);
}

function* applicantsSaga() {
  yield all([fork(watchLoadJobApplicants)]);
}

export default applicantsSaga;
