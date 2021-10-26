import { APPLY_FOR_JOB, EDIT_USER, FAVOURITE_JOB, LOAD_USER, LOGIN, REGISTER, UNFAVOURITE_JOB } from "../action_types";
import { toast } from 'react-toastify';

const initial_state = {
  data: null,
  loading: false,
  error: null,
};

let user = (state = initial_state, action) => {
  let userData;
  switch (action.type) {
    case LOAD_USER:
      return {
        ...state,
        loading: true,
      }
    case LOAD_USER.concat("_SUCCESS"):
      return {
        ...state,
        loading: false,
        data: action.payload,
      };
    case LOAD_USER.concat("_FAILURE"):
      return {
        ...state,
        loading: false,
      };
    case LOGIN:
      return {
        ...state,
        loading: true,
      };
    case LOGIN.concat("_SUCCESS"):
      toast.success("Login successful");
      return {
        ...state,
        loading: false,
        data: action.payload,
      };
    case LOGIN.concat("_FAILURE"):
      return {
        ...state,
        loading: false,
      };
    case REGISTER:
      return {
        ...state,
        loading: true,
      };
    case REGISTER.concat("_SUCCESS"):
      toast.success("Registered successfully");
      return {
        ...state,
        loading: false,
      };
    case REGISTER.concat("_FAILURE"):
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case FAVOURITE_JOB:
      return {
        ...state,
      };
    case FAVOURITE_JOB.concat("_SUCCESS"):
      toast.success("Added job to favourites");
      userData = [].concat(state.data);
      userData = action.payload;
      return {
        ...state,
        data: userData,
      };
    case FAVOURITE_JOB.concat("_FAILURE"):
      toast.error("Failed to add job to favourites");
      return {
        ...state,
      };
    case UNFAVOURITE_JOB:
      return {
        ...state,
      };
    case UNFAVOURITE_JOB.concat("_SUCCESS"):
      toast.success("Successfully removed job from favourites");
      userData = [].concat(state.data);
      userData = action.payload;
      return {
        ...state,
        data: userData,
      };
    case UNFAVOURITE_JOB.concat("_FAILURE"):
      toast.error("Failed to remove job from favourites");
      return {
        ...state,
      };
    case EDIT_USER:
    return {
      ...state,
    };
    case EDIT_USER.concat("_SUCCESS"):
      userData = [].concat(state.data);
      userData = action.payload;
      return {
        ...state,
        data: userData,
      };
    case EDIT_USER.concat("_FAILURE"):
      return {
        ...state,
      };
    case APPLY_FOR_JOB:
      return {
        ...state,
      };
    case APPLY_FOR_JOB.concat("_SUCCESS"):
      toast.success("Successfully applied for the job");
      return {
        ...state,
      };
    case APPLY_FOR_JOB.concat("_FAILURE"):
      toast.error("Failed to apply for the job");
      return {
        ...state,
      };
    default:
      return { ...state };
  }
};
export default user;
