'use strict'

const columnAndTypes = [{
    name : 'Theme',
    type : (Sequelize) => {
        return {
            type: Sequelize.STRING,
            allowNull : true,
            defaultValue: false,
        };
    }
}];

module.exports = {
    up:(queryInterface,Sequelize) => {
        return Promise.all(
            columnAndTypes.map(c => {
                return queryInterface.addColumn(
                    'Restaurants',c.name,c.type(Sequelize)
                );
            })
        );
    },
    down: (queryInterface,Sequelize) => {
        return Promise.all(
            columnAndTypes.map(c => {
                return queryInterface.removeColumn(
                    'Restaurants',c.name
                );
            })
        );
    },
};