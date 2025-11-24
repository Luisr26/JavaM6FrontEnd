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
import { VenueService } from '../../services/venue.service';
import { Venue } from '../../models/venue';

@Component({
    selector: 'app-venue-list',
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
        NzInputNumberModule
    ],
    templateUrl: './venue-list.html',
    styleUrl: './venue-list.css'
})
export class VenueListComponent implements OnInit {
    venues: Venue[] = [];
    isModalVisible = false;
    isEditMode = false;
    currentVenue: Venue = { nombre: '', direccion: '', capacidad: 0, descripcion: '' };
    loading = false;

    constructor(
        private venueService: VenueService,
        private message: NzMessageService
    ) { }

    ngOnInit(): void {
        this.loadVenues();
    }

    loadVenues(): void {
        this.loading = true;
        this.venueService.getVenues().subscribe({
            next: (data) => {
                this.venues = data;
                this.loading = false;
            },
            error: (error) => {
                console.error('Error loading venues:', error);
                this.message.error('Error al cargar venues');
                this.loading = false;
            }
        });
    }

    showModal(venue?: Venue): void {
        if (venue) {
            this.isEditMode = true;
            this.currentVenue = { ...venue };
        } else {
            this.isEditMode = false;
            this.currentVenue = { nombre: '', direccion: '', capacidad: 0, descripcion: '' };
        }
        this.isModalVisible = true;
    }

    handleOk(): void {
        if (this.isEditMode && this.currentVenue.id) {
            this.updateVenue();
        } else {
            this.createVenue();
        }
    }

    handleCancel(): void {
        this.isModalVisible = false;
        this.currentVenue = { nombre: '', direccion: '', capacidad: 0, descripcion: '' };
    }

    createVenue(): void {
        this.venueService.createVenue(this.currentVenue).subscribe({
            next: () => {
                this.message.success('Venue creado exitosamente');
                this.loadVenues();
                this.handleCancel();
            },
            error: (error) => {
                console.error('Error creating venue:', error);
                this.message.error('Error al crear venue');
            }
        });
    }

    updateVenue(): void {
        if (this.currentVenue.id) {
            this.venueService.updateVenue(this.currentVenue.id, this.currentVenue).subscribe({
                next: () => {
                    this.message.success('Venue actualizado exitosamente');
                    this.loadVenues();
                    this.handleCancel();
                },
                error: (error) => {
                    console.error('Error updating venue:', error);
                    this.message.error('Error al actualizar venue');
                }
            });
        }
    }

    deleteVenue(id: string): void {
        this.venueService.deleteVenue(id).subscribe({
            next: () => {
                this.message.success('Venue eliminado exitosamente');
                this.loadVenues();
            },
            error: (error) => {
                console.error('Error deleting venue:', error);
                this.message.error('Error al eliminar venue');
            }
        });
    }
}
