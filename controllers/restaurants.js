
const Op = require('sequelize').Op;
let createError = require('http-errors');    
let models = require('../models');
exports.get_restaurants = function(req,res,next){
    return models.Restaurant.findAll().then(restaurants =>{ 
        
        res.render('restaurant/restaurants', {title : 'Restaurants',restaurants: restaurants});
        //,restaurants: restaurants,user: req.user
    });
};

exports.get_menu = function(req,res,next){
    console.log(req.params.restaurant_id);
    return models.MenuRestaurant.findAll(
        {
            where: {
                RestaurantID: req.params.restaurant_id
            },
        }
        ).then( Menus => {            
            let menus_id=[];            
            for(const [MenuID] in Menus){
                menus_id.push(Menus[MenuID].MenuID);
                console.log(menus_id);
            }
            
            if(menus_id == [])
                res.render('error',{error: createError(404,"Page Not Found")});
            else
                return models.Menu.findAll({
                    where:{
                        MenuID : {
                            [Op.or]: menus_id
                        },
                    },
                 }).then(items =>{
                     console.log(items);
                     res.render('error',{error: createError(404,"Page Not Found")});
                 });        
        });
};

exports.get_selected_restaurant = function(req,res,next){
    // if(req.body.X == null || req.body.Y == null)
    //      res.redirect('restaurant/restaurants');
    // console.log(req.body.X +","+ req.body.Y);
    let search_Query = {};
    if(req.body.X != '')
        search_Query.X = req.body.X;
    if(req.body.Y != '')
            search_Query.Y = req.body.Y;
    if(req.body.name != '')
        search_Query.Name = req.body.name;
    
    return models.Restaurant.findAll({        
            where: {
                [Op.or]: search_Query
            },
        }).then(result =>{        
            console.log(result);        
            res.render('restaurant/restaurants',{title: 'Restaurants',restaurants: result});            
        });
};