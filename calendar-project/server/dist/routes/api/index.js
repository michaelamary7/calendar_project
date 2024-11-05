"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const eventRoutes_js_1 = require("./eventRoutes.js");
const router = (0, express_1.Router)();
router.use('/event', eventRoutes_js_1.eventRoutes);
exports.default = router;
