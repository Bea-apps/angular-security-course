# Lessons content

## 9.63: Introduction to Role Based Authorization

Identifying a user is called authentication and making sure that the user can access a certain functionality that's called authorization.

In order to authorize a user, we first have to authenticate it.

We will use role-based security. Different users have different roles in an application, and it's the presence of the role associated to a user that will grant or deny access to a certain feature. it's the most commonly used authorization method.

In the tab 'ADMIN', the administrator can log in as user by using the student email.

## 9.64: Setting Up the RBAC Authorization Solution - Adding Roles to our JWT.

Allow different users to have different roles and access different roles and access different features of the application. For example, an admin user is going to have access to a very powerful admin level feature that allows him to log in on behalf of another user. A normal user will simply have access to the lessons data.

First thing is associate to a given user a list of roles.

[Verify token with JWT.io](https://jwt.io/) With the use of jwt.io, the serve does not have to have the information about the roles of a given user and it does not have to query a separate server in order to obtain that information.

Everything is present in the Json web token and it's signed by the issuing server that created the token.

## 9.67: Backend Express Authorization Route - Implementation and Demo

Implementation of the 'checkIfAuthorized' in order to protect the access to the route for users that don´t have access to the route.

## 9.68: The Admin Login As User Backend Service

Add authorization capabilities to the application by completing the implementation of the login as user root.


