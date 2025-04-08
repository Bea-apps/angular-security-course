import {Request, Response, NextFunction} from 'express';


export function checkIfAuthenticated(req: Request, res: Response, next: NextFunction) {

    if (req['user']) { // contains the user payload
        next();
    }
    else {
        res.sendStatus(403);
    }


}


