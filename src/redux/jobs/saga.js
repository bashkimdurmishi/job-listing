import axios from "axios";
import { takeEvery, fork, put, all, call } from "redux-saga/effects";

import {
  CREATE_JOB,
  EDIT_JOB,
  EDIT_USER,
  FILTER_JOBS,
  LOAD_JOBS,
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

function getJobs() {
  return new Promise((resolve, reject) => {
    instance
      .get("jobs")
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

function create({ job, poster }) {
  job.poster = poster.fullName;
  let today = new Date();
  let date =
    today.getDate() + "/" + (today.getMonth() + 1) + "/" + today.getFullYear();
  job.datePosted = date;
  return new Promise((resolve, reject) => {
    instance
      .post("/jobs", job)
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

function remove(jobId) {
  return new Promise((resolve, reject) => {
    instance
      .delete(`/jobs/${jobId}`)
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

function edit({ job, jobId }) {
  return new Promise((resolve, reject) => {
    instance
      .put(`/jobs/${jobId}`, job)
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

function filter(payload) {
  let queryString = "";
  for (const [key, value] of Object.entries(payload)) {
    if (key === "sort") {
      queryString = queryString + `?_sort=datePosted&_order=${value}`;
    } else {
      queryString = queryString + `&${key}_like=${value}`;
    }
  }

  return new Promise((resolve, reject) => {
    instance
      .get(`jobs${queryString}`)
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

function* loadJobs() {
  try {
    const response = yield call(getJobs);
    yield put({ type: LOAD_JOBS.concat("_SUCCESS"), payload: response });
  } catch (error) {
    console.log(error);
    yield put({ type: LOAD_JOBS.concat("_FAILURE") });
  }
}

function* createJob({ payload: { job, poster } }) {
  try {
    const response = yield call(create, { job, poster });
    yield put({ type: CREATE_JOB.concat("_SUCCESS"), payload: response });
    poster.postsId.push(response.id);
    yield put({ type: EDIT_USER, payload: poster });
  } catch (error) {
    console.log(error);
    yield put({ type: CREATE_JOB.concat("_FAILURE") });
  }
}

function* removeJob({ payload: { jobId, poster } }) {
  try {
    yield call(remove, jobId);
    yield put({ type: REMOVE_JOB.concat("_SUCCESS"), payload: jobId });
    poster.postsId = poster.postsId.filter((postId) => postId !== jobId);
    yield put({ type: EDIT_USER, payload: poster });
  } catch (error) {
    console.log(error);
    yield put({ type: REMOVE_JOB.concat("_FAILURE") });
  }
}

function* editJob({ payload: { job, jobId } }) {
  try {
    const response = yield call(edit, { job, jobId });
    yield put({ type: EDIT_JOB.concat("_SUCCESS"), payload: response });
  } catch (error) {
    console.log(error);
    yield put({ type: EDIT_JOB.concat("_FAILURE") });
  }
}

function* filterJobs({ payload }) {
  try {
    const response = yield call(filter, payload);
    yield put({ type: FILTER_JOBS.concat("_SUCCESS"), payload: response });
  } catch (error) {
    console.log(error);
    yield put({ type: FILTER_JOBS.concat("_FAILURE") });
  }
}

export function* watchLoadJobs() {
  yield takeEvery(LOAD_JOBS, loadJobs);
}

export function* watchFilterJobs() {
  yield takeEvery(FILTER_JOBS, filterJobs);
}

export function* watchJobCreate() {
  yield takeEvery(CREATE_JOB, createJob);
}

export function* watchJobRemove() {
  yield takeEvery(REMOVE_JOB, removeJob);
}

export function* watchJobEdit() {
  yield takeEvery(EDIT_JOB, editJob);
}

function* jobsSaga() {
  yield all([
    fork(watchLoadJobs),
    fork(watchFilterJobs),
    fork(watchJobCreate),
    fork(watchJobRemove),
    fork(watchJobEdit),
  ]);
}

export default jobsSaga;
