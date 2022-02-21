export const loadState = () => {
  console.log("LOADING STORAGE INTO STORE")
    try {
      const serializedState = sessionStorage.getItem('filter');
  
      if (serializedState === null) {
        return undefined;
      }
  
      return JSON.parse(serializedState);
    } catch (error) {
      return undefined;
    }
  };
  
export const saveState = (state) => {
  console.log("SAVING STORE INTO STORAGE")
  try {
    const serializedState = JSON.stringify(state);
    sessionStorage.setItem('filter', serializedState);
  } catch (error) {
    // Ignore write errors.
  }
};