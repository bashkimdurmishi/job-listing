import { APPLY_FOR_JOB, EDIT_USER, FAVOURITE_JOB, LOAD_USER, LOGIN, LOGOUT, REGISTER, UNFAVOURITE_JOB } from "../action_types";

export function loadUser() {
  return {
    type: LOAD_USER,
  }
}

export function login(credentials) {
  return {
    type: LOGIN,
    payload: credentials,
  };
}

export function logout(history) {
  return {
    type: LOGOUT,
    payload: {history},
  }
} 

export function registerUser(credentials) {
  return {
    type: REGISTER,
    payload: credentials,
  };
}

export function editUser(user) {
  return {
    type: EDIT_USER,
    payload: user,
  }
}

export function favourtiteJob(user, jobId) {
  return {
    type: FAVOURITE_JOB,
    payload: {user, jobId},
  };
}

export function unFavouriteJob(user, jobId) {
  return {
    type: UNFAVOURITE_JOB,
    payload: {user, jobId},
  };
}

export function applyForJob(application, user) {
  return {
    type: APPLY_FOR_JOB,
    payload: {application, user},
  }
}
