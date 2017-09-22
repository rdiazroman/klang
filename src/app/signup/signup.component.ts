import { Component, OnInit } from '@angular/core';
import { AngularFire, AuthProviders, AuthMethods } from 'angularfire2';
import { FirebaseListObservable } from 'angularfire2';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import { AngularFireDatabase } from 'angularfire2/database';
import { moveIn, fallIn } from '../router.animations';

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
  availableCodes = [];
  codes;
  formData;
  code;
  email;
  password;

  constructor(public af: AngularFire,private router: Router) {

  }


  onSubmit(formData) {
    if(formData.valid) {
      this.formData = formData;
      //console.log('formData.value: ' + formData.value);
      console.log(this.availableCodes);

      if (this.availableCodes.indexOf(formData.value.code) > -1) {
          //In the array!
          console.log('OK');
          this.af.auth.createUser({
            email: formData.value.email,
            password: formData.value.password
          }).then(
            (success) => {

              console.log(success);

            this.router.navigate(['/members'])
          }).catch(
            (err) => {
            this.error = err;
          })
      } else {
          //Not in the array
          console.log('NOK');
      }


    }
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
