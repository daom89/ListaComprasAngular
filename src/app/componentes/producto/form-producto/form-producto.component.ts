import { Component, OnInit } from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';

// ---[Formulario]------------------------------------
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Location } from '@angular/common';

// ---[Servicio de datos]--------------------------------
import { ProductoService } from 'src/app/servicios/producto.service';
import { Producto } from 'src/app/modelos/producto.model';
import { Button } from 'protractor';
import { empty } from 'rxjs';

@Component({
  selector: 'app-form-producto',
  templateUrl: './form-producto.component.html',
  styleUrls: ['./form-producto.component.css']
})

export class FormProductoComponent implements OnInit {

  public formularioProducto: FormGroup;
  public producto: Producto;

  constructor(private location: Location, private productoService: ProductoService, private snackBar: MatSnackBar) { }

  openSnackBar(message: string, action: string = null, seconds: number = 2): any {
    return new Promise( (resolve, reject) => {
      this.snackBar.open(message, action, {
        duration: seconds * 1000,
      });
      setTimeout(() => { resolve(); }, seconds * 1000);
    });
  }

 
  ngOnInit(): void {
    this.formularioProducto = new FormGroup({
      nombre: new FormControl('', [Validators.required, Validators.maxLength(60)]),
      categoria: new FormControl(''),
      fechaCreacion: new FormControl(new Date()),
      cantidadMinima: new FormControl('', [Validators.required]),
      cantidad: new FormControl('', [Validators.required]),
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
      this.producto.nombre = formularioProductoValue.nombre;
      this.producto.categoria = formularioProductoValue.categoria;
      this.producto.cantidadMinima = formularioProductoValue.cantidadMinima;
      this.producto.cantidad = formularioProductoValue.cantidad;
      this.producto.fechaCreacion = formularioProductoValue.fechaCreacion;
      this.create(this.producto);
    }
  }

  private create(producto: Producto): void {
    this.productoService.getCount().then((id: number) => {
      producto.id = id + 1;
      this.openSnackBar('Enviando Registro', null, 0.5).then(() => {
        this.productoService.createProducto(producto).then(() => {
          this.openSnackBar('Producto Registrado con Exito', null, 0.5).then(() => {
            this.location.back();
          });
        }, (error: any) => {
          console.error(error);
        });
      });
    });
  }

}
