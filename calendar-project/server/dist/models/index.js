"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = exports.Event = exports.sequelize = void 0;
const connection_js_1 = __importDefault(require("../config/connection.js"));
exports.sequelize = connection_js_1.default;
const event_js_1 = require("./event.js");
const user_js_1 = require("./user.js");
const Event = (0, event_js_1.EventFactory)(connection_js_1.default);
exports.Event = Event;
const User = (0, user_js_1.UserFactory)(connection_js_1.default);
exports.User = User;
