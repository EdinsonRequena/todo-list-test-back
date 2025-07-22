import { Request, Response, NextFunction } from 'express';
import * as taskService from '../services/task.service';

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
    const { status, q, page, limit } = req.query;
    const tasks = await taskService.listTasks({
      userId,
      status: status as any,
      q: q as string,
      page: page ? Number(page) : undefined,
      limit: limit ? Number(limit) : undefined,
    });
    res.json(tasks);
  } catch (err) {
    next(err);
  }
}

export async function update(req: Request, res: Response, next: NextFunction) {
  try {
    const userId = (req as any).user.id;
    const task = await taskService.updateTask(Number(req.params.id), userId, req.body);

    res.json({
      message: 'Task updated successfully.',
      task,
    });
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

    res.json({
      message: 'Task deleted successfully.',
      task,
    });
  } catch (err) {
    next(err);
  }
}
