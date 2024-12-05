class ApiError extends Error {
    constructor(errCode, message) {
      super(message); 
      this.name = this.constructor.name; 
      this.errCode = errCode; 
      this.message=message
    }
}
  
module.exports=ApiError