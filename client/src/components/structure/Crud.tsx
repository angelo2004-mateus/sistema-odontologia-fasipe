import React, { useState } from "react";
import { Table, Input, Button, Space, Select } from "antd";
import { ColumnType } from "antd/es/table";
import "../../styles/layout/crud.less";

const { Option } = Select;

interface Field {
  type: string;
  name: string;
  placeholder: string;
  useCustomFilter?: boolean; // Define se o campo usa lógica de filtro personalizada
  rules?: any;
  prefix?: any;
  options?: { label: string; value: string | number }[]; // Para armazenar opções de select
}

interface CrudProps<T> {
  title: string;
  fields: Field[];
  columns: ColumnType<T>[];
  data: T[];
  onEdit?: (record: T) => void;
  onDelete?: (record: T) => void;
  onViewDetails?: (record: T) => void;
  onFieldChange?: (fieldName: string, value: string | number | boolean) => void;
  actionsAllowed?: Array<"edit" | "delete" | "viewDetails" | null>;
  actions?: React.ReactNode[];
  editComponent?: React.ReactNode;
  viewComponent?: React.ReactNode;
}

const Crud = <T extends object>({
  title,
  fields,
  columns,
  data,
  onEdit,
  onDelete,
  onViewDetails,
  onFieldChange,
  actionsAllowed = [],
  actions,
  editComponent,
  viewComponent
}: CrudProps<T>) => {
  const [searchValues, setSearchValues] = useState<
    Record<string, string | number>
  >(
    fields.reduce((acc, field) => {
      if (field.type === "select") {
        return { ...acc, [field.name]: "Todos" }; // Valor padrão para selects
      }
      return { ...acc, [field.name]: "" }; // Valor padrão para inputs de texto ou outros
    }, {})
  );

  const [customValues, setCustomValues] = useState<
    Record<string, string | number>
  >(
    fields.reduce((acc, field) => {
      if (field.useCustomFilter) {
        return { ...acc, [field.name]: "" }; 
      }
      return acc;
    }, {})
  );

  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  const handleSearchChange =
    (name: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setSearchValues({
        ...searchValues,
        [name]: value,
      });
      if (onFieldChange) {
        onFieldChange(name, value);
      }
    };

  const handleSelectChange = (
    name: string,
    value: string | number,
    useCustomFilter?: boolean
  ) => {
    if (useCustomFilter) {
      if (onFieldChange) {
        onFieldChange(name, value);
      }

      setCustomValues({
        ...customValues,
        [name]: value,
      });
      return;
    }

    // Altera o valor e aplica lógica de filtragem
    setSearchValues({
      ...searchValues,
      [name]: value,
    });
    if (onFieldChange) {
      onFieldChange(name, value);
    }
  };

  const filteredData = data.filter((item) =>
    fields.every((field) => {
      if (field.useCustomFilter) {
        // Ignora lógica de filtro para campos customizados
        return true;
      }
      const value = item[field.name as keyof T];
      const searchValue = searchValues[field.name] || "";

      if (field.type === "select" && searchValue === "Todos") {
        return true;
      }

      return value
        ?.toString()
        .toLowerCase()
        .includes(searchValue.toString().toLowerCase());
    })
  );

  const startIndex = (currentPage - 1) * pageSize;
  const currentData = filteredData.slice(startIndex, startIndex + pageSize);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const actionColumn: ColumnType<T> | null =
    actionsAllowed.length > 0
      ? {
          title: "Ações",
          key: "actions",
          render: (text, record) => (
            <Space>
              {actionsAllowed.includes("edit") && (
                <Button
                  className="small btn-edit"
                  onClick={() => onEdit && onEdit(record)}
                >
                  Editar
                </Button>
              )}
              {actionsAllowed.includes("delete") && (
                <Button
                  className="small btn-delete"
                  danger
                  onClick={() => onDelete && onDelete(record)}
                >
                  Excluir
                </Button>
              )}
              {actionsAllowed.includes("viewDetails") && (
                <Button
                  className="middle btn-view"
                  onClick={() => onViewDetails && onViewDetails(record)}
                >
                  Detalhes
                </Button>
              )}
            </Space>
          ),
        }
      : null;

  const modifiedColumns = columns.map((col, index) => {
    return {
      ...col,
      render: (text: any, record: T) => {
        if (col.render) {
          return col.render(text, record, index);
        }
        return text;
      },
    };
  });

  return (
    <section className="crud">
      <h3 className="h3">{title}</h3>
      <div className="header">
        <div className="container_input">
          {fields.map((field) => {
            if (field.type === "select") {
              return (
                <Select
                  key={field.name}
                  placeholder={`Pesquisar por ${field.placeholder}`}
                  value={
                    field.useCustomFilter
                      ? customValues[field.name]
                      : searchValues[field.name]
                  }
                  onChange={(value) =>
                    handleSelectChange(
                      field.name,
                      value,
                      field.useCustomFilter
                    )
                  }
                  style={{
                    marginBottom: 8,
                    width: "200px",
                    marginRight: "8px",
                  }}
                >
                  {field.options?.map((option) => (
                    <Option key={option.value} value={option.value}>
                      {option.label}
                    </Option>
                  ))}
                </Select>
              );
            }

            return (
              <Input
                className="input_filled"
                prefix={field.prefix}
                key={field.name}
                placeholder={`Pesquisar por ${field.placeholder}`}
                value={searchValues[field.name]}
                onChange={handleSearchChange(field.name)}
                style={{ marginBottom: 8, width: "200px", marginRight: "8px" }}
              />
            );
          })}
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
        columns={
          actionColumn ? [...modifiedColumns, actionColumn] : modifiedColumns
        }
        dataSource={currentData}
        rowKey="id"
        pagination={{
          current: currentPage,
          pageSize: pageSize,
          total: filteredData.length,
          onChange: handlePageChange,
        }}
        size="middle"
      />

      {editComponent}
      {viewComponent}
    </section>
  );
};

export default Crud;
