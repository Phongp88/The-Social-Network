import {
  SET_SCREAMS,
  LIKE_SCREAM,
  UNLIKE_SCREAM,
  LOADING_DATA,
  DELETE_SCREAM,
  POST_SCREAM,
  SET_SCREAM,
  SUBMIT_COMMENT
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
    case SET_SCREAM:
      return {
        ...state,
        scream: action.payload
      }
    case LIKE_SCREAM:
    case UNLIKE_SCREAM:
      // Searches for the index of the post array from returned ID from like
      let index = state.screams.findIndex(
        scream => scream.screamId === action.payload.screamId
      );
      state.screams[index] = action.payload;
      action.payload.comments = state.scream.comments
      if (state.scream.screamId === action.payload.screamId) {
        state.scream = action.payload;
      }
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
    case SUBMIT_COMMENT:
    return {
      ...state,
      scream: {
        ...state.scream,
        comments: [action.payload, ...state.scream.comments],
        commentCount: state.scream.commentCount + 1
      }
    }
    default: {
      return state;
    }
  }
}
