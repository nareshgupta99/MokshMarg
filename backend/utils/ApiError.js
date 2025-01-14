class ApiError extends Error {;
    constructor(errCode, message) {
      super(); 
      this.name = this.constructor.name; 
      this.errCode = errCode; 
      this.message=message
    }
}
  
module.exports=ApiError