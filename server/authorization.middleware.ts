import {Request, Response, NextFunction} from 'express';
import _ = require('lodash');

export function checkIfAuthorized(allowedRoles: string[], req: Request, 
                                    res: Response, next: NextFunction) {
    
          
    const userInfo = req['user'];

    // 'userInfo.roles' is the list of roles extracted from the request 
    // and it is going to be compared to the allowed roles argument.

    // to determine if there is a matching role, we use the 'intersection' function.
    const roles = _.intersection(userInfo.roles, allowedRoles);

    if (roles.length > 0) { // means that one of the roles that the user also haves.
        next();
    } else {
        // the user does not have any of the necessary roles for proceeding with this route.
        // The middleware chain will be blocked by sending '403' to the client.
        res.sendStatus(403);
    }
}