"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.seedEvents = void 0;
const index_js_1 = require("../models/index.js");
const seedEvents = async () => {
    await index_js_1.Event.bulkCreate([
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
exports.seedEvents = seedEvents;
