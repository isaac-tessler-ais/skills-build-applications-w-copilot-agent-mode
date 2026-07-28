import { NextFunction, Request, Response, Router } from 'express';
import { Model } from 'mongoose';

import {
  ActivityModel,
  LeaderboardEntryModel,
  TeamModel,
  UserModel,
  WorkoutModel,
} from '../models';

const router = Router();

function asyncHandler(
  handler: (request: Request, response: Response, next: NextFunction) => Promise<void>,
) {
  return (request: Request, response: Response, next: NextFunction) => {
    handler(request, response, next).catch(next);
  };
}

function collectionRouter(model: Model<any>, sort: Record<string, 1 | -1> = { createdAt: -1 }) {
  const collection = Router();

  collection.get(
    '/',
    asyncHandler(async (_request, response) => {
      const records = await model.find().sort(sort).lean();
      response.json(records);
    }),
  );

  collection.post(
    '/',
    asyncHandler(async (request, response) => {
      const record = await model.create(request.body);
      response.status(201).json(record);
    }),
  );

  return collection;
}

router.use('/users', collectionRouter(UserModel));
router.use('/teams', collectionRouter(TeamModel));
router.use('/activities', collectionRouter(ActivityModel, { completedAt: -1 }));
router.use('/leaderboard', collectionRouter(LeaderboardEntryModel, { points: -1, rank: 1 }));
router.use('/workouts', collectionRouter(WorkoutModel));

export default router;