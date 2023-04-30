import { Component, AfterViewInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { DialogConfirmacionComponent } from 'src/app/shared/dialog/dialog-confirmacion/dialog-confirmacion.component';
import { MatDialog } from '@angular/material/dialog';
import { AbmCursosComponent } from './abm-cursos/abm-cursos.component';
import { CursosService } from './Services/cursos.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

export interface Curso {
  id: number;
  nombreCurso: string;
  fechaInicio: Date;
  fechaFin: Date;
}

/**
 * @title Lista de cursos
 */
@Component({
  selector: 'app-cursos',
  templateUrl: './cursos.component.html',
  styleUrls: ['./cursos.component.scss'],
})
export class CursosComponent implements AfterViewInit {
  dataSource = new MatTableDataSource();

  displayedColumns: string[] = [
    'id',
    'nombreCurso',
    'fechaInicio',
    'fechaFin',
    'opcionesDelete',
    'opcionesEdit',
    'opcionesDetalle',
  ];
  cursosSuscription: Subscription | null = null;

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
  constructor(
    private matDialog: MatDialog,
    private cursosService: CursosService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    // this.cursosService.obtenerCurso().subscribe((cursos) => {
    //   this.dataSource.data = cursos;
    // });

    // this.cursosSuscription = this.cursosService.obtenerCursos().subscribe({
    //   next: (cursos) => {
    //     this.dataSource.data = cursos;
    //   },
    // });
  }

  ngOnDestroy(): void {
    this.cursosSuscription?.unsubscribe();
  }

  ngOnInit(): void {
    this.cursosSuscription = this.cursosService.obtenerCurso().subscribe({
      next: (cursos) => {
        this.dataSource.data = cursos;
      },
    });
  }
  eliminar(cursoAEliminar: Curso): void {
    const dialogRef = this.matDialog.open(DialogConfirmacionComponent, {
      data: {
        message:
          'Está seguro que desea eliminar el registro del curso: ' +
          cursoAEliminar.nombreCurso +
          '?',
      },
    });
    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      if (confirmed) {
        this.cursosService.eliminarCurso(cursoAEliminar);
        // this.dataSource.data = this.dataSource.data.filter(
        //   (cursoActual) => cursoActual.id !== cursoAEliminar.id
        // );
      }
    });
  }
  editar(cursoAEditar: Curso): void {
    const dialog = this.matDialog.open(AbmCursosComponent, {
      data: {
        cursoAEditar,
      },
    });
    dialog.afterClosed().subscribe((valorDelFormulario) => {
      if (valorDelFormulario) {
         this.cursosService.editarCurso(cursoAEditar.id,valorDelFormulario);
        // this.dataSource.data = this.dataSource.data.map((cursoActual) =>
        //   cursoActual.id === cursoAEditar.id
        //     ? { ...cursoActual, ...valorDelFormulario }
        //     : cursoActual
        // );
      }
    });
  }

  agregarCurso(): void {
    const dialog = this.matDialog.open(AbmCursosComponent);
    dialog.afterClosed().subscribe((valor) => {
      if (valor) {
        this.cursosService.crearCurso(valor);
        // this.dataSource.data = [
        //   { id: this.dataSource.data.length + 1, ...valor },
        //   ...this.dataSource.data,
        // ];
      }
    });
  }
  detalle(cursoId: number): void {
    this.router.navigate([cursoId], {
      relativeTo: this.activatedRoute,
    });
  }
}
