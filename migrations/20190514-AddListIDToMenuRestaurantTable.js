'use strict'

const columnAndTypes = [{
    name : 'ListId',
    type : (Sequelize) => {
        return {
            allowNull : false,                
            type : Sequelize.UUID,
            primaryKey: true,
            defaultValue: Sequelize.UUIDV4,
        };
    }
}];

module.exports = {
    up:(queryInterface,Sequelize) => {
        return Promise.all(
            columnAndTypes.map(c => {
                return queryInterface.addColumn(
                    'MenuRestaurant',c.name,c.type(Sequelize)
                );
            })
        );
    },
    down: (queryInterface,Sequelize) => {
        return Promise.all(
            columnAndTypes.map(c => {
                return queryInterface.removeColumn(
                    'MenuRestaurant',c.name
                );
            })
        );
    },
};