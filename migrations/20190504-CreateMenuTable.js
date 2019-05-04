'use strict'
module.exports = {
    up:(queryInterface,Sequelize) => {
        return queryInterface.createTable('Menu',{
            
            Menu_List_Id:{
                allowNull: false,
                primaryKey: true,
                type: Sequelize.UUID,
                defaultValue: Sequelize.UUIDV4,
            },
            Name: {
                primaryKey: true,
                allowNull : false,
                type : Sequelize.STRING,
            },
            // Breakfast, Lunch, Dinner
            Menu_Type:{
                type : Sequelize.STRING,
                allowNull: true,
            },
            // Appetizer, Entree, Desserts, Drinks
            Category:{
                type : Sequelize.STRING, 
                allowNull: true,
            },
            Price: {
                allowNull : false,
                type: Sequelize.DECIMAL
            },
            Size: {
                type: Sequelize.STRING,
                allowNull : true,
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
        return queryInterface.dropTable('Menu');
    }
};