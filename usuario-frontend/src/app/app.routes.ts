import { Routes } from '@angular/router';
import { UsuarioListComponent } from './components/usuario-list/usuario-list';
import { VenueListComponent } from './components/venue-list/venue-list';
import { EventListComponent } from './components/event-list/event-list';

export const routes: Routes = [
    { path: '', redirectTo: '/usuarios', pathMatch: 'full' },
    { path: 'usuarios', component: UsuarioListComponent },
    { path: 'venues', component: VenueListComponent },
    { path: 'events', component: EventListComponent }
];
