import { Component, OnInit, HostBinding } from '@angular/core';
import { AngularFire, AuthProviders, AuthMethods } from 'angularfire2';
import { Router } from '@angular/router';
import { moveIn } from '../router.animations';

@Component({
  selector: 'app-login',
  templateUrl: './terms.component.html',
  styleUrls: ['./terms.component.css'],
  animations: [moveIn()],
  host: {'[@moveIn]': ''}
})
export class TermsComponent implements OnInit {

  error: any;
  constructor(public af: AngularFire,private router: Router) {

      this.af.auth.subscribe(auth => {
      if(auth) {
        this.router.navigateByUrl('/members');
      }
    });

  }


  ngOnInit() {
  }

}
