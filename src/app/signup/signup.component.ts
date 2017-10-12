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
  availableCodes = [];
  codes;
  formData;
  code;
  email;
  password;
  users;
  css_class;

  constructor(public af: AngularFire,private router: Router) {
      this.users = af.database.list('/Users');
  }


  onSubmit(formData) {

    var self = this;

    if(formData.valid) {
      this.formData = formData;

      if (this.availableCodes.indexOf(formData.value.code) > -1) {
          //In the array!
          console.log('OK');

          this.af.auth.createUser({
              email: formData.value.email,
              password: formData.value.password
          }).then(
              (success) => {

                  var userObject = {
                      code: formData.value.code,
                      name: formData.value.name,
                      email: formData.value.email,
                      password: formData.value.password
                  };

                  // Master code AcUrr78x
                  let markAsUsed = "true";
                  if (formData.value.code === 'AcUrr78x'){
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
      } else {
          //Not in the array
          console.log('NOK');
          self.error = 'The code is invalid or already used';
          self.css_class = 'red';
          self.formData.value.code = 'code invalid, try again'
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
