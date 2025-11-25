import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Event } from '../models/event';
import { EventInscription } from '../models/event-inscription';

@Injectable({
    providedIn: 'root'
})
export class EventService {
    private apiUrl = 'http://localhost:8083/api/events';

    constructor(private http: HttpClient) { }

    // Listar todos los eventos
    getEvents(): Observable<Event[]> {
        return this.http.get<Event[]>(this.apiUrl);
    }

    // Obtener un evento por ID
    getEvent(id: string): Observable<Event> {
        return this.http.get<Event>(`${this.apiUrl}/${id}`);
    }

    // Crear un nuevo evento
    createEvent(event: Event): Observable<Event> {
        return this.http.post<Event>(this.apiUrl, event);
    }

    // Actualizar un evento existente
    updateEvent(id: string, event: Event): Observable<Event> {
        return this.http.put<Event>(`${this.apiUrl}/${id}`, event);
    }

    // Eliminar un evento
    deleteEvent(id: string): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/${id}`);
    }

    // Inscribir un usuario a un evento
    inscribirUsuario(eventId: string, usuarioId: string): Observable<void> {
        return this.http.post<void>(`${this.apiUrl}/${eventId}/inscribir/${usuarioId}`, {});
    }

    // Desincribir un usuario de un evento
    desincribirUsuario(eventId: string, usuarioId: string): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/${eventId}/desincribir/${usuarioId}`);
    }

    // Listar usuarios inscritos en un evento
    listarInscritos(eventId: string): Observable<string[]> {
        return this.http.get<string[]>(`${this.apiUrl}/${eventId}/inscritos`);
    }

    // Listar eventos de un usuario
    listarEventosDeUsuario(usuarioId: string): Observable<Event[]> {
        return this.http.get<Event[]>(`${this.apiUrl}/usuario/${usuarioId}`);
    }
}
