import { DataTypes } from 'sequelize';

import database from '../database/connection.js';

const Movie = database.define('Movie', {
    image: {
        type: DataTypes.STRING
    },
    title: {
        type: DataTypes.STRING
    },
    calification: {
        type: DataTypes.INTEGER,
        validate: {
            min: 1,
            max: 5
        }
    }
}, {
    updatedAt: false
});

export default Movie;

