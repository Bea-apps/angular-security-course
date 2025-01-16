

import * as express from 'express';
import {Application} from "express";
import * as fs from 'fs';
import * as https from 'https';
import {readAllLessons} from "./read-all-lessons.route";


const bodyParser = require('body-parser');

// caution: this project work only with jwks-rsa version 1.12.3
// and express-jwt version 5.3.0.
const jwksRsa = require('jwks-rsa');
const jwt = require('express-jwt');

const app: Application = express();

app.use(bodyParser.json());

const commandLineArgs = require('command-line-args');

const optionDefinitions = [
    { name: 'secure', type: Boolean,  defaultOption: true },
];

const options = commandLineArgs(optionDefinitions);


// jwksRsa for retrieving the public key from auth0 website.
const checkIfAuthenticated = jwt({
    secret: jwksRsa.expressJwtSecret({
        cache: true,
        rateLimit: true,
        jwksUri: "https://dev-kx0725jblw8655rw.us.auth0.com/.well-known/jwks.json"

    }),
    algorithms: ['RS256']
});

app.use(checkIfAuthenticated);

app.use((err, req, res, next) => {
    if(err && err.name == "UnauthorizedError") {
        res.status(err.status).json({message: err.message});
    } else {
        // if there is no problem and JWT was validated it =>
        // we continue.
        next();
    }

});


// REST API
// => if readAllLessons go through, it means the application has a valid JWT.
app.route('/api/lessons')
    .get(readAllLessons);


if (options.secure) {

    const httpsServer = https.createServer({
        key: fs.readFileSync('key.pem'),
        cert: fs.readFileSync('cert.pem')
    }, app);

    // launch an HTTPS Server. Note: this does NOT mean that the application is secure
    httpsServer.listen(9000, () => console.log("HTTPS Secure Server running at https://localhost:" + httpsServer.address().port));

}
else {

    // launch an HTTP Server
    const httpServer = app.listen(9000, () => {
        console.log("HTTP Server running at https://localhost:" + httpServer.address().port);
    });

}

