import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { EventService } from '../../services/event.service';
import { VenueService } from '../../services/venue.service';
import { Event } from '../../models/event';
import { Venue } from '../../models/venue';

@Component({
    selector: 'app-event-list',
    standalone: true,
    imports: [
        CommonModule,
        FormsModule,
        NzTableModule,
        NzButtonModule,
        NzModalModule,
        NzFormModule,
        NzInputModule,
        NzPopconfirmModule,
        NzIconModule,
        NzSpinModule,
        NzInputNumberModule,
        NzSelectModule,
        NzDatePickerModule
    ],
    templateUrl: './event-list.html',
    styleUrl: './event-list.css'
})
export class EventListComponent implements OnInit {
    events: Event[] = [];
    venues: Venue[] = [];
    isModalVisible = false;
    isEditMode = false;
    currentEvent: Event = { nombre: '', fechaInicio: '', fechaFin: '', venueId: '', descripcion: '', capacidadMaxima: 0 };
    loading = false;

    constructor(
        private eventService: EventService,
        private venueService: VenueService,
        private message: NzMessageService
    ) { }

    ngOnInit(): void {
        this.loadEvents();
        this.loadVenues();
    }

    loadEvents(): void {
        this.loading = true;
        this.eventService.getEvents().subscribe({
            next: (data) => {
                this.events = data;
                this.loading = false;
            },
            error: (error) => {
                console.error('Error loading events:', error);
                this.message.error('Error al cargar eventos');
                this.loading = false;
            }
        });
    }

    loadVenues(): void {
        this.venueService.getVenues().subscribe({
            next: (data) => {
                this.venues = data;
            },
            error: (error) => {
                console.error('Error loading venues:', error);
            }
        });
    }

    showModal(event?: Event): void {
        if (event) {
            this.isEditMode = true;
            this.currentEvent = { ...event };
        } else {
            this.isEditMode = false;
            this.currentEvent = { nombre: '', fechaInicio: '', fechaFin: '', venueId: '', descripcion: '', capacidadMaxima: 0 };
        }
        this.isModalVisible = true;
    }

    handleOk(): void {
        if (this.isEditMode && this.currentEvent.id) {
            this.updateEvent();
        } else {
            this.createEvent();
        }
    }

    handleCancel(): void {
        this.isModalVisible = false;
        this.currentEvent = { nombre: '', fechaInicio: '', fechaFin: '', venueId: '', descripcion: '', capacidadMaxima: 0 };
    }

    createEvent(): void {
        this.eventService.createEvent(this.currentEvent).subscribe({
            next: () => {
                this.message.success('Evento creado exitosamente');
                this.loadEvents();
                this.handleCancel();
            },
            error: (error) => {
                console.error('Error creating event:', error);
                this.message.error('Error al crear evento');
            }
        });
    }

    updateEvent(): void {
        if (this.currentEvent.id) {
            this.eventService.updateEvent(this.currentEvent.id, this.currentEvent).subscribe({
                next: () => {
                    this.message.success('Evento actualizado exitosamente');
                    this.loadEvents();
                    this.handleCancel();
                },
                error: (error) => {
                    console.error('Error updating event:', error);
                    this.message.error('Error al actualizar evento');
                }
            });
        }
    }

    deleteEvent(id: string): void {
        this.eventService.deleteEvent(id).subscribe({
            next: () => {
                this.message.success('Evento eliminado exitosamente');
                this.loadEvents();
            },
            error: (error) => {
                console.error('Error deleting event:', error);
                this.message.error('Error al eliminar evento');
            }
        });
    }

    getVenueName(venueId: string): string {
        const venue = this.venues.find(v => v.id === venueId);
        return venue ? venue.nombre : 'Venue no encontrado';
    }
}
