class ApiError {
  constructor(code,message,description,internalErrorCode){
      this.code=code,
      this.message=message,
      this.errors={
          description:description,
          internalErrorCode
      }
  }
  static badRequest(msg,description,internalErrorCode){
    return new ApiError(400, msg,description,internalErrorCode)
  }

  static internal(msg,description,internalErrorCode){
      return new ApiError(500,msg,description,internalErrorCode)
  }

  static badCredentials(msg,description,internalErrorCode){
      return new ApiError(401,msg,description,internalErrorCode)
  }

  static existingCredentials(msg,description,internalErrorCode){
      return new ApiError(403,msg,description,internalErrorCode)
  }

  static noPermission(msg,description,internalErrorCode){
      return new ApiError(403,msg,description,internalErrorCode)
  }
}

function apiErrorHandler(err,req,res,next){
  console.error("the error is", err)
  if(err instanceof ApiError){
    res.status(err.code).json(err)
    return;
  }
  res.status(500).json('something went wrong')
}

module.exports = {
  apiErrorHandler,
  ApiError
}