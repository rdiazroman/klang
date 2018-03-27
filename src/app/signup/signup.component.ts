import { Component, OnInit } from '@angular/core';
import { AngularFire, AuthProviders, AuthMethods } from 'angularfire2';
import { FirebaseListObservable } from 'angularfire2';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import { AngularFireDatabase } from 'angularfire2/database';
import { moveIn, fallIn } from '../router.animations';
import {ViewChild} from '@angular/core';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
  animations: [moveIn(), fallIn()],
  host: {'[@moveIn]': ''}
})



export class SignupComponent implements OnInit {

  state: string = '';
  error: any;
  errorLogin: any;
  availableCodes = [];
  codes;
  formData;
  code;
  email;
  password;
  password2;
  agreeConditions;
  users;
  css_class;
  vorname;
  nachname;

  constructor(public af: AngularFire,private router: Router) {
      this.users = af.database.list('/Users');
  }

  onSubmitLogin(formData) {
      debugger;
      this.af.auth.login({
        email: formData.value.email.trim(),
        password: formData.value.password.trim()
      },
      {
        provider: AuthProviders.Password,
        method: AuthMethods.Password,
      }).then(
        (success) => {
        console.log('success: ' + success);
        this.router.navigate(['/members']);
      }).catch(
        (err) => {
        console.log(err);
        this.errorLogin = err;
      })

  }


  onSubmit(formData) {

    var self = this;

    if(formData.valid) {

      if (this.agreeConditions == true) {

            this.formData = formData;

            if (this.availableCodes.indexOf(formData.value.code) > -1) {
                //In the array! Code is available to use


                if (formData.value.password == formData.value.password2) {

                    this.af.auth.createUser({
                        email: formData.value.email.trim(),
                        password: formData.value.password.trim()
                    }).then(
                        (success) => {

                            var userObject = {
                                code: formData.value.code,
                                vorname: formData.value.vorname,
                                nachname: formData.value.nachname,
                                email: formData.value.email
                            };

                            // Master codes
                            let markAsUsed = "true";
                            if (formData.value.code === 'K-H_Marc' ||
                                formData.value.code === 'K-H_Phil' ||
                                formData.value.code === 'K-H_Tom' ||
                                formData.value.code === 'K-H_Dani'
                                ){
                                markAsUsed = "false";
                            }

                            let codeObject = {
                                code: formData.value.code,
                                used: markAsUsed
                            };

                            self.addToUserList(userObject);
                            self.updateCodeList(codeObject);

                            self.router.navigate(['/members'])
                    }).catch(
                        (err) => {
                            this.error = err;
                    })



                } // password confirmation is wrong
                else {
                    self.error = 'Set your password correctly';
                }

            } else {
                //Not in the array...The code is not available to use.
                self.error = 'The code is invalid or already used';
                self.css_class = 'red';
                self.formData.value.code = 'code invalid, try again'
            }

        }
        // checkbox conditions not accepted
        else{
            self.error = 'Please accept the conditions';
        }
    }
  }


  addToUserList(item: any) {
      this.users.push(item);
  }

  updateCodeList(codeObject: any){
    this.af.database.object('/Codes/' + codeObject.code).update(codeObject);
  }


  focusFunction(){
    this.css_class = '';
  }

  ngOnInit() {
    this.codes = this.af.database.list('Codes',{preserveSnapshot:true});

    this.codes.subscribe(snapshots => {
      snapshots.forEach(snapshot => {
          if(snapshot.val().used === "false"){
            this.availableCodes.push(snapshot.val().code);
          }
      });
    });
  }

}
