import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FormProductoComponent } from './componentes/producto/form-producto/form-producto.component';
import { IndexProductoComponent } from './componentes/producto/index-producto/index-producto.component';
import { EditProductoComponent } from './componentes/producto/edit-producto/edit-producto.component';

const routes: Routes = [
  { path: '', redirectTo: 'indexproducto', pathMatch: 'full' },
  { path: 'formularioproducto', component: FormProductoComponent },
  { path: 'indexproducto', component: IndexProductoComponent },
  { path: 'editproducto/:id', component: EditProductoComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
