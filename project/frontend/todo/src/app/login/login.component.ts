import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HardcodedAuthenticationService } from '../service/hardcoded-authentication.service';
import { BasicAuthenticationService } from '../service/basic-authentication.service';
//Router needed because is used in constructor because is a dependency

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  username = 'tavillooo';
  password = '';
  errorMessage = 'Invalid credentials';
  invalidLogin = false;
  //We need the router
  //We do like Angular.giveMeRouter
  //Now, we use  -- Dependency injection -- in these years
  //Dependency injection is a built in feature
  //We want to use the router
  //If this login component wants to use another router, the router is a dependency of the login component
  //We need to declate a constructor (already declared below in this login.component.ts file)

  handleLogin() {
    // console.log(this.username);
    //console.log(this.password);
    //never print a password
    if (
      this.hardcodedAuthenticationService.authenticate(
        this.username,
        this.password
      )
    ) {
      this.invalidLogin = false;
      //Redirect to welcome page
      this.router.navigate(['welcome', this.username]);
      //this.router.navigate() takes an array of paramateres(param1/param2/... for the website link)
      //Passing welcome, and the name so that we get a presonalized route (needed as stated in the routes file)
    } else {
      this.invalidLogin = true;
    }
  }

  handleBasicAuthenticationLogin() {
    // console.log(this.username);
    //console.log(this.password);
    //never print a password

    this.basicAuthenticationService
      .executeBasicAuthenticationService(this.username, this.password)
      .subscribe(
        (data) => {
          console.log(data);
          this.router.navigate(['welcome', this.username]);
          this.invalidLogin = false;
        },
        (error) => {
          console.log(error);
          this.invalidLogin = true;
        }
      );
  }
  //So, the router is a dependency of the login component.
  //So, we declare it as a constructor argument
  //NOTE: in TypeScript, when we declare a variable in the constructor,
  //this variable is available to use in the class, without the need to declare
  //it as an attribute of the class (outside the constructor like in java)
  constructor(
    private router: Router,
    private hardcodedAuthenticationService: HardcodedAuthenticationService,
    private basicAuthenticationService: BasicAuthenticationService
  ) {}

  ngOnInit(): void {}
}
