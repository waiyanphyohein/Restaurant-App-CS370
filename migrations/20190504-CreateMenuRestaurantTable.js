'use strict'
module.exports = {
    up:(queryInterface,Sequelize) => {
        return queryInterface.createTable('MenuRestaurant',{
            
            MenuID: {
                allowNull : false,
                primaryKey: true,
                type : Sequelize.UUID,
                defaultValue: Sequelize.UUIDV4,
            },
            RestaurantID : {
                allowNull: false,
                type: Sequelize.UUID,              
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
        return queryInterface.dropTable('MenuRestaurant');
    }
};