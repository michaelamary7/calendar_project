"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Event = void 0;
exports.EventFactory = EventFactory;
const sequelize_1 = require("sequelize");
class Event extends sequelize_1.Model {
}
exports.Event = Event;
function EventFactory(sequelize) {
    Event.init({
        event_id: {
            type: sequelize_1.DataTypes.STRING,
            autoIncrement: true,
            primaryKey: true,
        },
        description: {
            type: sequelize_1.DataTypes.STRING,
        },
        date: {
            type: sequelize_1.DataTypes.STRING,
        },
        time: {
            type: sequelize_1.DataTypes.STRING,
        },
        location: {
            type: sequelize_1.DataTypes.STRING,
        },
        user_id: {
            type: sequelize_1.DataTypes.STRING,
        },
    }, {
        sequelize,
        timestamps: false,
        underscored: true,
        freezeTableName: true,
    });
    return Event;
}
