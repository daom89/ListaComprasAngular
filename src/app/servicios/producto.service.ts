import { formatDate } from '@angular/common';
import { Injectable } from '@angular/core';

import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { Producto } from 'src/app/modelos/producto.model';
import 'rxjs/add/operator/toPromise';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  productoRef: AngularFirestoreCollection<Producto> = null;

  constructor(private firestore: AngularFirestore) {
    this.productoRef = firestore.collection('/productos');
  }

   // ---[create]--------------------
  createProducto(producto: Producto): any {
    return this.productoRef.doc(String(producto.id)).set({ ...producto });
  }

   // ---[read]--------------------
  getProductos(): AngularFirestoreCollection<Producto> {
    return this.productoRef;
  }

  getProducto(productoId: number): AngularFirestoreCollection<Producto>{
    return this.firestore.collection(
      'productos', ref => ref.where('id', '==', productoId)
    );
  }

 // ---[update]--------------------
  updateProducto(id: number, data: Producto): any{
    return this.productoRef.doc(String(id)).set({ ...data });
  }

  // ---[delete]--------------------
  deleteProducto(productoId: number): any{
    return this.productoRef.doc(String(productoId)).delete();
  }

  getCount(): any {
    return new Promise( (resolve) => {
      this.productoRef.get().toPromise().then( querySnapshot => {
        resolve(querySnapshot.size);
      });
    });
  }

  getArrObservable(): any {
    return this.getProductos().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          // tslint:disable-next-line: max-line-length
          ({ ...c.payload.doc.data(),
            cantidad: Number(c.payload.doc.data().cantidad),
            cantidadMinima: Number(c.payload.doc.data().cantidadMinima),
            fechaCreacion: formatDate(c.payload.doc.data().fechaCreacion.toDate(), 'yyyy-MM-dd hh:mm:ss', 'en-US') })
        )
      )
    );
  }

  getDataArrObservable(): any {
    return new Promise( (resolve) => {
      this.getArrObservable().subscribe( data => {
        resolve(data);
      });
    });
  }

  getObservable(productoId: number): any {
    return this.getProducto(productoId).snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          // tslint:disable-next-line: max-line-length
          ({ ...c.payload.doc.data(),
            cantidad: Number(c.payload.doc.data().cantidad),
            cantidadMinima: Number(c.payload.doc.data().cantidadMinima),
            fechaCreacion: formatDate(c.payload.doc.data().fechaCreacion.toDate(), 'yyyy-MM-dd', 'en-US') })
        )
      )
    );
  }

  getDataObservable(productoId: number): any {
    return new Promise( (resolve) => {
      this.getObservable(productoId).subscribe( data => {
        resolve(data);
      });
    });
  }

}
