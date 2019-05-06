let models = require('../models');
let bcrypy = require('bcrypt');
const passport = require('passport');
const mypassport = require('../passport_setup')(passport);
let flash = require('connect-flash');

const{validateUser} = require('../validator/signup');
const {isEmpty} = require('lodash');

const generateHash = function(password){
    return bcrypy.hashSync(password,bcrypy.genSaltSync(8),null);
};

exports.show_signup = function(req,res,next){
    res.render('user/signup',{formData: {}, errors: {}});
};

const rerender_signup = function(errors,req,res,next){
    res.render('user/signup',{formData: {}, errors: errors});
};

exports.show_login= function(req,res,next){
    res.render('user/login',{formData: req.body,errors: {}});
};

exports.login = function(req,res,next){
    passport.authenticate('local',{
        successRedirect : "/",
        failureRedirect: "/login",
        failureFlash: true
     })(req,res,next);
};

exports.signup = function(req,res,next){
    let errors = {};
    return validateUser(errors,req).then(errors =>{
        if(!isEmpty(errors)){
            rerender_signup(errors,req,res,next);
        }
        else
        {
            return models.User.findOne({
                where: {
                    is_admin : true
                }
            }).then(user =>{
                let newUser;
                if(user != null){
                    newUser = models.User.build({
                        email:req.body.email,
                        password: generateHash(req.body.password),
                    });
                }
                else{
                    newUser = models.User.build({
                        email:req.body.email,
                        password: generateHash(req.body.password),
                        is_admin : true
                    });
                }
                return newUser.save().then( result => {
                    console.log(result);
                    passport.authenticate('local',{
                        successRedirect : "/",
                        failureRedirect: "/signup",
                        failureFlash: true
                    })(req,res,next);
                });
            });                    
        }
    });
};

exports.logout = function(req,res,next){
    req.logout();
    req.session.destroy();
    res.redirect('/');
};