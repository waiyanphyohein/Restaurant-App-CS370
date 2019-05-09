'use strict'

const columnAndTypes = [{
    name : 'Menu_List_Id',
    type : (Sequelize) => {
        return {
            type: Sequelize.UUID,            
            allowNull : true,
            defaultValue: Sequelize.UUIDV4,
        };
    }
}];

module.exports = {
    up:(queryInterface,Sequelize) => {
        return Promise.all(
            columnAndTypes.map(c => {
                return queryInterface.addColumn(
                    'Menu',c.name,c.type(Sequelize)
                );
            })
        );
    },
    down: (queryInterface,Sequelize) => {
        return Promise.all(
            columnAndTypes.map(c => {
                return queryInterface.removeColumn(
                    'Menu',c.name
                );
            })
        );
    },
};