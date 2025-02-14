import { Request } from 'express';

export interface AuthenticatedRequest extends Request {
    user?: any; // Adjust the type based on your user model
}
