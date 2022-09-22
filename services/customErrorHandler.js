class customErrorHandler extends Error{
    constructor(status, msg){
      super();
      this.status=status;
      this.message=msg;
    }
    static unAuthorizedUser(message="Un Authorized User") {
        return new customErrorHandler(401,message);
    };

    static wrongCredentials(message="your email and password is wrong") {
        return new customErrorHandler(401,message);
    };

    static imageUploadIssue(messag="Issue during image upload"){
        return new customErrorHandler(401, messag)
    }
    static imageDeleteIssue(messag="Issue during image Delete"){
        return new customErrorHandler(401, messag)
    }
    static imageUpdateIssue(messag="Issue during product's image Update"){
        return new customErrorHandler(401, messag)
    }
} 

export default customErrorHandler;