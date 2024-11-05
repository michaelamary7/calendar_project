"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const eventseeds_js_1 = require("./eventseeds.js"); // Import the function to seed jokes
const connection_js_1 = __importDefault(require("../config/connection.js"));
const seedAll = async () => {
    try {
        await connection_js_1.default.sync({ force: true });
        console.log('\n----- DATABASE SYNCED -----\n');
        await (0, eventseeds_js_1.seedEvents)();
        console.log('\n----- EVENT SEEDED -----\n');
        process.exit(0);
    }
    catch (error) {
        console.error('Error seeding database:', error);
        process.exit(1);
    }
};
seedAll();
