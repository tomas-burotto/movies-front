  const initialState = {
    currentRole: null,
    currentToken: null,
    loggingIn: null,
    currentEmail: null,
    currentDescription: null
}

function authReducer(state = initialState, action) {
  switch (action.type) {
    case 'LOG_IN':
      return { 
        currentToken: action.payload.accessToken, 
        currentUserRole: action.payload.role,
        loggingIn: true,
        currentEmail: action.payload.email,
        currentDescription: action.payload.description 
      };
    case 'NO_LOGGING':
      return {
        ...state,
        loggingIn: true
      };
    case 'LOG_OUT':
      return { 
        currentToken: null, 
        currentUserRole: null, 
        loggingIn: false,
        currentEmail: null,
        currentDescription: null 
      };
    
    default:
      return state;
  }
}

export default authReducer