// src/utils/interfaces/Field.ts
export interface Field {
  title: string;     // Título do campo
  dataIndex: string; // Nome do campo
  key: string;       // Chave do campo (geralmente o mesmo que dataIndex)
  type: string;      // Tipo do campo (por exemplo, "text", "number", "select")
  name: string;      // Nome utilizado no formulário
  placeholder: string; // Placeholder do campo
  options?: { value: string; label: string }[]; // Para campos do tipo select
}
