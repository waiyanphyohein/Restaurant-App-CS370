'use strict'
module.exports= (sequelize,DataTypes) => {
    var Menu_MenuName = sequelize.define('Menu_MenuName',{
        MenuID: {
            allowNull : false,
            primaryKey: true,
            type : DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
        },
        Name : {
            allowNull: false,
            type: DataTypes.STRING,              
        },
    });
    return Menu_MenuName;
};