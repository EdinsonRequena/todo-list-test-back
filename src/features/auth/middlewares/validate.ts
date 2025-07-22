import { ObjectSchema } from 'joi';
import { Request, Response, NextFunction } from 'express';

export const validate =
    (schema: ObjectSchema) => (req: Request, _res: Response, next: NextFunction) => {
        const { error, value } = schema.validate(req.body, { abortEarly: false });
        if (error) return next({ status: 400, message: error.message });
        req.body = value;
        next();
    };
