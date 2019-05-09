'use strict'
module.exports = {
    up:(queryInterface,Sequelize) => {
        return queryInterface.createTable('Menu_MenuName',{
            
            MenuID: {
                allowNull : false,
                primaryKey: true,
                type : Sequelize.UUID,
                defaultValue: Sequelize.UUIDV4,
            },
            Name : {
                allowNull: false,
                type: Sequelize.STRING,              
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
        return queryInterface.dropTable('Menu_MenuName');
    }
};