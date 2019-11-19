import {
  SET_SCREAMS,
  LIKE_SCREAM,
  UNLIKE_SCREAM,
  LOADING_DATA,
  DELETE_SCREAM,
  POST_SCREAM
} from "../types";

const initalState = {
  screams: [],
  scream: {},
  loading: false
};

export default function(state = initalState, action) {
  switch (action.type) {
    case LOADING_DATA:
      return {
        ...state,
        loading: true
      };
    case SET_SCREAMS:
      return {
        ...state,
        screams: action.payload,
        loading: false
      };
    case LIKE_SCREAM:
    case UNLIKE_SCREAM:
      // Searches for the index of the post array from returned ID from like
      let index = state.screams.findIndex(
        scream => scream.screamId === action.payload.screamId
      );
      state.screams[index] = action.payload;
      return {
        ...state
      };
    case DELETE_SCREAM:
      let postIndex = state.screams.findIndex(
        scream => scream.screamId === action.payload
      );
      state.screams.splice(postIndex, 1);
      return {
        ...state
      };
    case POST_SCREAM:
      return {
        ...state,
        screams: [
          action.payload,
          ...state.screams
        ]
      }
    default: {
      return state;
    }
  }
}
