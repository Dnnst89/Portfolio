const { v4: uuidv4 } = require("uuid");
const crypto = require("crypto");

export const generateOrderId = () => {
  try {
    const orderID = uuidv4();
    console.log("order:", orderID);
    return orderID;
  } catch (error) {
    // Handle the error appropriately by falling back to an alternative method
    console.error("Error generating order ID:", error);
    return generateFallbackOrderId();
  }
};

function generateFallbackOrderId() {
  // Create a timestamp to ensure uniqueness
  const timestamp = Date.now();
  // Generate random bytes to add randomness
  const randomBytes = crypto.randomBytes(8);
  // Combine timestamp and random bytes
  const fallbackOrderID = `${timestamp}-${randomBytes.toString("hex")}`;
  console.log("Fallback order:", fallbackOrderID);
  return fallbackOrderID;
}
