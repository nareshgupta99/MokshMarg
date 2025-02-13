class ApiError extends Error {;
    constructor(status,errCode, message) {
      super(); 
      this.name = this.constructor.name; 
      this.status=status;
      this.errCode = errCode; 
      this.message=message;
    }
}
  
module.exports=ApiError