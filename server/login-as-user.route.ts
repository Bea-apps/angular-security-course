import { db } from "./database";
import { createSessionToken } from "./security.utils";

/**
 * Send back with this request a Json web token to produced if the impersonated
 * user had tried to log in into the application successfully.
 * @param req 
 * @param res 
 */
export function loginAsUser(req, res) {

    const impersonatedUserEmail = req.body.email;
    const impersonatedUser = db.findUserByEmail(impersonatedUserEmail);
    createSessionToken(impersonatedUser)
        .then(sessionToken => {
            // send back to the client by writin in the request cookie.
            res.cookie("SESSIONID", sessionToken, 
                {httpOnly: true, secure: true}
            );

            // send back to the client.
            res.status(200).json({
                id: impersonatedUser.id,
                email: impersonatedUser.email,
                roles: impersonatedUser.roles // used by the frontend to do UI authorization. 
                                              // For example by removing certain options from the navigation menu
                                              // or blocking the front end access to certain screens.
            });

        })
        .catch(err => {
            console.log("Error trying to login as user", err);
            res.sendStatus(500);
        });





}