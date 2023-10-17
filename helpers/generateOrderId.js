const { v4: uuidv4 } = require("uuid");
export const generateOrderId = () => {
  const orderID = uuidv4();
  console.log("order :", orderID);
  return <div>generateOrderId</div>;
};
