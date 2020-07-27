export const logIn = (accessToken, email, role, description) => ({
    type: 'LOG_IN',
    payload: {
      accessToken: accessToken,
      role: role,
      email: email,
      description: description
    }
  });
  
  export const noLogging = () => ({
      type: 'NO_LOGGING',
      payload: null
  })
  
  export const logOut = () => ({
    type: 'LOG_OUT',
    payload: null
  });