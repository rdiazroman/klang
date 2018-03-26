import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { MembersComponent } from './members/members.component';
import { ResetComponent } from './reset/reset.component';
import { AuthGuard } from './auth.service';
import { SignupComponent } from './signup/signup.component';
import { EmailComponent } from './email/email.component';
import { TermsComponent } from './terms/terms.component';

export const router: Routes = [
    { path: '', redirectTo: 'signup', pathMatch: 'full' },
    { path: 'login', component: SignupComponent },
    { path: 'signup', component: SignupComponent },
    { path: 'login-email', component: EmailComponent },
    { path: 'terms', component: TermsComponent },
    { path: 'reset', component: ResetComponent },
    { path: 'members', component: MembersComponent, canActivate: [AuthGuard] }

]

export const routes: ModuleWithProviders = RouterModule.forRoot(router);
