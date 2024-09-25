import React, { useState } from "react";
import { Table, Input, Button, Space } from "antd";
import { ColumnType } from "antd/es/table";
import "../../styles/layout/crud.less";

interface Field {
  type: string;
  name: string;
  placeholder: string;
  rules?: any;
  prefix?: any;
}

interface CrudProps<T> {
  title: string;
  fields: Field[];
  columns: ColumnType<T>[];
  data: T[];
  onEdit: (record: T) => void; 
  onDelete: (record: T) => void;
  actionsAllowed?: Array<"edit" | "delete">; 
  actions?: React.ReactNode[]; 
  editComponent?: React.ReactNode;
}

const Crud = <T extends object>({
  title,
  fields,
  columns,
  data,
  onEdit,
  onDelete,
  actionsAllowed = [],
  actions,
  editComponent, 
}: CrudProps<T>) => {
  const [searchValues, setSearchValues] = useState<Record<string, string>>(
    fields.reduce((acc, field) => ({ ...acc, [field.name]: "" }), {})
  );

  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5;

  const handleSearchChange =
    (name: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearchValues({
        ...searchValues,
        [name]: e.target.value,
      });
    };

  const filteredData = data.filter((item) =>
    fields.every((field) => {
      const value = item[field.name as keyof T];
      const searchValue = searchValues[field.name] || "";
      return value
        ?.toString()
        .toLowerCase()
        .includes(searchValue.toLowerCase());
    })
  );

  const startIndex = (currentPage - 1) * pageSize;
  const currentData = filteredData.slice(startIndex, startIndex + pageSize);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // Função para truncar texto
  const truncateText = (text: string, limit: number) => {
    if (text.length > limit) {
      return text.slice(0, limit) + "..."; // Adiciona '...' se o texto exceder o limite
    }
    return text;
  };

  // Adiciona uma coluna de ações (Editar, Excluir) apenas se ações forem permitidas
  const actionColumn: ColumnType<T> | null = actionsAllowed.length > 0 ? {
    title: "Ações",
    key: "actions",
    render: (text, record) => (
      <Space>
        {actionsAllowed.includes("edit") && (
          <Button
            className="small btn-edit"
            onClick={() => onEdit(record)} 
          >
            Editar
          </Button>
        )}
        {actionsAllowed.includes("delete") && (
          <Button
            className="small btn-delete"
            danger
            onClick={() => onDelete(record)}
          >
            Excluir
          </Button>
        )}
      </Space>
    ),
  } : null;

  // Modifica as colunas para aplicar o truncamento
  const modifiedColumns = columns.map((col) => {
    return {
      ...col,
      render: (text: string) => truncateText(text, 15), // Aplica truncamento a cada célula
    };
  });

  return (
    <section className="crud">
      <h3 className="h3">{title}</h3>
      <div className="header">
        <div className="container_input">
          {fields.map((field) => (
            <Input
              className="input_filled"
              prefix={field.prefix}
              key={field.name}
              placeholder={`Pesquisar por ${field.placeholder}`}
              value={searchValues[field.name]}
              onChange={handleSearchChange(field.name)}
              style={{ marginBottom: 8, width: "200px", marginRight: "8px" }}
            />
          ))}
        </div>
        {actions && (
          <div className="container_button">
            {actions.map((action, index) => (
              <span key={index} style={{ marginRight: "8px" }}>
                {action}
              </span>
            ))}
          </div>
        )}
      </div>

      <Table
        columns={actionColumn ? [...modifiedColumns, actionColumn] : modifiedColumns}
        dataSource={currentData}
        rowKey="id"
        pagination={{
          current: currentPage,
          pageSize: pageSize,
          total: filteredData.length,
          onChange: handlePageChange,
        }}
        scroll={{ y: '100%' }}
      />

      {editComponent}
    </section>
  );
};

export default Crud;
