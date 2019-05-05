let models = require('../models');
let bcrypy = require('bcrypt');
const passport = require('passport');
const mypassport = require('../passport_setup')(passport);
let flash = require('connect-flash');

const generateHash = function(password){
    return bcrypy.hashSync(password,bcrypy.genSaltSync(8),null);
};

exports.show_signup = function(req,res,next){
    res.render('user/signup',{formData: {}, errors: {}});
};

exports.show_login= function(req,res,next){
    res.render('user/login',{formData: {},errors: {}});
};

exports.login = function(req,res,next){
    passport.authenticate('local',{
        successRedirect : "/",
        failureRedirect: "/login",
        failureFlash: true
     })(req,res,next);
};

exports.signup = function(req,res,next){
    const newUser = models.User.build({
        email:req.body.email,
        password: generateHash(req.body.password),
    });
    return newUser.save().then(result => {
         passport.authenticate('local',{
            successRedirect : "/",
            failureRedirect: "/signup",
            failureFlash: true
         })(req,res,next);
    });
};

exports.logout = function(req,res,next){
    req.logout();
    req.session.destroy();
    res.redirect('/');
};