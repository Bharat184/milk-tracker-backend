import { Request, Response } from 'express';
import { z } from 'zod';
import Session from '../models/Session';

const createSessionSchema = z.object({
  start_time: z.string().datetime(),
  end_time: z.string().datetime(),
  duration: z.number().int().positive(),
  milk_quantity: z.number().positive(),
});

export const createSession = async (req: Request, res: Response): Promise<void> => {
  try {
    const parsedData = createSessionSchema.safeParse(req.body);

    if (!parsedData.success) {
      res.status(400).json({ message: 'Validation Error', errors: parsedData.error.format() });
      return;
    }

    const { start_time, end_time, duration, milk_quantity } = parsedData.data;

    const session = new Session({
      start_time,
      end_time,
      duration,
      milk_quantity
    });

    const createdSession = await session.save();

    res.status(201).json(createdSession);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error });
  }
};

export const getSessions = async (req: Request, res: Response): Promise<void> => {
  try {
    const sessions = await Session.find({});
    res.json(sessions);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error });
  }
};
