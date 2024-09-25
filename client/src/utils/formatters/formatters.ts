export const formatDate = (dataISO: string | null | undefined): string => {
    if (!dataISO) return '';
  
    const data = new Date(dataISO);
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: '2-digit', day: '2-digit' };
  
    return data.toLocaleDateString('pt-BR', options);
  };
  