import { Component } from '@angular/core';
//import { Usuario } from '../interfaces/Usuario';
import { Observable, Subject, Subscription, takeUntil } from 'rxjs';
//import { AuthService } from '../auth/services/AuthService';
import links from './nav-items';
import { Router } from '@angular/router';
import { AuthService } from '../auth/services/AuthService';
import { Usuario } from '../core/models';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class dashboardComponent {
  //authUser: Usuario | null = null;
  authUser$: Observable<Usuario | null>;
  suscripcionAuthUser: Subscription | null = null;

  destroyed$ = new Subject<void>();

  links = links;

  constructor(private authService: AuthService, private router: Router) {
    this.authUser$ = this.authService.obtenerUsuarioAutenticado();

    // this.authService
    //   .obtenerUsuarioAutenticado()
    //   .pipe(
    //     takeUntil(this.destroyed$)
    //   )
    //   .subscribe((usuario) => (this.authUser = usuario));
  }

  ngOnDestroy(): void {
    // this.suscripcionAuthUser?.unsubscribe();
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  logout(): void {
    this.authService.logout();
    //this.router.navigate(['auth', 'login']);
  }
}
