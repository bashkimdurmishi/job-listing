import { CREATE_JOB, EDIT_JOB, FILTER_JOBS, LOAD_JOBS, LOAD_JOB_APPLICANTS, REMOVE_JOB } from "../action_types";
import { toast } from 'react-toastify';

const initial_state = {
  list: [],
  loading: false,
};

let applicants = (state = initial_state, action) => {
  switch (action.type) {
    case LOAD_JOB_APPLICANTS:
    return {
      ...state,
      loading: true,
    };
    case LOAD_JOB_APPLICANTS.concat("_SUCCESS"):
      return {
        ...state,
        loading: false,
        list: action.payload,
      };
    case LOAD_JOB_APPLICANTS.concat("_FAILURE"):
      return {
        ...state,
        loading: false,
      };
    default:
      return { ...state };
  }
};
export default applicants;
