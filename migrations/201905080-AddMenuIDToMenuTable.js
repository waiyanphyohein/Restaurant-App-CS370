
'use strict'

const columnAndTypes = [{
    name : 'MenuID',
    type : (Sequelize) => {
        return {
            type: Sequelize.UUID,
            allowNull : false,        
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