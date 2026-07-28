import mongoose, { Schema, Types } from 'mongoose';

export interface User {
  username: string;
  email: string;
  displayName: string;
  team?: Types.ObjectId;
}

export interface Team {
  name: string;
  mascot?: string;
  members: Types.ObjectId[];
}

export interface Activity {
  user: Types.ObjectId;
  activityType: string;
  durationMinutes: number;
  points: number;
  completedAt: Date;
}

export interface LeaderboardEntry {
  user: Types.ObjectId;
  team?: Types.ObjectId;
  points: number;
  rank?: number;
}

export interface Workout {
  name: string;
  description: string;
  intensity: 'low' | 'medium' | 'high';
  durationMinutes: number;
  targetMuscleGroups: string[];
}

const userSchema = new Schema<User>(
  {
    username: { type: String, required: true, trim: true, unique: true },
    email: { type: String, required: true, trim: true, unique: true },
    displayName: { type: String, required: true, trim: true },
    team: { type: Schema.Types.ObjectId, ref: 'Team' },
  },
  { timestamps: true },
);

const teamSchema = new Schema<Team>(
  {
    name: { type: String, required: true, trim: true, unique: true },
    mascot: { type: String, trim: true },
    members: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  },
  { timestamps: true },
);

const activitySchema = new Schema<Activity>(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    activityType: { type: String, required: true, trim: true },
    durationMinutes: { type: Number, required: true, min: 1 },
    points: { type: Number, required: true, min: 0 },
    completedAt: { type: Date, default: Date.now },
  },
  { timestamps: true },
);

const leaderboardEntrySchema = new Schema<LeaderboardEntry>(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    team: { type: Schema.Types.ObjectId, ref: 'Team' },
    points: { type: Number, required: true, min: 0 },
    rank: { type: Number, min: 1 },
  },
  { timestamps: true },
);

const workoutSchema = new Schema<Workout>(
  {
    name: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    intensity: { type: String, enum: ['low', 'medium', 'high'], required: true },
    durationMinutes: { type: Number, required: true, min: 1 },
    targetMuscleGroups: [{ type: String, required: true, trim: true }],
  },
  { timestamps: true },
);

export const UserModel = mongoose.model<User>('User', userSchema);
export const TeamModel = mongoose.model<Team>('Team', teamSchema);
export const ActivityModel = mongoose.model<Activity>('Activity', activitySchema);
export const LeaderboardEntryModel = mongoose.model<LeaderboardEntry>(
  'LeaderboardEntry',
  leaderboardEntrySchema,
);
export const WorkoutModel = mongoose.model<Workout>('Workout', workoutSchema);