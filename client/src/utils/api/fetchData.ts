import axios, { AxiosResponse } from 'axios';

// Criação da instância do axios com a URL base
const api = axios.create({
  baseURL: 'http://localhost:3000', // Defina a URL base da sua API
});

// Interface para os parâmetros de consulta
interface QueryParams {
  [key: string]: string | number | boolean | null | undefined;
}

// Definindo a função fetchData
export const fetchData = async <T>(route: string, query?: QueryParams): Promise<{ data: T; loading: boolean; error: string | null }> => {
  // Cria a string de consulta se houver parâmetros
  const queryString = query
    ? `?${new URLSearchParams(
        Object.entries(query).reduce((acc, [key, value]) => {
          if (value !== undefined && value !== null) {
            acc[key] = String(value); // Converte valores para string
          }
          return acc;
        }, {} as Record<string, string>)
      ).toString()}`
    : '';

  try {
    // Realiza a requisição GET
    const response: AxiosResponse<T> = await api.get(`${route}${queryString}`);
    
    // Retorna os dados recebidos
    return { data: response.data, loading: false, error: null }; // Retorna os dados
  } catch (err: any) {
    // Captura e trata erros
    const errorMsg = axios.isAxiosError(err) && err.response
      ? err.response.data // Mensagem de erro da resposta
      : "Erro desconhecido"; // Mensagem de erro genérica
    return { data: null as any, loading: false, error: errorMsg }; // Retorna erro
  }
};
