'use strict'
module.exports = {
    up:(queryInterface,Sequelize) => {
        return queryInterface.createTable('MenuItem',{
            
            MenuID: {
                allowNull : false,
                primaryKey: true,
                type : Sequelize.UUID,
                defaultValue: Sequelize.UUIDV4,
            },
            Menu_List_Id : {
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
        return queryInterface.dropTable('MenuItem');
    }
};