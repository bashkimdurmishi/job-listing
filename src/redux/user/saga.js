import axios from "axios";
import { takeEvery, fork, put, all, call } from "redux-saga/effects";
import { loadJobs } from "../jobs/actions";

import {
  APPLY_FOR_JOB,
  EDIT_USER,
  FAVOURITE_JOB,
  LOAD_USER,
  LOGIN,
  LOGOUT,
  REGISTER,
  UNFAVOURITE_JOB,
} from "../action_types";

const baseUrl = "http://localhost:5000";

const instance = axios.create({
  baseURL: baseUrl,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

function setCookie(userEmail) {
  // Delete the old cookie
  document.cookie = "email=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

  // Set the new cookie
  document.cookie = `email=${userEmail}`;
}

function getCookie() {
  return document.cookie.split("=")[1];
}

function removeCookie() {
  document.cookie = "email=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
}

function currentUser(credentials) {
  return new Promise((resolve, reject) => {
    instance
      .get(`/users?email=${credentials.email}`)
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

function login(credentials) {
  return new Promise((resolve, reject) => {
    instance
      .get(`/users?email=${credentials.email}&password=${credentials.password}`)
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

function register(credentials) {
  let user = {};
  user.fullName = credentials.fullName;
  user.email = credentials.email;
  user.password = credentials.password;
  user.userType = credentials.userType;
  if (credentials.userType === "seeker") {
    user.favoritesId = [];
    user.appliedId = [];
  } else if (credentials.userType === "poster") {
    user.postsId = [];
  }
  return new Promise((resolve, reject) => {
    instance
      .post("/users", user)
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

function favourite(data) {
  let user = data.user;
  user.favoritesId.push(data.jobId);

  return new Promise((resolve, reject) => {
    instance
      .put(`/users/${user.id}`, user)
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

function edit(user) {
  return new Promise((resolve, reject) => {
    instance
      .put(`/users/${user.id}`, user)
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

function apply(application) {
  return new Promise((resolve, reject) => {
    instance
      .post("/applications", application)
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

function unFavourite(data) {
  let user = data.user;
  user.favoritesId = user.favoritesId.filter(
    (favourite) => favourite !== data.jobId
  );

  return new Promise((resolve, reject) => {
    instance
      .put(`/users/${user.id}`, user)
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

function* loadUser() {
  try {
    let email = getCookie();
    const response = yield call(currentUser, {
      email: email,
    });
    if (response.length === 0) {
      yield put({ type: LOAD_USER.concat("_FAILURE") });
      return;
    }
    yield put({ type: LOAD_USER.concat("_SUCCESS"), payload: response[0] });
  } catch (error) {
    console.log(error);
    yield put({ type: LOAD_USER.concat("_FAILURE") });
  }
}

function* loginUser({ payload }) {
  try {
    const response = yield call(login, {
      email: payload.email,
      password: payload.password,
    });
    if (response.length === 0) {
      yield put({ type: LOGIN.concat("_FAILURE") });
      return;
    }
    setCookie(payload.email);
    yield put(loadJobs());
    yield put({ type: LOGIN.concat("_SUCCESS"), payload: response[0] });
    payload.history.push("/dashboard");
  } catch (error) {
    console.log(error);
    yield put({ type: LOGIN.concat("_FAILURE") });
  }
}

function* logoutUser({ payload }) {
  try {
    yield put({ type: LOGOUT.concat("_SUCCESS") });
    removeCookie();
    payload.history.push("/login");
  } catch (error) {
    yield put({ type: LOGOUT.concat("_FAILURE") });
    removeCookie();
    payload.history.push("/login");
  }
}

function* registerUser({ payload }) {
  try {
    const existingUser = yield call(currentUser, {
      email: payload.email,
    });
    if (existingUser[0]) {
      yield put({
        type: REGISTER.concat("_FAILURE"),
        payload: "User already exists",
      });
      return;
    }
    yield call(register, {
      email: payload.email,
      password: payload.password,
      userType: payload.userType,
    });
    yield put({ type: REGISTER.concat("_SUCCESS") });
    yield put({
      type: LOGIN,
      payload: {
        email: payload.email,
        password: payload.password,
        history: payload.history,
      },
    });
  } catch (error) {
    console.log(error);
    yield put({ type: REGISTER.concat("_FAILURE") });
  }
}

function* editUser({ payload }) {
  try {
    const response = yield call(edit, payload);
    yield put({ type: EDIT_USER.concat("_SUCCESS"), payload: response });
  } catch (error) {
    console.log(error);
    yield put({ type: EDIT_USER.concat("_FAILURE") });
  }
}

function* applyForJob({ payload: { application, user } }) {
  try {
    const response = yield call(apply, application);
    user.appliedId.push(response.jobId);
    yield put({ type: EDIT_USER, payload: user });
  } catch (error) {
    console.log(error);
    yield put({ type: APPLY_FOR_JOB.concat("_FAILURE") });
  }
}

function* favourtiteJob({ payload: { user, jobId } }) {
  try {
    const response = yield call(favourite, {
      user: user,
      jobId: jobId,
    });
    yield put({ type: FAVOURITE_JOB.concat("_SUCCESS"), payload: response });
  } catch (error) {
    console.log(error);
    yield put({ type: FAVOURITE_JOB.concat("_FAILURE") });
  }
}

function* unFavouriteJob({ payload: { user, jobId } }) {
  try {
    const response = yield call(unFavourite, {
      user: user,
      jobId: jobId,
    });
    yield put({ type: UNFAVOURITE_JOB.concat("_SUCCESS"), payload: response });
  } catch (error) {
    console.log(error);
    yield put({ type: UNFAVOURITE_JOB.concat("_FAILURE") });
  }
}

export function* watchUserLoad() {
  yield takeEvery(LOAD_USER, loadUser);
}

export function* watchUserLogin() {
  yield takeEvery(LOGIN, loginUser);
}

export function* watchUserLogout() {
  yield takeEvery(LOGOUT, logoutUser);
}

export function* watchRegisterUser() {
  yield takeEvery(REGISTER, registerUser);
}

export function* watchEditUser() {
  yield takeEvery(EDIT_USER, editUser);
}

export function* watchUserApplication() {
  yield takeEvery(APPLY_FOR_JOB, applyForJob);
}

export function* watchFavouriteJob() {
  yield takeEvery(FAVOURITE_JOB, favourtiteJob);
}

export function* watchUnFavouriteJob() {
  yield takeEvery(UNFAVOURITE_JOB, unFavouriteJob);
}

function* authSaga() {
  yield all([
    fork(watchUserLoad),
    fork(watchUserLogin),
    fork(watchUserLogout),
    fork(watchRegisterUser),
    fork(watchEditUser),
    fork(watchUserApplication),
    fork(watchFavouriteJob),
    fork(watchUnFavouriteJob),
  ]);
}

export default authSaga;
