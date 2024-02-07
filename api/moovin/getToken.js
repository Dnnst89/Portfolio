// Define Moovin authentication endpoint URL
const MOOVIN_AUTH_ENDPOINT = process.env.NEXT_PUBLIC_MOOVIN_AUTH_URL;

// Variables to store the access token and token expiration time
let accessToken = null;
let expirationDate = null;

/**
 * Function to authenticate and obtain the access token
 * */
export async function getToken() {
  try {
    const response = await fetch(MOOVIN_AUTH_ENDPOINT, {
      cache: "no-cache",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: process.env.NEXT_PUBLIC_MOOVIN_USER,
        password: process.env.NEXT_PUBLIC_MOOVIN_PASSWORD,
      }),
    });

    if (response.ok) {
      const responseData = await response.json();
      accessToken = responseData.token;
      const expirationDateString = responseData.expirationDate;
      expirationDate = new Date(expirationDateString);

      return accessToken;
    } else {
      console.error("Token refresh failed with status:", response.status);
      const errorResponse = await response.json(); // Obtener más información sobre el error
      console.error("Token refresh error response:", errorResponse);
      throw new Error("Token refresh failed");
    }
  } catch (error) {
    console.error("Token refresh error:", error);
    throw error;
  }
}
