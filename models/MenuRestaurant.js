'use strict'
module.exports= (sequelize,DataTypes) => {
    var MenuRestaurant = sequelize.define('MenuRestaurant',{
        MenuID: {
            allowNull : false,
            primaryKey: true,
            type : DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
        },
        RestaurantID : {
            allowNull: false,
            type: DataTypes.UUID,              
        },
    });
    return MenuRestaurant;
};