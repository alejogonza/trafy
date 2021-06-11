const HttpResponse = {
    OK: {
        STATUS: 200,
        MESSAGE: 'OK'
    },
    CREATED: {
        STATUS: 201,
        MESSAGE: "Created"
    },
    NO_CONTENT: {
        STATUS: 204,
        MESSAGE: "No Content"
    },
    PARTIAL_CONTENT: {
        STATUS: 206,
        MESSAGE: "Partial Content"
    },
    BAD_REQUEST: {
        STATUS: 400,
        MESSAGE: "Bad Request"
    },
    UNAUTHORIZED: {
        STATUS: 401,
        MESSAGE: "Unauthorized"
    },
    NOT_FOUND: {
        STATUS: 404,
        MESSAGE: "Not Found"
    }, 
    INTERNAL_SERVER_ERROR: {
        STATUS: 500,
        MESSAGE: "Internal Server Error"
    }
}




let setMessage = (statusResponse) => {
    let message;
    switch (statusResponse) {
      case 200:
        message = HttpResponse.OK.MESSAGE;
        break;
      case 201:
        message = HttpResponse.CREATED.MESSAGE;
        break;
      case 204:
        message = HttpResponse.NO_CONTENT.MESSAGE;
        break;
      case 206:
        message = HttpResponse.PARTIAL_CONTENT.MESSAGE;
        break;
      case 400:
        message = HttpResponse.BAD_REQUEST.MESSAGE;
        break;
      case 401:
        message = HttpResponse.UNAUTHORIZED.MESSAGE;
        break;
      case 404:
        message = HttpResponse.NOT_FOUND.MESSAGE;
        break;
      default:
        message = HttpResponse.INTERNAL_SERVER_ERROR.MESSAGE;
        break;
    }
  
    return message;
  };
  

module.exports = {
    HttpResponse,
    setMessage
  };