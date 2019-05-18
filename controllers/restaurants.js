
const Op = require('sequelize').Op;
let createError = require('http-errors');    
let models = require('../models');
let sequelize = require('sequelize');

var tempStorageSpace  = [];

function addZeroes( value ) {
    //set everything to at least two decimals; removs 3+ zero decimasl, keep non-zero decimals
    var new_value = value*1; //removes trailing zeros
    new_value = new_value+''; //casts it to string

    pos = new_value.indexOf('.');
    if (pos==-1) new_value = new_value + '.00';
    else {
        var integer = new_value.substring(0,pos);
        var decimals = new_value.substring(pos+1);
        while(decimals.length<2) decimals=decimals+'0';
        new_value = integer+'.'+decimals;
    }
    return new_value;
}

async function retrieveMenuList(menus_id,menu_Index,arrayInput){        
    return await models.Menu.findAll({
        where:{
            MenuID : menus_id[menu_Index]
        },
        order:[
            ['Name','ASC'],
        ],
        raw : true,
    }).then(function(result) {        
        // (arraySet[Menu_Name_Safe]).push(result);
        
        // console.log(arraySet);
        models.Menu_MenuName.findAll({
            where: {
                MenuID: menus_id[menu_Index],
            },
            order:[
                ['Name','ASC']
            ],
            raw: true,
        }).then(MenuName => {
            let tempSpace = [];
            tempSpace[MenuName[0].Name] = result;     
            arrayInput.push(Object.assign(tempSpace));                            
            tempStorageSpace = arrayInput;
            console.log("TEMP STORAGE SPACE : "+tempStorageSpace);
            // console.log(arrayInput[menu_Index]);        
        }).catch(error => {
            console.log(error);
            return error;        
        });         
    })
    .catch(error=>{
        console.log(error);
    });
}

exports.get_restaurants = function(req,res,next){
    return models.Restaurant.findAll({
        order:[
            ['Name','ASC'],
            ['X','ASC']     
        ]
    }).then(restaurants =>{         
        res.render('restaurant/restaurants', {title : 'Restaurants',user: req.user,restaurants: restaurants});
        //,restaurants: restaurants,user: req.user
    });
};

exports.add_menu = function(req,res,next){

    return models.Menu_MenuName.create({
        Name : req.body.MenuName
    }).then(result =>{
        console.log(result);
        models.MenuRestaurant.create({
            MenuID : result.MenuID,
            RestaurantID : req.params.restaurant_id,
        })
        .then(response => {
            // models.Restaurant.findOne({
            //     where : {
            //         RestaurantID : req.params.restaurant_id
            //     },
            // });
            // }).then(response => {
            //     if(response == null || response.length ===0){
            //         console.log(response);
            //         res.redirect('/restaurant/'+req.params.restaurant_id+'/menu');
            //     }
            //     else
            //     {
            //         models.Restaurant.findAll({
            //             where : {
            //                 Name : response.Name
            //             },
            //         }).then(nameList =>{
            //             for (let index in nameList){
                            
            //                 for(let name in nameList[index]){
            //                     console.log(name);
            //                     models.MenuRestaurant.create({
            //                         MenuID : result.MenuID,
            //                         RestaurantID : name.RestaurantID
            //                     });
            //                 }
            //             }
            //         });
            //     }
            // });

            console.log(response);
            res.redirect('/restaurant/'+req.params.restaurant_id+'/menu');
        });
    });
};

exports.get_restaurants_by_location = function(req,res,next){
    return models.Restaurant.findAll({
        order:[  
            ['X','ASC'] 
        ]
    }).then(restaurants =>{         
        res.render('restaurant/restaurants', {title : 'Restaurants',user: req.user,restaurants: restaurants});
        //,restaurants: restaurants,user: req.user
    });
};


exports.delete_menu = function(req,res,next){
    console.log(req.body);
    return models.Menu.destroy({
        where :{
            MenuID : req.params.MenuID
        },
    }).then(result =>{
        console.log("SUCCESSFULLY DELETED FROM MENU");
        models.Menu_MenuName.destroy({
            where : {
                MenuID : req.params.MenuID
            },
        }).then(result =>{
            console.log("SUCCESSFULLY DELETED MENU FROM Menu_MenuName");
            models.MenuRestaurant.destroy({
                where : {
                    MenuID : req.params.MenuID
                },
            }).then(result =>{
                console.log("SUCCESSFULLY DELETED FROM MENU_RESTAURANT");                 
                res.send({msg: "Success"});
            });
        });
    });
};

exports.get_menu = function(req,res,next){
    
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
                
                console.log("MENU ID : "+Menus[MenuID].MenuID);              
            }
            if(menus_id == [])
                res.render('error',{error: createError(404,"Page Not Found")});
            else{
                let menuIDArray = [];
                let menu_list= [];
                let nameArray = [],dataArray = [];
                
                for(let menuCat in menus_id)
                {
                    // retrieveMenuList(menus_id,menuCat,menu_list);
                    models.Menu.findAll({
                        where:{
                            MenuID : menus_id[menuCat]
                        },
                        order:[
                            ['Name','ASC'],
                        ],
                        raw : true,
                    }).then(function(result) {        
                        // (arraySet[Menu_Name_Safe]).push(result);
                        
                        // console.log(arraySet);
                        models.Menu_MenuName.findAll({
                            where: {
                                MenuID: menus_id[menuCat],
                            },
                            order:[
                                ['Name','ASC']
                            ],
                            raw: true,
                        }).then(MenuName => {
                            let tempSpace = [];
                            menuIDArray.push(MenuName[0].MenuID);
                            tempSpace[MenuName[0].Name] = result;     
                            menu_list.push(Object.assign(tempSpace)); 

                            console.log(menu_list);        
                        }).catch(error => {
                            console.log(error);
                            return error;        
                        });         
                    })
                    .catch(error=>{
                        console.log(error);
                    });
                    // console.log(object);                    
                }
                
                models.Menu.findAll({
                    where:{
                        MenuID : {
                            [Op.or]: [menus_id]
                        },                        
                    },
                }).then(items =>{           
                    
                    
                    setTimeout(() => {                                                        
                        for(let item in menu_list){
                            for(let eachOne in menu_list[item]){                                                                
                                nameArray.push(eachOne);                                
                                let tempArraySpace = [];
                                                                                                                        
                                    
                                for(let one in (menu_list[item])[eachOne])
                                {                                                                        
                                    // console.log("MENU LIST PRINT: "+((menu_list[item])[eachOne])[one].MenuID);
                                    
                                    tempArraySpace.push(((menu_list[item])[eachOne])[one]);
                                }                                                                
                                console.log(menuIDArray);
                                dataArray.push(tempArraySpace);
                            }
                        }
                        console.log(menuIDArray);
                        // console.log("MENU ID ARRAY"+menuIDArray);
                        if(menuIDArray.length === 0){
                            res.render('restaurant/menu',{title: "Menu",user: req.user,restaurant_id: req.params.restaurant_id,nameArray: nameArray, dataArray: dataArray,MenuIDArray : menuIDArray});
                        }
                        else
                            res.render('restaurant/menu',{title: "Menu",user: req.user,restaurant_id: req.params.restaurant_id,nameArray: nameArray, dataArray: dataArray,MenuIDArray : menus_id});                        
                    },1000);
                });
            }
        });
};
exports.menu_item_edit = function(req,res,next){
    console.log(req.body);    
    let formattedPrice = addZeroes(req.body.Price);
    return models.Menu.update({         
        Name : req.body.Name,
        Category : req.body.Category,
        Price : formattedPrice,
        Size : req.body.Size,
    },{
        where : {
            Menu_List_Id : req.body.MenuListID
        },
    }).then(result=>{
        console.log(result);
        res.redirect('/restaurant/'+req.params.restaurant_id+'/menu');
    }).catch(error =>{
        console.log(error);
        res.locals.failed_messages = req.flash('FAILED TO EDIT');
        res.redirect('/restaurant/'+req.params.restaurant_id+'/menu');
    });
};
exports.edit_menu = function(req,res,next){
    console.log(req.body);
    return models.Menu_MenuName.update({
        Name : req.body.MenuName
    },{
        where:{
            MenuID : req.body.EditMenuID
        }
    }).then(result=>{
        console.log(result);
        res.redirect('/restaurant/'+req.params.restaurant_id+'/menu');
    });
    
};

exports.edit_restaurant = function(req,res,next){
    return models.Restaurant.update({
        Name : req.body.Name,
        Opening_Hours : req.body.Hours,
        Description : req.body.Description,
        X : req.body.X,
        Y : req.body.Y,
        Theme : req.body.Theme
    },{
        where :{
            RestaurantID : req.body.EditRestaurantID
        }
    }).then(result => {
         res.redirect('/restaurants');
    });

};

exports.add_restaurant = function(req,res,next){
    console.log(req.body);
    return models.Restaurant.findAll({
        where :{
            
            X : req.body.X,
            Y: req.body.Y,
        },
    }).then(respon => {

        console.log(respon);

        if(respon.length === 0){
            models.Restaurant.findOne({
                where : {
                    Name : req.body.Name,
                },
            }).then(result_name => {
                console.log(result_name);                
                if(result_name == null || result_name.length === 0)
                {
                    models.Restaurant.create({
                        Name : req.body.Name,
                        Opening_Hours : req.body.Hours,
                        X : req.body.X,
                        Y: req.body.Y,
                        Description : req.body.Description,
                        Theme : req.body.Theme
                    }).then(result => {                        
                        console.log(result);
                        res.redirect('/restaurants/');
                    });
                }
                else{
                    console.log(result_name.Name);
                    let restID = result_name.RestaurantID;
                    console.log(restID);
                    models.MenuRestaurant.findAll({
                        where : {
                          RestaurantID : restID
                        },
                    }).then(function(MenusList){
                        let MenuIDStorage = [];
                        for(let index in MenusList){                            
                                MenuIDStorage.push(MenusList[index].MenuID);
                        }
                        models.Restaurant.create({
                                Name : req.body.Name,
                                Opening_Hours : req.body.Hours,
                                X : req.body.X,
                                Y: req.body.Y,
                                Description : req.body.Description,
                                Theme : req.body.Theme
                            }).then(result => {
                                console.log(result.RestaurantID);
                                for(let index in MenuIDStorage)
                                {
                                    let obj = models.MenuRestaurant.create({
                                        MenuID : MenuIDStorage[index],
                                        RestaurantID : result.RestaurantID
                                    }).then(responseResult => {
                                                                                
                                    }).catch(error => {
                                        console.log(error);
                                    });
                                }
                                models.Restaurant.findAll({
                                    order:[
                                        ['Name','ASC'],
                                        ['X','ASC']     
                                    ]
                                }).then(restaurants =>{                                    
                                    res.locals.warning_messages = "A RESTAURANT WITH THE SAME IS FOUND AND ASSUMED THAT NEWLY CREATED ONE IS A BRANCH RESTAURANT";
                                    res.render('restaurant/restaurants', {title : 'Restaurants',user: req.user,restaurants: restaurants});
                                });
                            });
                    });
                }
            });
        }
        else{
            models.Restaurant.findAll({
                order:[
                    ['Name','ASC'],
                    ['X','ASC']     
                ]
            }).then(restaurants =>{
                res.locals.failed_messages = "RESTAURANT WITH SAME X AND Y COORDINATE EXISTS";
                res.render('restaurant/restaurants', {title : 'Restaurants',user: req.user,restaurants: restaurants});
                
                //,restaurants: restaurants,user: req.user
            });
        }
    });
    
   
};

exports.delete_restaurant = function (req,res,next){
    console.log(req.body);
    return models.Restaurant.destroy({
        where : {
            RestaurantID : req.params.restaurant_id,
        },
    }).then(resul =>{
        models.MenuRestaurant.destroy({
            where:{
                RestaurantID : req.params.restaurant_id,
            }
        }).then(result =>{
            console.log(result);
            res.send({mesg:"Success"});
        });
    })
};

exports.delete_menu_item = function(req,res,next){
    return models.Menu.destroy({
        where: {
            Menu_List_Id: req.params.menulistid
        }
    }).then((result) => {
         console.log(result);                  
         res.send({msg: "Success"});
    });
};

exports.add_menu_item =function (req,res,next){
    // console.log("Lead Email: ",req.body);
    // console.log("Lead Email: ",req.body.MenuID);
    // console.log("Lead Email: ",req.params.restaurant_id);
    let formattedPrice = addZeroes(req.body.Price);
    console.log(req.body);
    return models.Menu.create({
        MenuID : req.body.MenuID,
        Name : req.body.Name,
        Category : req.body.Category,
        Price : formattedPrice,
        Size : req.body.Size,
    }).then((result) => {
        console.log(result);
        res.redirect('/restaurant/'+req.params.restaurant_id+'/menu');      
    }).catch((err) => {
       console.log("LEAD EMAIL NOT SUCCESSFUL SAVED."+err);
    });    
};

exports.get_selected_restaurant = function(req,res,next){
    let search_Query = {};
    let name = req.body.name.toLowerCase();
    if(req.body.X != '')
        search_Query.X = req.body.X;
    if(req.body.Y != '')
            search_Query.Y = req.body.Y;
    if(req.body.name != '')
        search_Query.Name = sequelize.where(sequelize.fn('LOWER', sequelize.col('Name')), 'LIKE', '%' + name + '%');
        // {[Op.like]: '%'+req.body.name.toLowerCase()+'%'};
        
    return models.Restaurant.findAll({        
            where: {
                [Op.or]: search_Query,
                // 'Name' : {
                //    [Op.like]: search_Query.Name
                // },
            },order:[
                ['Name','ASC'],
                ['X','ASC']     
            ],
        }).then(result =>{        
            console.log(result);
            if (result.length != 0){
                console.log("FOUND RESULT");
                res.render('restaurant/restaurants',{title: 'Restaurants',user: req.user,restaurants: result});
            }  
            else{
                console.log("NOT FOUND RESULT");
                res.render('restaurant/restaurants',{title: 'Restaurants',user: req.user,restaurants: result,expressFlash: "RESULT NOT FOUND"});
            }
        });
};