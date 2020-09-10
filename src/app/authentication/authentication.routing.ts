import { Routes, RouterModule } from '@angular/router';
import { AuthenticationComponent } from './authentication/authentication.component';
import { PageLoginComponent } from './page-login/page-login.component';
import { PageRegisterComponent } from './page-register/page-register.component';
import { PageLockscreenComponent } from './page-lockscreen/page-lockscreen.component';
import { PageForgotPasswordComponent } from './page-forgot-password/page-forgot-password.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { PageForbiddonErrorComponent } from './page-forbiddon-error/page-forbiddon-error.component';
import { PageIsErrorComponent } from './page-is-error/page-is-error.component';
import { PageTryLaterComponent } from './page-try-later/page-try-later.component';
import { PageMaintananceComponent } from '../pages/page-maintanance/page-maintanance.component';

const routes: Routes = [
    {
        path: '',
        component: AuthenticationComponent,
        children: [
            { path: '', redirectTo: 'page-login', pathMatch: 'full' },
            { path: 'page-login', component: PageLoginComponent, data: { title: 'Login :: Smart Waste' } },
            { path: 'page-register', component: PageRegisterComponent, data: { title: 'Register :: Smart Waste' } },
            { path: 'page-lockscreen', component: PageLockscreenComponent, data: { title: 'Lock Screen :: Smart Waste' } },
            { path: 'page-forgot-password', component: PageForgotPasswordComponent, data: { title: 'Forgot Password :: Smart Waste' } },
            { path: 'page-404', component: PageNotFoundComponent, data: { title: 'Page-404 :: Smart Waste' } },
            { path: 'page-403', component: PageForbiddonErrorComponent, data: { title: 'Page-403 :: Smart Waste' } },
            { path: 'page-500', component: PageIsErrorComponent, data: { title: 'Page-500 :: Smart Waste' } },
            { path: 'page-503', component: PageTryLaterComponent, data: { title: 'Page-503 :: Smart Waste' } },
            { path: 'page-maintanance', component: PageMaintananceComponent, data: { title: 'maintanance :: Smart Waste' } },
        ]
    }
];

export const routing = RouterModule.forChild(routes);