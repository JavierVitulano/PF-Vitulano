import { Injectable } from '@angular/core';
import { Inscripcion } from '../inscripciones.component';
import { BehaviorSubject, Observable, map, mergeMap, take, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { enviroment } from 'src/environments/environments';

@Injectable({
  providedIn: 'root',
})
export class InscripcionService {
  private inscripcion$ = new BehaviorSubject<Inscripcion[]>([]);
  constructor(private httpClient: HttpClient) {}

  get inscripcion(): Observable<Inscripcion[]> {
    return this.inscripcion$.asObservable();
  }

  obtenerInscripcion(): Observable<Inscripcion[]> {
    //return this.inscripcion$.asObservable();
    return this.httpClient.get<Inscripcion[]>(`${enviroment.apiBaseUrl}/inscripciones`)
    .pipe(
      tap((inscripciones) => this.inscripcion$.next(inscripciones)),
      mergeMap(() => this.inscripcion$.asObservable())
    );    
  }

  obtenerAlumnosPorCurso(idCurso: number) 
  //: Observable<Inscripcion | undefined>
  {
      // return this.inscripcion$.asObservable()
      // .pipe(
      //   map((inscripcion) => inscripcion.find((c) => c.idCurso === idCurso))
      // )

    return this.obtenerAlumnos();
  }

  obtenerAlumnos(): Observable<Inscripcion[]> {
    return this.inscripcion$.asObservable();
  }

  obtenerCursosDeAlumno(nroDocumento: number)
  //: Observable<Inscripcion | undefined> 
  {
    return this.inscripcion$.asObservable()
    .pipe(
      map((inscripcion) => inscripcion.find((c) => c.numeroDocumentoAlumno === nroDocumento))
    )
   
    // const v_resultado= this.inscripcion$.asObservable()
    //   .pipe(
    //     map((inscripcion) => inscripcion.find((a) => a.numeroDocumentoAlumno === nroDocumento))
    //   )
    //     if ( v_resultado != undefined)
    //     {
    //       return v_resultado;
    //     }
    //     else
    //     {return this.obtenerAlumnos()}
   // return this.obtenerAlumnos();
    //inscripciones.
    //return this.cursosService.obtenerCursoPorId('1');
  }
  inscribirAlumno(nuevaInscripcion: Inscripcion) {
    this.inscripcion$.pipe(take(1)).subscribe({
      next: (inscripciones) => {
        this.inscripcion$.next([nuevaInscripcion, ...inscripciones]);
      },
    });
  }

  eliminarInscripcion(inscripcionAEliminar: Inscripcion): Observable<Inscripcion[]> {
    this.inscripcion$.pipe(take(1)).subscribe({
      next: (alumnos) => {
        const calumnosActualizados = alumnos.filter(
          (inscripcion) =>
            inscripcion.numeroDocumentoAlumno !=
              inscripcionAEliminar.numeroDocumentoAlumno &&
            inscripcion.idCurso != inscripcionAEliminar.idCurso
        );
        this.inscripcion$.next(calumnosActualizados);
      },
    });
    return this.inscripcion$.asObservable();
  }
}
