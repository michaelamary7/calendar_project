import { DataTypes, Sequelize, Model } from 'sequelize';

// Define an interface for the attributes
interface EventAttributes {
  event_id: string;
  description: string;
  date: string;
  time: string;
  location: string;
  user_id: string;
}

interface EventCreationAttributes extends EventAttributes {}

export class Event extends Model<EventAttributes, EventCreationAttributes> implements EventAttributes {
  public event_id!: string;
  public description!: string;
  public date!: string;
  public time!: string;
  public location!: string;
  public user_id!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

export function EventFactory(sequelize: Sequelize): typeof Event {
  Event.init(
    {
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
    },
    {
      sequelize,
      timestamps: false,
      underscored: true,
      freezeTableName: true,
    }
  );

  return Event;
}
