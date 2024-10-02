// src/utils/interfaces/Section.ts
import { Field } from "@/utils/interfaces/Field"; // Importa a interface Field

export interface Section {
  section: string; // Título da seção
  fields: Field[]; // Campos que pertencem a esta seção
}
