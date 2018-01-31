import { Component, OnInit } from '@angular/core';
import { AngularFire, AuthProviders, AuthMethods } from 'angularfire2';
import { Router } from '@angular/router';
import { moveIn, fallIn } from '../router.animations';

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

    constructor(public af: AngularFire,private router: Router) {
      this.af.auth.subscribe(auth => {
        if(auth) {
          this.router.navigateByUrl('/members');
        }
      });
  }


  onSubmit(formData) {
    if(formData.valid) {

      let email = formData.value;

      var auth = firebase.auth();

      console.log(1);
      auth.sendPasswordResetEmail(email).then(function() {
        console.log("email sent!");
      }).catch(function(error) {
        console.log(error);
      });
      console.log(2);


    }
  }

  ngOnInit() {
  }

}
