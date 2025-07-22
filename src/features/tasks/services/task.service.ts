import { prisma } from '../../../config/prisma';
import { ApiError } from '../../../utils/api-error';

interface ListParams {
  userId: number;
  status?: 'completed' | 'pending';
  q?: string;
  page?: number;
  limit?: number;
}

async function getTaskOr404(id: number, userId: number) {
  const task = await prisma.task.findUnique({ where: { id } });
  if (!task || task.userId !== userId) {
    throw new ApiError(404, 'Task not found', 'TASK_NOT_FOUND');
  }
  return task;
}

export async function createTask(userId: number, data: { title: string; description?: string }) {
  return prisma.task.create({ data: { ...data, userId } });
}

export async function listTasks({ userId, status, q, page = 1, limit = 20 }: ListParams) {
  const where: any = { userId };

  if (status === 'completed') where.completed = true;
  if (status === 'pending') where.completed = false;
  if (q)
    where.OR = [
      { title: { contains: q, mode: 'insensitive' } },
      { description: { contains: q, mode: 'insensitive' } },
    ];

  return prisma.task.findMany({
    where,
    orderBy: { id: 'desc' },
    skip: (page - 1) * limit,
    take: limit,
  });
}

export async function toggleTask(id: number, userId: number) {
  const task = await getTaskOr404(id, userId);
  return prisma.task.update({
    where: { id },
    data: { completed: !task.completed },
  });
}

export async function updateTask(
  id: number,
  userId: number,
  data: { title?: string; description?: string },
) {
  const task = await getTaskOr404(id, userId);
  if (!data.title && data.description === undefined) {
    throw new ApiError(400, 'Nothing to update', 'NO_FIELDS');
  }
  return prisma.task.update({ where: { id: task.id }, data });
}

export async function deleteTask(id: number, userId: number) {
  const task = await getTaskOr404(id, userId);
  return prisma.task.delete({ where: { id: task.id } });
}
