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
  codes;
  formData;

  constructor(public af: AngularFire,private router: Router) {

  }


  onSubmit(formData) {
    if(formData.valid) {
      this.formData = formData;
      console.log('formData.value: ' + formData.value);

      var codes$: FirebaseListObservable<any[]>;

      this.codes = this.af.database.list('Codes',{preserveSnapshot:true});
      this.codes.subscribe(snapshots => {
        snapshots.forEach(snapshot => {
            console.log(snapshot.val().code);
            //this.agencyID.push(snapshot.val()._id);

        });

    });








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
    }
  }

  ngOnInit() {
      this.codes = this.af.database.list('/Codes', {
        query: {
            orderByChild: 'createdAt'
        }
      });
  }

}
