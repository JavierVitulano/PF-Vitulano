import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map, mergeMap, take, tap } from 'rxjs';
import { Alumno } from '../alumnos.component';
import { HttpClient } from '@angular/common/http';
import { enviroment } from 'src/environments/environments';

@Injectable({
  providedIn: 'root',
})
export class AlumnosService {
  private estudiantes$ = new BehaviorSubject<Alumno[]>([]);
  constructor(private httpClient: HttpClient) {}

  get alumnos(): Observable<Alumno[]> {
    return this.estudiantes$.asObservable();
  }

  obtenerAlumnos(): Observable<Alumno[]> {
    //return this.estudiantes$.asObservable();
    return this.httpClient.get<Alumno[]>(`${enviroment.apiBaseUrl}/alumnos`)
    .pipe(
      tap((alumno) => this.estudiantes$.next(alumno)),
      mergeMap(() => this.estudiantes$.asObservable())
    );
  }

  obtenerAlumnoPorId(numeroDocumento: number): Observable<Alumno | undefined> {
    return this.estudiantes$
      .asObservable()
      .pipe(
        map((alumnos) =>
          alumnos.find((a) => a.numeroDocumento === numeroDocumento)
        )
      );
  }

  crearAlumno(nuevoAlumno: Alumno)  : Observable<Alumno[]> {
    this.estudiantes$.pipe(take(1)).subscribe({
      next: (alumnos) => {
        this.estudiantes$.next([nuevoAlumno, ...alumnos]);
      },
    });

    return this.estudiantes$.asObservable();
  }

  eliminarAlumno(alumnoAEliminar: Alumno) : Observable<Alumno[]>{
    this.estudiantes$.pipe(take(1)).subscribe({
      next: (alumnos) => {
        const calumnosActualizados = alumnos.filter(
          (alumno) => alumno.numeroDocumento !== alumnoAEliminar.numeroDocumento
        );
        this.estudiantes$.next(calumnosActualizados);
      },
    });
    return this.estudiantes$.asObservable();
  }
  editarAlumno(
    alumnoId: number,
    actualizacion: Partial<Alumno>
  ): Observable<Alumno[]> {
    this.estudiantes$.pipe(take(1)).subscribe({
      next: (alumnos) => {
        const alumnoActualizados = alumnos.map((alumno) => {
          if (alumno.numeroDocumento === alumnoId) {
            return {
              ...alumno,
              ...actualizacion,
            };
          } else {
            return alumno;
          }
        });

        this.estudiantes$.next(alumnoActualizados);
      },
    });
    return this.estudiantes$.asObservable();
  }
}
