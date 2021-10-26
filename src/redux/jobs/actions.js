import { CREATE_JOB, EDIT_JOB, FILTER_JOBS, LOAD_JOBS, REMOVE_JOB } from "../action_types";

export function loadJobs() {
  return {
    type: LOAD_JOBS,
  };
}

export function filterJobs(filters) {
  return {
    type: FILTER_JOBS,
    payload: filters,
  }
}

export function createJob(job, poster) {
  return {
    type: CREATE_JOB,
    payload: {
      job,
      poster,
    },
  }
}

export function removeJob(jobId, poster) {
  return {
    type: REMOVE_JOB,
    payload: {jobId, poster},
  }
}

export function editJob(job, jobId) {
  return {
    type: EDIT_JOB,
    payload: {job, jobId},
  }
}