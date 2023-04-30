import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, fromEvent,map } from 'rxjs';
import { AuthService, LoginFormValue } from 'src/app/auth/services/AuthService';
import { Usuario } from 'src/app/core/models';
//import { AuthService } from 'src/app/auth/services/AuthService';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  hide = true;
  //isLoggedIn = new Subject<Usuario>();

  passwordControl = new FormControl('', [
    Validators.required,
    Validators.minLength(8),
    Validators.maxLength(20),
  ]);
  emailControl = new FormControl('', [
    Validators.required,
    Validators.minLength(2),
    Validators.maxLength(30),
  ]);

  loginForm = new FormGroup({
    password: this.passwordControl,
    email: this.emailControl,
  });

  constructor(private authService: AuthService, private activatedRoute: ActivatedRoute) {
    console.log(this.activatedRoute.snapshot);
    }
    

  // async ngOnInit(): Promise<void> {
  //   const clicks = fromEvent<PointerEvent>(document, 'click');
  //   const positions = clicks.pipe(map((ev) => ev.clientX));

  //   positions.subscribe((x) => console.log(x));
  // }
  login(): void {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
    } else {
      this.authService.login(this.loginForm.value as LoginFormValue)
    }

    // const obtenerUsuario = new Promise((resolve, reject) => {
    //   if (this.nombreControl.value == 'Javier') {
    //     resolve('Usuario admin');
    //   } else {
    //     reject('Otro usuario');
    //   }
    // });
    // obtenerUsuario.then(
    //   function () {
    //     console.log('Se logueo el usuario administrador');
    //   },
    //   function () {
    //     console.log('Se logueo un otro usuario');
    //   }
    // );
    //this.router.navigate(['dashboard'])
  }
  ngOnDestroy(): void {
    // this.suscripcionAuthUser?.unsubscribe();
    //this.isLoggedIn.complete();
  }
}
