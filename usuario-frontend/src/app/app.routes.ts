import { Routes } from '@angular/router';
import { UsuarioListComponent } from './components/usuario-list/usuario-list';

export const routes: Routes = [
    { path: '', redirectTo: '/usuarios', pathMatch: 'full' },
    { path: 'usuarios', component: UsuarioListComponent }
];
