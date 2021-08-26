export const authReducer = (state, action) => {
  switch (action.type) {
    case "SUCCESS":
      return {
        isLoading: false,
        isError: false,
        hasAccessToken: true,
        user: action.payload,
        error: {},
        access_token: action.payload.token,
      };

    case "ERROR":
      return {
        isLoading: false,
        isError: true,
        hasAccessToken: false,
        access_token: {},
        error: action.payload,
      };

    case "REMOVE_TOKEN":
      return {
        isLoading: false,
        isError: false,
        hasAccessToken: false,
        error: {},
        access_token: {},
      };

    case "REMOVE_ERRORS":
      return { ...state, isLoggedIn: false, isError: false, error: {} };

    default:
      return state;
  }
};
