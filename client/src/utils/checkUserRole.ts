export const checkUserRole = (userType: number[]): boolean => {
    const userDataString = localStorage.getItem("userData");
  
    if (!userDataString) {
      console.error("No user data found in localStorage.");
      return false;
    }
  
    try {
      const userData = JSON.parse(userDataString);
  
    
      return userType.includes(userData.tipo_prof);
    } catch (error) {
      console.error("Failed to parse user data:", error);
      return false; 
    }
  };
  