const useFromOrderState = () => {
  // Function to retrieve the state stored in localStorage
  const getFromOrderState = () => {
      if (typeof window !== "undefined") {
          const storedState = localStorage.getItem("isFromOrderDetail");
          return storedState ? storedState.toString() : false;
      }
  };

  // Function to update the state and store it in localStorage
  const updateFromOrder = (value) => {
      if (typeof window !== "undefined") {
          localStorage.setItem("isFromOrderDetail", value.toString());
      }
  };

  // Returns the functions to get and update the state
  return { getFromOrderState, updateFromOrder };
};

export default useFromOrderState;
