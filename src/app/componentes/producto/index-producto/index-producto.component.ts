import { AfterViewInit, Component, ViewChild } from '@angular/core';
import {MatSort} from '@angular/material/sort';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';
import { Router } from '@angular/router';

// ---[Servicio de datos]--------------------------------
import { ProductoService } from 'src/app/servicios/producto.service';
import { Producto } from 'src/app/modelos/producto.model';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { CourseDialogComponent } from 'src/app/escritorio/material/course-dialog/course-dialog.component';

@Component({
  selector: 'app-index-producto',
  templateUrl: './index-producto.component.html',
  styleUrls: ['./index-producto.component.css']
})

export class IndexProductoComponent implements AfterViewInit  {

  displayedColumns: string[] = ['id', 'nombre', 'categoria', 'fechaCreacion', 'cantidadMinima', 'cantidad', 'actions'];
  dataSource;

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private productoService: ProductoService, public router: Router, private dialog: MatDialog) {
    this.productoService.getDataArrObservable().then((arrProducts) => {
        this.dataSource = new MatTableDataSource(arrProducts);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
    });
  }

  refresh(): any {
    this.productoService.getDataArrObservable().then((arrProducts) => {
      this.dataSource = new MatTableDataSource(arrProducts);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
  }

  applyFilter(event: Event): any {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  drop(event: CdkDragDrop<string[]>): any {
    moveItemInArray(this.displayedColumns, event.previousIndex, event.currentIndex);
  }

  ngAfterViewInit(): void {
  }

  openDeleteDialog(nombre: string, id: number): any {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
        description: 'Desea eliminar el producto: ' + nombre,
        title: 'Eliminar Producto',
        txtAcept: 'Eliminar',
        txtCancel: 'Cancelar'
    };

    this.dialog.open(CourseDialogComponent, dialogConfig);
    const dialogRef = this.dialog.open(CourseDialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(result => {
      this.dialog.closeAll();
      if (result){
        this.productoService.deleteProducto(id).then(() => {
          this.refresh();
        }, (error: any) => {
          console.error(error);
        });
      }
    });
}

}
