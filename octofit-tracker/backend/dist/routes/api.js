"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const models_1 = require("../models");
const router = (0, express_1.Router)();
function asyncHandler(handler) {
    return (request, response, next) => {
        handler(request, response, next).catch(next);
    };
}
function collectionRouter(model, sort = { createdAt: -1 }) {
    const collection = (0, express_1.Router)();
    collection.get('/', asyncHandler(async (_request, response) => {
        const records = await model.find().sort(sort).lean();
        response.json(records);
    }));
    collection.post('/', asyncHandler(async (request, response) => {
        const record = await model.create(request.body);
        response.status(201).json(record);
    }));
    return collection;
}
router.use('/users', collectionRouter(models_1.UserModel));
router.use('/teams', collectionRouter(models_1.TeamModel));
router.use('/activities', collectionRouter(models_1.ActivityModel, { completedAt: -1 }));
router.use('/leaderboard', collectionRouter(models_1.LeaderboardEntryModel, { points: -1, rank: 1 }));
router.use('/workouts', collectionRouter(models_1.WorkoutModel));
exports.default = router;
