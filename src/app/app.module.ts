import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AngularFireModule } from 'angularfire2';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { EmailComponent } from './email/email.component';
import { SignupComponent } from './signup/signup.component';
import { MembersComponent } from './members/members.component';
import { TermsComponent } from './terms/terms.component';
import { AuthGuard } from './auth.service';
import { routes } from './app.routes';
import { TRANSLATION_PROVIDERS, TranslatePipe, TranslateService }   from './translate';


// Must export the config
export const firebaseConfig = {
  apiKey: "AIzaSyCAI-kfzVhSmr1aUJ4N-gLyjozI6OR8uZA",
  authDomain: "klang-e9507.firebaseapp.com",
  databaseURL: "https://klang-e9507.firebaseio.com",
  projectId: "klang-e9507",
  storageBucket: "klang-e9507.appspot.com",
  messagingSenderId: "316280964652"
};

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    EmailComponent,
    SignupComponent,
    MembersComponent,
    TermsComponent,
    TranslatePipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AngularFireModule.initializeApp(firebaseConfig),
    routes
  ],
  providers: [AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
