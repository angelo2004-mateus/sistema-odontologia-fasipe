export const getUserLoggedName = () => {
    const userDataString = localStorage.getItem("userData");
  
    if (!userDataString) {
      return null; // Retorna null caso o item não esteja no localStorage
    }
  
    try {
      const userData = JSON.parse(userDataString);
      return userData.nome_prof || null; // Retorna `nome_prof` ou null se não existir
    } catch (error) {
      console.error("Erro ao parsear o userData:", error);
      return null;
    }
  };
  