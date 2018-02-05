import { Component, OnInit } from '@angular/core';
import { AngularFire, AuthProviders, AuthMethods } from 'angularfire2';
import { Router } from '@angular/router';
import { moveIn, fallIn } from '../router.animations';
import * as firebase from 'firebase';

@Component({
  selector: 'app-email',
  templateUrl: './reset.component.html',
  styleUrls: ['./reset.component.css'],
  animations: [moveIn(), fallIn()],
  host: {'[@moveIn]': ''}
})
export class ResetComponent implements OnInit {

    state: string = '';
    error: any;
    email: any;
    myClass = [];
    myClassEmail = [];
    emailErrorText = '';

    constructor(public af: AngularFire,private router: Router) {
      this.af.auth.subscribe(auth => {
        if(auth) {
          this.router.navigateByUrl('/members');
        }
      });
      this.myClass.push('hidden');
      this.myClassEmail.push('hidden');
  }


  onSubmit(formData) {

    if(formData.valid) {

      let email = formData.value;
      var auth = firebase.auth();
      var self = this;

      auth.sendPasswordResetEmail(formData.value.email).then(function() {
           self.myClass = [];
           self.myClassEmail.push('hidden');
      }).catch(function(error) {
          console.log(error);
            self.emailErrorText = error.message;
           self.myClassEmail = [];
      });



    }


  }

  ngOnInit() {
  }

}
