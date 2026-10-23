import { Injectable } from '@angular/core';
import { Persona } from '../interfaces/persona';

@Injectable({
  providedIn: 'root'
})
export class PersonaService {
  private personaDB: Persona[] = [];

  guardar(persona: Persona) {
    this.personaDB.push(persona);
  }

  mostrar(): Persona[] {
    return this.personaDB;
  }
}