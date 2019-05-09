'use strict'
module.exports= (sequelize,DataTypes) => {
    var Restaurant = sequelize.define('Restaurant',{        
        RestaurantID:{
            allowNull: false,
            primaryKey: true,
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
        },
        // NAME OF RESTAURANTS
        Name: {
            primaryKey: true,
            allowNull : false,
            type : DataTypes.STRING,
        },
        // Breakfast, Lunch, Dinner
        X:{
            allowNull: false,
            type : DataTypes.BIGINT,
        },
        // Appetizer, Entree, Desserts, Drinks
        Y:{
            type : DataTypes.BIGINT, 
            allowNull: false,
        },
        Description: {
            type: DataTypes.STRING,
            allowNull : false
        },
        Opening_Hours: {
            type: DataTypes.STRING,
            allowNull : false,
        },
        Theme :{
            type: DataTypes.STRING,
            allowNull: true,
        },
    });
    return Restaurant;
};