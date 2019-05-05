'use strict'
module.exports = {
    up:(queryInterface,Sequelize) => {
        return queryInterface.createTable('Restaurants',{
            
            RestaurantID:{
                allowNull: false,
                primaryKey: true,
                type: Sequelize.UUID,
                defaultValue: Sequelize.UUIDV4,
            },
            // NAME OF RESTAURANTS
            Name: {
                primaryKey: true,
                allowNull : false,
                type : Sequelize.STRING,
            },
            // Breakfast, Lunch, Dinner
            X:{
                allowNull: false,
                type : Sequelize.BIGINT,
            },
            // Appetizer, Entree, Desserts, Drinks
            Y:{
                type : Sequelize.BIGINT, 
                allowNull: false,
            },
            Description: {
                type: Sequelize.STRING,
                allowNull : false
            },
            Opening_Hours: {
                type: Sequelize.STRING,
                allowNull : false,
            },
            createdAt:{
                allowNull: false,
                type: Sequelize.DATE,            
            },
            updatedAt:{
                allowNull:false,
                type : Sequelize.DATE,
            },
        });
    },
    down : (queryInterface,Sequelize) => {
        return queryInterface.dropTable('Restaurants');
    }
};