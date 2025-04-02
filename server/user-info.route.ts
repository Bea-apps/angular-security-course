import {Request, Response} from "express";
import {db} from "./database";

export function userInfo(req: Request, res: Response) {
    //@ts-ignore
    const userInfo = req.user;

    let user = db.findUserByEmail(userInfo.email);

    if(!user) {
        // sub: user technical identifier
        user = db.createUser(userInfo.email, userInfo.sub);
    }

    res.status(200).json({email: user.email});


}