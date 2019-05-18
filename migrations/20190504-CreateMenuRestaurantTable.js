'use strict'
module.exports = {
    up:(queryInterface,Sequelize) => {
        return queryInterface.createTable('MenuRestaurant',{
            ListId:{
                allowNull : false,                
                type : Sequelize.UUID,
                primaryKey: true,
                defaultValue: Sequelize.UUIDV4,
            },
            MenuID: {
                allowNull : false,                
                type : Sequelize.UUID,
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