"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.eventRoutes = exports.createEvents = exports.createEvent = exports.getEventById = exports.getAllEvents = void 0;
const express_1 = require("express");
const index_js_1 = require("../../models/index.js");
const getAllEvents = async (_req, res) => {
    try {
        const users = await index_js_1.Event.findAll();
        res.json(users);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.getAllEvents = getAllEvents;
// GET /Events/:id
const getEventById = async (req, res) => {
    const { id } = req.params;
    try {
        const event = await index_js_1.Event.findByPk(id);
        if (event !== null && event !== undefined) {
            res.json(event);
        }
        else {
            res.status(404).json({ message: 'Event not found' });
        }
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.getEventById = getEventById;
// POST /Events
const createEvent = async (req, res) => {
    const { event_id, description, date, time, location, user_id } = req.body;
    try {
        const newEvent = await index_js_1.Event.create({ event_id, description, date, time, location, user_id });
        res.status(201).json(newEvent);
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
};
exports.createEvent = createEvent;
// POST /Event/Seed
const createEvents = async (_req, res) => {
    try {
        // Multiple rows can be created with `bulkCreate()` and an array
        // This could also be moved to a separate Node.js script to ensure it only happens once
        index_js_1.Event.bulkCreate([
            {
                event_id: 'Soccer Practice',
                description: 'Practice for the big game',
                location: 'Soccer Field',
                date: '10/1/2024',
                time: '5 PM',
                user_id: 'user1',
            },
            {
                event_id: 'Gym Workout',
                description: 'Workout with personal trainer',
                location: 'Gym',
                date: '10/2/2024',
                time: '6 PM',
                user_id: 'user1',
            },
            {
                event_id: 'Dentist Appointment',
                description: 'Get teeth cleaned',
                location: 'Dentist Office',
                date: '10/3/2024',
                time: '2 PM',
                user_id: 'user1',
            },
            {
                event_id: 'Movie Night',
                description: 'Watch a movie with friends',
                location: 'Home',
                date: '10/4/2024',
                time: '8 PM',
                user_id: 'user1',
            },
            {
                event_id: 'Work Meeting',
                description: 'Meeting with boss',
                location: 'Office',
                date: '10/6/2024',
                time: '1 PM',
                user_id: 'user1',
            },
            {
                event_id: 'Soccer Game',
                description: 'Big game against rival team',
                location: 'Soccer Field',
                date: '10/1/2024',
                time: '5 PM',
                user_id: 'user1',
            }
        ]);
        res.status(200).json({ message: 'Event data seeded.' });
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
};
exports.createEvents = createEvents;
const router = (0, express_1.Router)();
exports.eventRoutes = router;
// GET /events - Get all events
router.get('/', exports.getAllEvents);
// GET a single event by ID
router.get('/:id', exports.getEventById);
// POST /event - Create a new event
router.post('/', exports.createEvent);
// POST /event/seed - Create multiple events
router.post('/seed', exports.createEvent);
