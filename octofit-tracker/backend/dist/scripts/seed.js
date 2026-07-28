"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const models_1 = require("../models");
const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';
/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
    try {
        await mongoose_1.default.connect(connectionString);
        console.log('Connected to octofit_db');
        console.log('Seed the octofit_db database with test data');
        await Promise.all([
            models_1.ActivityModel.deleteMany({}),
            models_1.LeaderboardEntryModel.deleteMany({}),
            models_1.UserModel.deleteMany({}),
            models_1.TeamModel.deleteMany({}),
            models_1.WorkoutModel.deleteMany({}),
        ]);
        const teams = await models_1.TeamModel.insertMany([
            { name: 'Solar Striders', mascot: 'Comet', members: [] },
            { name: 'Trail Blazers', mascot: 'Summit', members: [] },
            { name: 'Core Crushers', mascot: 'Kettlebell', members: [] },
        ]);
        const users = await models_1.UserModel.insertMany([
            {
                username: 'maya_runner',
                email: 'maya.runner@example.com',
                displayName: 'Maya Patel',
                team: teams[0]._id,
            },
            {
                username: 'leo_lifts',
                email: 'leo.lifts@example.com',
                displayName: 'Leo Nguyen',
                team: teams[2]._id,
            },
            {
                username: 'sofia_cycles',
                email: 'sofia.cycles@example.com',
                displayName: 'Sofia Martinez',
                team: teams[1]._id,
            },
            {
                username: 'jamal_rows',
                email: 'jamal.rows@example.com',
                displayName: 'Jamal Carter',
                team: teams[0]._id,
            },
            {
                username: 'nina_yoga',
                email: 'nina.yoga@example.com',
                displayName: 'Nina Brooks',
                team: teams[1]._id,
            },
        ]);
        await Promise.all([
            models_1.TeamModel.findByIdAndUpdate(teams[0]._id, { members: [users[0]._id, users[3]._id] }),
            models_1.TeamModel.findByIdAndUpdate(teams[1]._id, { members: [users[2]._id, users[4]._id] }),
            models_1.TeamModel.findByIdAndUpdate(teams[2]._id, { members: [users[1]._id] }),
        ]);
        await models_1.ActivityModel.insertMany([
            {
                user: users[0]._id,
                activityType: 'Outdoor Run',
                durationMinutes: 42,
                points: 420,
                completedAt: new Date('2026-07-21T13:30:00.000Z'),
            },
            {
                user: users[1]._id,
                activityType: 'Strength Training',
                durationMinutes: 55,
                points: 510,
                completedAt: new Date('2026-07-22T18:15:00.000Z'),
            },
            {
                user: users[2]._id,
                activityType: 'Cycling',
                durationMinutes: 68,
                points: 640,
                completedAt: new Date('2026-07-23T11:00:00.000Z'),
            },
            {
                user: users[3]._id,
                activityType: 'Rowing',
                durationMinutes: 36,
                points: 390,
                completedAt: new Date('2026-07-24T14:45:00.000Z'),
            },
            {
                user: users[4]._id,
                activityType: 'Yoga Flow',
                durationMinutes: 50,
                points: 310,
                completedAt: new Date('2026-07-25T09:20:00.000Z'),
            },
        ]);
        await models_1.LeaderboardEntryModel.insertMany([
            { user: users[2]._id, team: teams[1]._id, points: 1640, rank: 1 },
            { user: users[1]._id, team: teams[2]._id, points: 1510, rank: 2 },
            { user: users[0]._id, team: teams[0]._id, points: 1420, rank: 3 },
            { user: users[3]._id, team: teams[0]._id, points: 1390, rank: 4 },
            { user: users[4]._id, team: teams[1]._id, points: 1310, rank: 5 },
        ]);
        await models_1.WorkoutModel.insertMany([
            {
                name: '5K Pace Builder',
                description: 'Intervals and tempo segments for runners improving speed endurance.',
                intensity: 'medium',
                durationMinutes: 35,
                targetMuscleGroups: ['legs', 'core'],
            },
            {
                name: 'Full-Body Strength Circuit',
                description: 'Compound lifts and short rests for total-body strength development.',
                intensity: 'high',
                durationMinutes: 45,
                targetMuscleGroups: ['chest', 'back', 'legs', 'shoulders'],
            },
            {
                name: 'Recovery Mobility Flow',
                description: 'Low-impact mobility work for active recovery days.',
                intensity: 'low',
                durationMinutes: 25,
                targetMuscleGroups: ['hips', 'hamstrings', 'shoulders'],
            },
            {
                name: 'Cycling Hill Repeats',
                description: 'Climbing intervals that build power for outdoor rides.',
                intensity: 'high',
                durationMinutes: 50,
                targetMuscleGroups: ['quads', 'glutes', 'calves'],
            },
        ]);
        console.log(`Database seeding complete: ${users.length} users, ${teams.length} teams, 5 activities, 5 leaderboard entries, 4 workouts`);
        await mongoose_1.default.disconnect();
    }
    catch (error) {
        console.error('Error seeding database:', error);
        process.exit(1);
    }
}
seedDatabase();
