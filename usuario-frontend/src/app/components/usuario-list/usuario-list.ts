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
import { UsuarioService } from '../../services/usuario';
import { Usuario } from '../../models/usuario';

@Component({
  selector: 'app-usuario-list',
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
    NzSpinModule
  ],
  templateUrl: './usuario-list.html',
  styleUrl: './usuario-list.css'
})
export class UsuarioListComponent implements OnInit {
  usuarios: Usuario[] = [];
  isModalVisible = false;
  isEditMode = false;
  currentUsuario: Usuario = { name: '', cargo: '', telefono: '' };
  loading = false;

  constructor(
    private usuarioService: UsuarioService,
    private message: NzMessageService
  ) { }

  ngOnInit(): void {
    this.loadUsuarios();
  }

  loadUsuarios(): void {
    this.loading = true;
    this.usuarioService.getUsuarios().subscribe({
      next: (data) => {
        this.usuarios = data;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading usuarios:', error);
        this.message.error('Error al cargar usuarios');
        this.loading = false;
      }
    });
  }

  showModal(usuario?: Usuario): void {
    if (usuario) {
      this.isEditMode = true;
      this.currentUsuario = { ...usuario };
    } else {
      this.isEditMode = false;
      this.currentUsuario = { name: '', cargo: '', telefono: '' };
    }
    this.isModalVisible = true;
  }

  handleOk(): void {
    if (this.isEditMode && this.currentUsuario.id) {
      this.updateUsuario();
    } else {
      this.createUsuario();
    }
  }

  handleCancel(): void {
    this.isModalVisible = false;
    this.currentUsuario = { name: '', cargo: '', telefono: '' };
  }

  createUsuario(): void {
    this.usuarioService.createUsuario(this.currentUsuario).subscribe({
      next: () => {
        this.message.success('Usuario creado exitosamente');
        this.loadUsuarios();
        this.handleCancel();
      },
      error: (error) => {
        console.error('Error creating usuario:', error);
        this.message.error('Error al crear usuario');
      }
    });
  }

  updateUsuario(): void {
    if (this.currentUsuario.id) {
      this.usuarioService.updateUsuario(this.currentUsuario.id, this.currentUsuario).subscribe({
        next: () => {
          this.message.success('Usuario actualizado exitosamente');
          this.loadUsuarios();
          this.handleCancel();
        },
        error: (error) => {
          console.error('Error updating usuario:', error);
          this.message.error('Error al actualizar usuario');
        }
      });
    }
  }

  deleteUsuario(id: string): void {
    this.usuarioService.deleteUsuario(id).subscribe({
      next: () => {
        this.message.success('Usuario eliminado exitosamente');
        this.loadUsuarios();
      },
      error: (error) => {
        console.error('Error deleting usuario:', error);
        this.message.error('Error al eliminar usuario');
      }
    });
  }
}
