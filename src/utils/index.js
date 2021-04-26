export default {
  truncate: (input, maxLength) => {
    return input.length > maxLength ? `${input.substring(0, maxLength)}...` : input;
  },
  onPressEnter: (event, fn) => {
    if (event.key === "Enter") {
      event.preventDefault()
      try {
        fn.call()
      } catch (error) {
        throw error
      }
    }
  },
  validation: (value, type) => {
    switch(type) {
      case 'required': return value !== ''
    }
  },
  authErrorHandler: (error) => {
    switch (error.code) {
      case 'auth/invalid-email': return 'Invalid email.'
      case 'auth/wrong-password': return 'Invalid email / password.'
      case 'auth/user-not-found': return 'Invalid email / password.'
      case 'auth/argument-error': return 'Input your email and password to login.'
      case 'auth/user-disabled': return error.message
      default: return error.message
    }
  }
}