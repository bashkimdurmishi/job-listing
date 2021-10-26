import {
  CREATE_JOB,
  EDIT_JOB,
  FILTER_JOBS,
  LOAD_JOBS,
  LOAD_JOB_APPLICANTS,
  REMOVE_JOB,
} from "../action_types";
import { toast } from "react-toastify";

const initial_state = {
  list: [],
  loading: false,
};

let jobs = (state = initial_state, action) => {
  let listData = [];
  switch (action.type) {
    case LOAD_JOBS:
      return {
        ...state,
        loading: true,
      };
    case LOAD_JOBS.concat("_SUCCESS"):
      return {
        ...state,
        loading: false,
        list: action.payload,
      };
    case LOAD_JOBS.concat("_FAILURE"):
      return {
        ...state,
        loading: false,
      };
    case FILTER_JOBS:
      return {
        ...state,
        loading: true,
      };
    case FILTER_JOBS.concat("_SUCCESS"):
      return {
        ...state,
        loading: false,
        list: action.payload,
      };
    case FILTER_JOBS.concat("_FAILURE"):
      return {
        ...state,
        loading: false,
      };
    case CREATE_JOB:
      return {
        ...state,
        loading: true,
      };
    case CREATE_JOB.concat("_SUCCESS"):
      toast.success("Job created successfully");
      listData = state.list;
      listData.push(action.payload);
      return {
        ...state,
        loading: false,
        list: listData,
      };
    case CREATE_JOB.concat("_FAILURE"):
      toast.error("Failed to create the job");
      return {
        ...state,
        loading: false,
      };
    case REMOVE_JOB:
      return {
        ...state,
        loading: true,
      };
    case REMOVE_JOB.concat("_SUCCESS"):
      toast.success("Job removed successfully");
      listData = [...state.list];
      listData = listData.filter((job) => job.id !== action.payload);
      return {
        ...state,
        loading: false,
        list: listData,
      };
    case REMOVE_JOB.concat("_FAILURE"):
      toast.error("Failed to remove the job");
      return {
        ...state,
        loading: false,
      };
    case EDIT_JOB:
      return {
        ...state,
        loading: true,
      };
    case EDIT_JOB.concat("_SUCCESS"):
      toast.success("Job updated successfully");
      listData = [...state.list];
      listData.forEach((job, index) => {
        if (job.id === action.payload.id) {
          listData[index] = action.payload;
        }
      });
      return {
        ...state,
        loading: false,
        list: listData,
      };
    case EDIT_JOB.concat("_FAILURE"):
      toast.error("Failed to update the job");
      return {
        ...state,
        loading: false,
      };
    default:
      return { ...state };
  }
};
export default jobs;
