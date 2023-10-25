import { login } from "@/api/tilopay/login";
const PAYMENT_URL = process.env.NEXT_PUBLIC_TILOPAY_PROCESS_TO_PAYMENT;

export const paymentRequest = async (formData) => {
  console.log("paymentRequest data : ", formData);
  try {
    const access_token = await login();
    const headers = {
      Authorization: `Bearer ${access_token}`,
      Accept: "application/json",
      "Content-Type": "application/json",
    };

    const response = await fetch(PAYMENT_URL, {
      method: "POST",
      headers,
      body: JSON.stringify(formData), // Convert the request body to JSON
    });

    if (response.ok) {
      const paymentData = await response.json();
      return paymentData.url;
    } else {
      console.error("An error occurred:", response);
      // Log the response text for more information
      const errorText = await response.text();
      console.error("Response Text:", errorText);

      throw new Error("Failed to make the payment.");
    }
  } catch (error) {
    console.error("Error requesting access data:", error);
  }
};

export default paymentRequest;
