import sequelize from '../config/connection.js';
import { EventFactory } from './event.js';
import { UserFactory } from './user.js';
const Event = EventFactory(sequelize);
const User = UserFactory(sequelize);
export { sequelize, Event, User };
