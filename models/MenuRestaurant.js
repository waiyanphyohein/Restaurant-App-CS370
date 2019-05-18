'use strict'
module.exports= (sequelize,DataTypes) => {
    var MenuRestaurant = sequelize.define('MenuRestaurant',{
        ListId:{
            allowNull : false,                
            type : DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4,
        },
        MenuID: {
            allowNull : false,            
            type : DataTypes.UUID,        
        },
        RestaurantID : {
            allowNull: false,
            type: DataTypes.UUID,              
        },
    });
    return MenuRestaurant;
};