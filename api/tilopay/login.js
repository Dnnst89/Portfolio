//component where we request the token and refresh it in case that the token had expired.
import axios from "axios";

const API_USER = process.env.NEXT_PUBLIC_TILOPAY_API_USER;
const API_PASSWORD = process.env.NEXT_PUBLIC_TILOPAY_API_PASSWORD;
const API_URL = process.env.NEXT_PUBLIC_TILOPAY_LOGIN; // Replace with your API endpoint

export const login = async () => {
  let accessData = {
    access_token: "",
    token_type: "",
    expires_in: 0,
  };

  try {
    const response = await axios.post(API_URL, {
      apiuser: API_USER,
      password: API_PASSWORD,
    });
    // if the response is correct
    if (response.status === 200) {
      accessData = response.data;
      console.log(accessData);
    } else {
      console.error("An error occurred:", response.data.error);
    }
  } catch (error) {
    console.error("Error requesting access data:", error.message);
  }
  return accessData.access_token;
};
