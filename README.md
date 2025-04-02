# Lessons content

## 8.61: Implements the final part of the JWT based user signup solution.

Implements the backend for the user info backend service.
It´s going to be used in the frontend whenever the user logs in,
a new user is created or the application is started and the user is already logged in.
At the moment we call to the backend to fetch the user preferences.
In case of user signup, the service "user-info.route.ts" is going to write the user email into the database.

## 8.62: Section summary.

Third party services advantages:

- less services.
- not users or password stored in our database. They are stored on the auth0 database.
- we don´t have the problem of having to shut down the server to rotate a given key.
- we delegate the security to Auth0.

The AuthService is auth0 specific => if we want to change to another third party service
we only need to change the AuthService implementation and doesn´t need to change the rest of the frontend.
