// Function to get a valid access token
const getAccessToken = async () => {
  const requestBody = {
    apiuser: process.env.NEXT_PUBLIC_TILOPAY_API_USER,
    password: process.env.NEXT_PUBLIC_TILOPAY_API_PASSWORD,
  };

  try {
    const response = await fetch(process.env.NEXT_PUBLIC_TILOPAY_LOGIN, {
      method: "POST",
      headers: {
        "Cache-Control": "no-cache",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    });

    if (response.status === 200) {
      // Request was successful, handle the response here
      const dataResponse = await response.json();
      return dataResponse.access_token; // Return the access token
    } else {
      // Request failed with an error status code, handle the error here
      console.error("Request failed:", response.status, response.statusText);
      throw new Error("Failed to obtain access token.");
    }
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};

// Export a function to login or refresh the token
export const login = async () => {
  try {
    const accessToken = await getAccessToken();
    return accessToken;
  } catch (error) {
    // Handle token expiration or other errors here
    console.error("Login failed:", error);
    throw error;
  }
};
