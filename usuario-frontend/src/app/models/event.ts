export interface Event {
    id?: string;
    nombre: string;
    descripcion?: string;
    fechaInicio: string; // ISO 8601 format
    fechaFin: string; // ISO 8601 format
    venueId: string;
    capacidadMaxima?: number;
}
