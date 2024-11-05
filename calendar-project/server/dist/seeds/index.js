import { seedEvents } from './eventseeds.js'; // Import the function to seed jokes
import sequelize from '../config/connection.js';
const seedAll = async () => {
    try {
        await sequelize.sync({ force: true });
        console.log('\n----- DATABASE SYNCED -----\n');
        await seedEvents();
        console.log('\n----- EVENT SEEDED -----\n');
        process.exit(0);
    }
    catch (error) {
        console.error('Error seeding database:', error);
        process.exit(1);
    }
};
seedAll();
