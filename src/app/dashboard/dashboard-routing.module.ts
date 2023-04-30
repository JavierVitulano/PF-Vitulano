import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InscripcionesComponent } from './pages/inscripciones/inscripciones.component';

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
]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes)
  ],
  exports:[RouterModule]
})
export class DashboardRoutingModule { }
