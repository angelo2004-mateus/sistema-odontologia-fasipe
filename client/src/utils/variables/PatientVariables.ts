export const patientColumnsTable: object[] = [
  { title: "Código", dataIndex: "cod_pac" },
  { title: "CPF", dataIndex: "cpf_pac" },
  { title: "Nome", dataIndex: "nome_pac" },
  { title: "Telefone", dataIndex: "tel_pac" },
  { title: "Data Nascimento", dataIndex: "data_nasc_pac" },
];

export const patientFieldInputTable = [
  {
    type: "text",
    name: "cpf_pac",
    placeholder: "CPF",
    rules: [{ required: true, message: "Por favor, insira o CPF/CNPJ!" }],
  },
  {
    type: "text",
    name: "nome_pac",
    placeholder: "Nome",
    rules: [{ required: true, message: "Por favor, insira o Nome!" }],
  },
];

export const patientSectionsFormDrawer = [
  {
    section: "Informações Pessoais",
    fields: [
      {
        name: "cod_pac",
        type: "text",
        placeholder: "Código",
        value: '1234',
        rules: [
          { required: true, message: "Por favor, insira o nome completo" },
          { min: 3, message: "O nome deve ter no mínimo 3 caracteres" },
          { max: 100, message: "O nome pode ter no máximo 100 caracteres" },
        ],
      },
      {
        name: "nome_pac",
        type: "text",
        placeholder: "Nome Completo",
        rules: [
          { required: true, message: "Por favor, insira o nome completo" },
          { min: 3, message: "O nome deve ter no mínimo 3 caracteres" },
          { max: 100, message: "O nome pode ter no máximo 100 caracteres" },
        ],
      },
      {
        name: "cpf_pac",
        type: "text",
        placeholder: "CPF",
        rules: [
          { required: true, message: "Por favor, insira o CPF" },
          { len: 11, message: "O CPF deve ter 11 dígitos" },
        ],
      },
      {
        name: "rg_pac",
        type: "text",
        placeholder: "RG",
        rules: [
          { required: true, message: "Por favor, insira o RG" },
          { min: 7, max: 14, message: "O RG deve ter entre 7 e 14 caracteres" },
        ],
      },
      {
        name: "tel_pac",
        type: "text",
        placeholder: "Telefone",
        rules: [
          { required: true, message: "Por favor, insira o telefone" },
          {
            pattern: /^[0-9]{10,11}$/,
            message: "O telefone deve ter 10 ou 11 dígitos numéricos",
          },
        ],
      },
      {
        name: "data_nasc_pac",
        type: "text",
        placeholder: "Data de Nascimento",
        rules: [
          { required: true, message: "Por favor, insira a data de nascimento" },
        ],
      },
      {
        name: "nome_mae_pac",
        type: "text",
        placeholder: "Nome da Mãe",
        rules: [
          { required: true, message: "Por favor, insira o nome da mãe" },
          {
            min: 3,
            max: 100,
            message: "O nome deve ter entre 3 e 100 caracteres",
          },
        ],
      },
    ],
  },
  {
    section: "Endereço",
    fields: [
      {
        name: "logra_pac",
        type: "text",
        placeholder: "Logradouro",
        rules: [
          { required: true, message: "Por favor, insira o logradouro" },
          {
            min: 3,
            max: 100,
            message: "O logradouro deve ter entre 3 e 100 caracteres",
          },
        ],
      },
      {
        name: "num_logra_pac",
        type: "text",
        placeholder: "Número da Casa",
        rules: [
          { required: true, message: "Por favor, insira o número da casa" },
          {
            pattern: /^[0-9]+$/,
            message: "O número deve ser composto apenas por dígitos",
          },
        ],
      },
      {
        name: "compl_pac",
        type: "text",
        placeholder: "Complemento",
        rules: [
          {
            max: 50,
            message: "O complemento pode ter no máximo 50 caracteres",
          },
        ],
      },
      {
        name: "bairro_pac",
        type: "text",
        placeholder: "Bairro",
        rules: [
          { required: true, message: "Por favor, insira o bairro" },
          {
            min: 3,
            max: 100,
            message: "O bairro deve ter entre 3 e 100 caracteres",
          },
        ],
      },
      {
        name: "cep_pac",
        type: "text",
        placeholder: "CEP",
        rules: [
          { required: true, message: "Por favor, insira o CEP" },
          { len: 8, message: "O CEP deve ter 8 dígitos" },
          {
            pattern: /^[0-9]{8}$/,
            message: "O CEP deve conter apenas dígitos",
          },
        ],
      },
      {
        name: "uf_pac",
        type: "text",
        placeholder: "Estado (UF)",
        rules: [
          { required: true, message: "Por favor, insira o estado (UF)" },
          { len: 2, message: "O estado (UF) deve ter exatamente 2 letras" },
          {
            pattern: /^[A-Za-z]{2}$/,
            message: "O estado (UF) deve conter apenas letras",
          },
        ],
      },
    ],
  },
];
