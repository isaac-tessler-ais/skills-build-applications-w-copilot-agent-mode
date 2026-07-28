"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.WorkoutModel = exports.LeaderboardEntryModel = exports.ActivityModel = exports.TeamModel = exports.UserModel = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const userSchema = new mongoose_1.Schema({
    username: { type: String, required: true, trim: true, unique: true },
    email: { type: String, required: true, trim: true, unique: true },
    displayName: { type: String, required: true, trim: true },
    team: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Team' },
}, { timestamps: true });
const teamSchema = new mongoose_1.Schema({
    name: { type: String, required: true, trim: true, unique: true },
    mascot: { type: String, trim: true },
    members: [{ type: mongoose_1.Schema.Types.ObjectId, ref: 'User' }],
}, { timestamps: true });
const activitySchema = new mongoose_1.Schema({
    user: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User', required: true },
    activityType: { type: String, required: true, trim: true },
    durationMinutes: { type: Number, required: true, min: 1 },
    points: { type: Number, required: true, min: 0 },
    completedAt: { type: Date, default: Date.now },
}, { timestamps: true });
const leaderboardEntrySchema = new mongoose_1.Schema({
    user: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User', required: true },
    team: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Team' },
    points: { type: Number, required: true, min: 0 },
    rank: { type: Number, min: 1 },
}, { timestamps: true });
const workoutSchema = new mongoose_1.Schema({
    name: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    intensity: { type: String, enum: ['low', 'medium', 'high'], required: true },
    durationMinutes: { type: Number, required: true, min: 1 },
    targetMuscleGroups: [{ type: String, required: true, trim: true }],
}, { timestamps: true });
exports.UserModel = mongoose_1.default.model('User', userSchema);
exports.TeamModel = mongoose_1.default.model('Team', teamSchema);
exports.ActivityModel = mongoose_1.default.model('Activity', activitySchema);
exports.LeaderboardEntryModel = mongoose_1.default.model('LeaderboardEntry', leaderboardEntrySchema);
exports.WorkoutModel = mongoose_1.default.model('Workout', workoutSchema);
