const API_USER = process.env.NEXT_PUBLIC_TILOPAY_API_USER;
const API_PASSWORD = process.env.NEXT_PUBLIC_TILOPAY_API_PASSWORD;
const API_URL = process.env.NEXT_PUBLIC_TILOPAY_LOGIN; // Replace with your API endpoint

let accessToken = null;
let expirationTimestamp = null;

export const login = async () => {
  try {
    if (!accessToken || isAccessTokenExpired()) {
      // Call refreshToken to refresh the token
      accessToken = await refreshToken();
    }
    return accessToken;
  } catch (error) {
    console.error("Authentication error:", error);
    throw error;
  }
};

// Function to check if the access token is expired
export const isAccessTokenExpired = () => {
  const currentTimestamp = Date.now(); // Get the current timestamp in milliseconds
  return expirationTimestamp && currentTimestamp >= expirationTimestamp;
};

export async function refreshToken() {
  try {
    // Send credentials and request a new token
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        apiuser: API_USER,
        password: API_PASSWORD,
      }),
    });

    // Check if the response is correct
    if (response.status === 200) {
      const accessData = await response.json();
      accessToken = accessData.access_token;
      // Calculate the expiration timestamp based on 'expires_in' (assuming it's in seconds)
      expirationTimestamp = Date.now() + accessData.expires_in * 1000; // Convert seconds to milliseconds
      return accessToken;
    } else {
      console.error("An error occurred:", response.data.error);
      throw new Error("Failed to obtain access token.");
    }
  } catch (error) {
    console.error("Error requesting access data:", error.message);
    throw error;
  }
}
