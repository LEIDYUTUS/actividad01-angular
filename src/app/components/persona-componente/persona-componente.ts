import { Component, inject, signal } from '@angular/core';
import { Persona } from '../../interfaces/persona';
import { form, min, required, FormField } from '@angular/forms/signals';
import { PersonaService } from '../../services/persona.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-persona-componente',
  standalone: true,
  imports: [FormField],
  templateUrl: './persona-componente.html',
  styleUrl: './persona-componente.css'
})
export class PersonaComponent {
  private personaService = inject(PersonaService);
  listaPersonas: Persona[] = [];

  
  private personaModelo = signal<Persona>({
    nombre: '',
    apellido: '',
    email: '',
    edad: 0,
    telefono: ''
  });


  personaFormulario = form(this.personaModelo, (esquema) => {
    required(esquema.nombre, { message: 'El nombre es obligatorio' });
    required(esquema.apellido, { message: 'El apellido es obligatorio' });
    required(esquema.email, { message: 'El correo electrónico es obligatorio' });
    required(esquema.edad, { message: 'La edad es obligatoria' });
    min(esquema.edad, 10, { message: 'La edad mínima es de 10 años' });
    required(esquema.telefono, { message: 'El teléfono es obligatorio' });
  });

  constructor() {
    this.mostrar();
  }

  guardar(evento: Event) {
    evento.preventDefault();

    const persona: Persona = {
      nombre: this.personaModelo().nombre,
      apellido: this.personaModelo().apellido,
      email: this.personaModelo().email,
      edad: this.personaModelo().edad,
      telefono: this.personaModelo().telefono
    };

    this.personaService.guardar(persona);

    
    Swal.fire({
      title: '¡Registro Exitoso!',
      text: 'La persona ha sido registrada correctamente.',
      icon: 'success',
      confirmButtonText: 'Aceptar',
      confirmButtonColor: '#0d6efd'
    });

    this.limpiar();
    this.mostrar();
  }

  limpiar() {
    this.personaModelo.set({
      nombre: '',
      apellido: '',
      email: '',
      edad: 0,
      telefono: ''
    });
  }

  mostrar() {
    this.listaPersonas = this.personaService.mostrar();
  }
}