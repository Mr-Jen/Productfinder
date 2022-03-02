export const loadState = () => {
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
  try {
    const serializedState = JSON.stringify(state);
    sessionStorage.setItem('filter', serializedState);
  } catch (error) {
    // Ignore write errors.
  }
};