import { Event } from '../models/index.js';
export const seedEvents = async () => {
    await Event.bulkCreate([
        {
            user_id: 'user1',
            event_id: 'Soccer Practice',
            description: '...',
            date: '...',
            time: '...',
            location: '...',
        },
        {
            user_id: 'user1',
            event_id: 'Get teeth cleaned',
            description: '...',
            date: '...',
            time: '...',
            location: '...',
        },
        {
            user_id: 'user1',
            event_id: 'Workout with personal trainer',
            description: '...',
            date: '...',
            time: '...',
            location: '...',
        },
        {
            user_id: 'user1',
            event_id: 'Dentist Appointment',
            description: '...',
            date: '...',
            time: '...',
            location: '...',
        },
    ]);
};
