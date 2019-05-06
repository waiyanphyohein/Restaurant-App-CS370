let createError = require('http-errors');
exports.isLoggedIn = function(req,res,next){
    if(req.user){
        next();
    }
    else{
        next(createError(404,"Page Not Found"));
    }
};

exports.hasAuth = function(req,res,next){
    if(req.user != null && req.user.is_admin){
        next();
    }
    else{
        next(createError(404,"Page Not Found"));
    }
};