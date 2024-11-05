import { Router, Request, Response } from 'express';
import { Event } from '../../models/index.js';

export const getAllEvents = async (_req: Request, res: Response) => {
  try {
    const users = await Event.findAll();
    res.json(users);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// GET /Events/:id
export const getEventById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const event = await Event.findByPk(id);
    if (event !== null && event !== undefined) {
      res.json(event);
    } else {
      res.status(404).json({ message: 'Event not found' });
    }
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// POST /Events
export const createEvent = async (req: Request, res: Response) => {
  const { event_id, description, date, time, location, user_id } = req.body;
  try {
    const newEvent = await Event.create({ event_id, description, date, time, location, user_id });
    res.status(201).json(newEvent);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

// POST /Event/Seed
export const createEvents = async (_req: Request, res: Response) => {
  try {
  // Multiple rows can be created with `bulkCreate()` and an array
  // This could also be moved to a separate Node.js script to ensure it only happens once
  Event.bulkCreate([
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
  ])
    res.status(200).json({ message: 'Event data seeded.' });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

const router = Router();

// GET /events - Get all events
router.get('/', getAllEvents);


// GET a single event by ID
router.get('/:id', getEventById);

// POST /event - Create a new event
router.post('/', createEvent);

// POST /event/seed - Create multiple events
router.post('/seed', createEvent);



export { router as eventRoutes };
