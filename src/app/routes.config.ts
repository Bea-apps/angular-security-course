import {Routes} from '@angular/router';
import {LessonsComponent} from "./lessons/lessons.component";
import {LoginComponent} from "./login/login.component";
import {SignupComponent} from "./signup/signup.component";
import {AdminComponent} from "./admin/admin.component";

export const routesConfig: Routes = [
    {
        path: 'lessons',
        component: LessonsComponent
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'signup',
        component: SignupComponent
    },
    {
        path: 'admin',
        component: AdminComponent,
        canActivate: ["adminsOnlyGuard"] // provide a string instead of AuthorizationGuard 
                                         // cause angular injection doesn´t allow the additional parameter 'allowedRoles'.
    },
    {
        path: '',
        redirectTo:'/lessons',
        pathMatch: 'full'
    },
    {
        path: '**',
        redirectTo: '/lessons',
        pathMatch: 'full'
    }
];