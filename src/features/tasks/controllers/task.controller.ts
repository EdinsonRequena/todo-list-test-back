import { Request, Response, NextFunction } from 'express';
import * as taskService from '../services/task.service';
import type { StatusFilter } from '../services/task.service';

const toInt = (v: string | undefined, def: number) =>
  Number.isFinite(Number(v)) && Number(v) > 0 ? Number(v) : def;

export async function create(req: Request, res: Response, next: NextFunction) {
  try {
    const userId = (req as any).user.id;
    const task = await taskService.createTask(userId, req.body);
    res.status(201).json(task);
  } catch (err) {
    next(err);
  }
}

export async function list(req: Request, res: Response, next: NextFunction) {
  try {
    const userId = (req as any).user.id;
    const { status = 'all', q = '', page, limit } = req.query;

    const data = await taskService.listTasks({
      userId,
      status: status as StatusFilter,
      q: String(q),
      page: toInt(page as string | undefined, 1),
      limit: toInt(limit as string | undefined, 20),
    });

    res.json(data);
  } catch (err) {
    next(err);
  }
}

export async function update(req: Request, res: Response, next: NextFunction) {
  try {
    const userId = (req as any).user.id;
    const task = await taskService.updateTask(Number(req.params.id), userId, req.body);
    res.json({ message: 'Task updated successfully.', task });
  } catch (err) {
    next(err);
  }
}

export async function toggle(req: Request, res: Response, next: NextFunction) {
  try {
    const userId = (req as any).user.id;
    const task = await taskService.toggleTask(Number(req.params.id), userId);
    res.json(task);
  } catch (err) {
    next(err);
  }
}

export async function remove(req: Request, res: Response, next: NextFunction) {
  try {
    const userId = (req as any).user.id;
    const task = await taskService.deleteTask(Number(req.params.id), userId);
    res.json({ message: 'Task deleted successfully.', task });
  } catch (err) {
    next(err);
  }
}
