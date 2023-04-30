import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginModule } from './pages/login/login.module';
import { AuthComponent } from './auth.component';
import { RouterModule, Routes } from '@angular/router';
import { AuthService } from './services/AuthService';
import { LoginComponent } from './pages/login/login.component';
import { AuthRoutingModule } from './auth-routing.module';
import { MatCardModule } from '@angular/material/card';
//import { AuthService } from './auth/services/AuthService';

@NgModule({
  declarations: [AuthComponent],
  providers: [AuthService],
  imports: [
    CommonModule,
    LoginModule,
    AuthRoutingModule,
    MatCardModule,
    
  ],
  exports: [
    AuthComponent
  ]
})
export class authModule { }
