'use strict'
module.exports= (sequelize,DataTypes) => {
    var Menu = sequelize.define('Menu',{
        Menu_List_Id:{
            allowNull: false,
            primaryKey: true,
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
        },
        // FROM MENU_ITEM_TABLE CONNECTION
        MenuID:{
            allowNull: false,
            type: DataTypes.UUID
        },
        Name: {
            primaryKey: true,
            allowNull : false,
            type : DataTypes.STRING,
        },
        // Breakfast, Lunch, Dinner
        Menu_Type:{
            type : DataTypes.STRING,
            allowNull: true,
        },
        // Appetizer, Entree, Desserts, Drinks
        Category:{
            type : DataTypes.STRING, 
            allowNull: true,
        },
        Price: {
            allowNull : false,
            type: DataTypes.DECIMAL
        },
        Size: {
            type: DataTypes.STRING,
            allowNull : true,
        },
    });
    return Menu;
};