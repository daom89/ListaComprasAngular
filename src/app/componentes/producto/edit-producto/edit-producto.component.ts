import { Component, OnInit } from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';

// ---[Formulario]------------------------------------
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Location } from '@angular/common';

// ---[Servicio de datos]--------------------------------
import { ProductoService } from 'src/app/servicios/producto.service';
import { Producto } from 'src/app/modelos/producto.model';
import { Button } from 'protractor';
import { OnDestroy } from '@angular/core';

@Component({
  selector: 'app-edit-producto',
  templateUrl: './edit-producto.component.html',
  styleUrls: ['./edit-producto.component.css']
})
export class EditProductoComponent implements OnInit, OnDestroy {

  public formularioProducto: FormGroup;
  public producto: Producto;
  public id: number;
  public title = '';
  private sub: any;

  // tslint:disable-next-line: max-line-length
  constructor(private location: Location, private productoService: ProductoService, private route: ActivatedRoute, private snackBar: MatSnackBar) {

  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  ngOnInit(): void {

    this.formularioProducto = new FormGroup({
      nombre: new FormControl('', [Validators.required, Validators.maxLength(60)]),
      categoria: new FormControl(''),
      cantidadMinima: new FormControl('', [Validators.required]),
      cantidad: new FormControl('', [Validators.required]),
    });

    this.sub = this.route.params.subscribe(params => {
      this.id = +params.id;
    });

    this.productoService.getDataObservable(this.id).then((dataProduct) => {
      this.producto = (dataProduct[0]);
      this.title = this.producto.nombre;
      this.formularioProducto.setValue({
        nombre: this.producto.nombre,
        categoria: this.producto.categoria,
        cantidadMinima: this.producto.cantidadMinima,
        cantidad: this.producto.cantidad
      });
    });

  }

  public hasError = (controlName: string, errorName: string) => {
    return this.formularioProducto.controls[controlName].hasError(errorName);
  }

  public onCancel = () => {
    this.location.back();
  }

  public accionEnviar = (formularioProductoValue) => {
    if (this.formularioProducto.valid) {
      this.producto = new Producto();
      this.producto.id = this.id;
      this.producto.nombre = formularioProductoValue.nombre;
      this.producto.categoria = formularioProductoValue.categoria;
      this.producto.cantidadMinima = formularioProductoValue.cantidadMinima;
      this.producto.cantidad = formularioProductoValue.cantidad;
      this.producto.fechaCreacion = new Date();
      this.update(this.producto);
    }
  }

  private update(producto: Producto): void {
    this.openSnackBar('Actualizando Registro', null, 0.5).then(() => {
      console.log(producto);
      this.productoService.updateProducto(this.id, producto).then(() => {
        this.openSnackBar('Producto Actualizado con Exito', null, 0.5).then(() => {
          this.location.back();
        });
      }, (error: any) => {
        console.error(error);
      });
    });
  }

  openSnackBar(message: string, action: string = null, seconds: number = 2): any {
    return new Promise( (resolve, reject) => {
      this.snackBar.open(message, action, {
        duration: seconds * 1000,
      });
      setTimeout(() => { resolve(); }, seconds * 1000);
    });
  }

}
