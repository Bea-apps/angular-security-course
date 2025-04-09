
/**
 * Send '200' for admin users.
 * @param req 
 * @param res 
 */
export function loginAsUser(req, res) {

    res.status(200).json({
        id: 1,
        email: "tem@gmail.com",
        roles: ['STUDENT']
    });

}