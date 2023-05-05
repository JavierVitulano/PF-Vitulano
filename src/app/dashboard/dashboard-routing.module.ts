import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InscripcionesComponent } from './pages/inscripciones/inscripciones.component';
import { UsuariosComponent } from './pages/usuarios/usuarios.component';
import { AdminGuard } from '../auth/guards/admin.guard';

const routes: Routes =[
  {path: 'alumnos',
  //component : AlumnosComponent,
  loadChildren: ()=> import ('./pages/alumnos/alumnos.module').then((m)=> m.AlumnosModule)
  },
  {path: 'cursos',
  //component: CursosComponent,
  loadChildren: ()=> import ('./pages/cursos/cursos.module').then((m)=> m.CursosModule)
  },
  {path: 'inscripciones',
  component : InscripcionesComponent,
  },
  {path: 'usuarios',
  canActivate: [AdminGuard],
  loadChildren: ()=> import ('./pages/usuarios/usuarios.module').then((m)=> m.UsuariosModule)
  }      
]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes)
  ],
  exports:[RouterModule]
})
export class DashboardRoutingModule { }
