import { DataTypes } from 'sequelize';

import database from '../database/connection.js';

const Character = database.define('Character', {
    image: {
        type: DataTypes.STRING
    },
    name: {
        type: DataTypes.STRING
    },
    age: {
        type: DataTypes.INTEGER,
        validate: {
            min: 0
        }
    },
    weight: {
        type: DataTypes.INTEGER,
        validate: {
            min: 0
        }
    },
    history: {
        type: DataTypes.STRING
    }
}, {
    timestamps: false
});

export default Character ;


