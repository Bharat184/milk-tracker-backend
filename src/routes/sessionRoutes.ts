import express from 'express';
import { createSession, getSessions } from '../controllers/sessionController';

const router = express.Router();

router.route('/')
  .post(createSession)
  .get(getSessions);

export default router;
