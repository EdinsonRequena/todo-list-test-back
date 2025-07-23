# Todo-List API (Back-End)

API REST construida con **Node.js + Express + TypeScript** y **PostgreSQL (Prisma)**  
Provee autenticación JWT y operaciones CRUD con paginación y filtros sobre tareas.

---

## Requisitos

| Herramienta | Versión mínima |
| ----------- | -------------- |
| Node        | 20.x           |
| PostgreSQL  | 14.x           |
| npm         | 9.x            |

---

## Instalación y arranque en desarrollo

```bash
git clone https://github.com/tu-user/todo-list-test-back.git
cd todo-list-test-back

cp .env.example .env               # ← rellena los valores
npm install
npm run prisma:migrate             # genera la BD y el cliente
npm run dev                        # servidor en http://localhost:4000
```

## Variables de entorno

| Clave        | Ejemplo                                             | Descripción                    |
| ------------ | --------------------------------------------------- | ------------------------------ |
| PORT         | 4000                                                | Puerto del servidor            |
| DATABASE_URL | postgresql://user:password@localhost:5432/todo-list | URL de conexión a la BD        |
| JWT_SECRET   | supersecretkey                                      | Clave para JWT                 |
| CORS_ORIGIN  | http://localhost:5173                               | Origen permitido para el front |

## Rutas principales

| Método | Ruta              | Descripción                            |
| ------ | ----------------- | -------------------------------------- |
| POST   | /auth/login       | Autenticación de usuario               |
| POST   | /auth/register    | Registro de usuario                    |
| GET    | /tasks            | Listar tareas (status, q, page, limit) |
| POST   | /tasks            | Crear nueva tarea                      |
| PATCH  | /tasks/:id        | Editar título y/o descripción          |
| PATCH  | /tasks/:id/toggle | Marcar como completada / pendiente     |
| DELETE | /tasks/:id        | Eliminar tarea                         |

## Ejemplo de paginación y filtros

```http
GET /api/tasks?status=pending&q=rent&page=2&limit=4
```

## Retorna

```json
{
  "items": [
    /* 4 tareas */
  ],
  "page": 2,
  "limit": 4,
  "total": 9,
  "pages": 3
}
```

## Scripts útiles

| Script                 | Acción                                             |
| ---------------------- | -------------------------------------------------- |
| npm run dev            | Inicia el servidor en modo desarrollo (hot reload) |
| npm run build          | Compila el proyecto a JavaScript (dist/)           |
| npm run start          | Inicia el servidor compilado (dist/)               |
| npm run prisma:migrate | Aplica migraciones de Prisma a la BD               |
| npm run lint           | ESLint + Prettier                                  |

## Arquitectura Basada en Servicios

La aplicación está organizada en módulos para facilitar la escalabilidad y el mantenimiento:
src/
├─ features/
│ ├─ auth/
│ └─ tasks/ # servicios, controladores y rutas
├─ config/ # prisma client
├─ middlewares/ # authGuard, errorHandler
└─ utils/ # funciones utilitarias

## Desiciones técnicas clave

    •	PATCH en /tasks/:id permite actualizaciones parciales; evita enviar campos no editables.
    •	Prisma provee tipado estricto y migraciones automáticas.
    •	Validaciones Joi en cuerpos de petición y manejo uniforme de errores.
