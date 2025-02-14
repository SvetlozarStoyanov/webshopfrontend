import { Routes } from '@angular/router';
import { ProductListComponent } from './components/product-list/product-list.component';

export const routes: Routes = [
    { path: 'home', component: ProductListComponent },
    { path: '', redirectTo: 'home', pathMatch: 'full' },

];
