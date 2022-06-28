import { DataTypes } from 'sequelize';

import database from '../database/connection.js';

const Genre = database.define('Genre', {
    name: {
        type: DataTypes.STRING
    },
    image: {
        type: DataTypes.STRING
    }
}, {
    timestamps: false
});

export default Genre ;


    