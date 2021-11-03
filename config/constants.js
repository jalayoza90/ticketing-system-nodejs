httpCodes = {
    badRequest: 400,
    internalError: 500,
    created: 201,
    notFound: 404,
    ok: 200,
    notImplemented: 501,
    forbidden: 403,
    unAuthorized: 401
}

messages = {
    emailAlreadyRegistered: 'Email is already registered.',
    emailRequired: 'Email is required',
    passwordRequired: 'Password is required',
    invalidEmail: "Please provide valid email",
    emailNotExist: "Email id does not exist",
    passwordNotExist: "Password do not match",
    success: "success",
    createCategory: "category created successfully",
    updateCategory: "category updated successfully",
    deleteCategory: "category deleted successfully",
    invalidRequest: 'Not Valid Request',
    contentAdded: 'content created successfully',
    unAuthorized: "unauthorized Access",
    internalError: "Something went wrong",
    urlNotFound: "URL not found",
    signupSuccess :"User registered successfully",
    loginSuccess :"User login successfully"
}

module.exports = {
    httpCodes,
    messages
}