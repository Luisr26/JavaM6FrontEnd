import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Venue } from '../models/venue';

@Injectable({
    providedIn: 'root'
})
export class VenueService {
    private apiUrl = 'http://localhost:8082/api/venues';

    constructor(private http: HttpClient) { }

    // Listar todos los venues
    getVenues(): Observable<Venue[]> {
        return this.http.get<Venue[]>(this.apiUrl);
    }

    // Obtener un venue por ID
    getVenue(id: string): Observable<Venue> {
        return this.http.get<Venue>(`${this.apiUrl}/${id}`);
    }

    // Crear un nuevo venue
    createVenue(venue: Venue): Observable<Venue> {
        return this.http.post<Venue>(this.apiUrl, venue);
    }

    // Actualizar un venue existente
    updateVenue(id: string, venue: Venue): Observable<Venue> {
        return this.http.put<Venue>(`${this.apiUrl}/${id}`, venue);
    }

    // Eliminar un venue
    deleteVenue(id: string): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/${id}`);
    }
}
