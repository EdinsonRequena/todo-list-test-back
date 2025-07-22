import { Router } from 'express';
import { create, list, toggle, remove, update } from '../controllers/task.controller';
import { authGuard } from '../../../middlewares/auth.middleware';
import { validate } from '../../auth/middlewares/validate';
import { createTaskSchema, updateTaskSchema } from '../schemas';

export const taskRoutes = Router();

taskRoutes.use(authGuard);

taskRoutes.post('/', validate(createTaskSchema), create);
taskRoutes.get('/', list);

/**
 * He decidido usar PATCH en lugar de PUT (como se menciona en el PDF) porque
 * este endpoint permite modificaciones parciales: el cliente puede enviar
 * solo `title`, solo `description` o ambos. PUT implicaría reemplazar la
 * tarea completa, mientras que PATCH describe mejor una actualización parcial.
 */
taskRoutes.patch('/:id', validate(updateTaskSchema), update);

taskRoutes.patch('/:id/toggle', toggle);
taskRoutes.delete('/:id', remove);
