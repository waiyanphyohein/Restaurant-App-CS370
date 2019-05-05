'use strict'
module.exports= (sequelize,DataTypes) => {
    var MenuItem = sequelize.define('MenuItem',{
        MenuID: {
            allowNull : false,
            primaryKey: true,
            type : DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
        },
        Menu_List_Id : {
            allowNull: false,
            type: DataTypes.UUID,              
        },
    });
    return MenuItem;
};