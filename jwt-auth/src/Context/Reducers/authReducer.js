export const authReducer = (state, action) => {
  switch (action.type) {
    case "SUCCESS":
      return {
        isError: false,
        hasAccessToken: true,
        user: action.payload,
        error: {},
        access_token: action.payload.token,
      };

    case "ERROR":
      return {
        isError: true,
        hasAccessToken: false,
        access_token: {},
        error: action.payload,
      };

    case "REMOVE_TOKEN":
      return {
        isError: false,
        hasAccessToken: false,
        error: {},
        access_token: {},
      };

    case "REMOVE_ERRORS":
      return { ...state, isError: false, error: {} };

    default:
      return state;
  }
};
