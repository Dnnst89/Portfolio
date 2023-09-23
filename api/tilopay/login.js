let accessToken = null;
let expirationTimestamp = null;
let type_token = null;
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
    const response = await fetch(process.env.NEXT_PUBLIC_TILOPAY_LOGIN, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        apiuser: process.env.NEXT_PUBLIC_TILOPAY_API_USER,
        password: process.env.NEXT_PUBLIC_TILOPAY_API_PASSWORD,
      }),
    });
    // Check if the response is correct
    if (response.status === 200) {
      const accessData = await response.json();
      accessToken = accessData.access_token;
      expirationTimestamp = Date.now() + accessData.expires_in * 1000; // Convert seconds to milliseconds
      type_token = accessData.token_type;
      return accessToken;
    } else {
      console.error("An error occurred:", response.status, response.statusText);
      throw new Error("Failed to obtain access token.");
    }
  } catch (error) {
    console.error("Error requesting access data:", error.message);
    throw error;
  }
}
