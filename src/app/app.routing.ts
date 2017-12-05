import { AuthGuardService } from '../services/auth-guard.service';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { LinksComponent } from './links/links.component';
import { NotFoundPageComponent } from './not-found-page/not-found-page.component';


const APP_ROUTES: Routes = [
    {
        path: 'login', component: LoginComponent
    },
    {
        path: '', component: LoginComponent
    },
    {
        path: 'links', component: LinksComponent, 

        canActivate: [AuthGuardService]
    },
    { path: '**', component: NotFoundPageComponent }
]

export const routing = RouterModule.forRoot(APP_ROUTES);