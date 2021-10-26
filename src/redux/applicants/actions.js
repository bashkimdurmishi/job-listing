import { LOAD_JOB_APPLICANTS } from "../action_types";

export function loadJobApplicants(jobId) {
  return {
    type: LOAD_JOB_APPLICANTS,
    payload: jobId,
  }
}