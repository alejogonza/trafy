const FCMvalidator = (dbTokens, bodyTokens) => {
    for (var i = 0; i < dbTokens.length; i++) {
      if (dbTokens[i] == bodyTokens) {
       return false;
      }
    }
  } 

  export {
      FCMvalidator
  }