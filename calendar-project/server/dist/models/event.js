import { DataTypes, Model } from 'sequelize';
export class Event extends Model {
}
export function EventFactory(sequelize) {
    Event.init({
        event_id: {
            type: DataTypes.STRING,
            autoIncrement: true,
            primaryKey: true,
        },
        description: {
            type: DataTypes.STRING,
        },
        date: {
            type: DataTypes.STRING,
        },
        time: {
            type: DataTypes.STRING,
        },
        location: {
            type: DataTypes.STRING,
        },
        user_id: {
            type: DataTypes.STRING,
        },
    }, {
        sequelize,
        timestamps: false,
        underscored: true,
        freezeTableName: true,
    });
    return Event;
}
